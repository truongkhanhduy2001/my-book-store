"use client";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaCheckCircle, FaUser, FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { BiSolidLike, BiCommentDetail } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./productDetail.css";
import { useCustomContext } from "@/provider/CustomProvider";
import { useCartContext } from "@/provider/CartProvider";
import { useWishContext } from "@/provider/WishProvider";
import Loader from "@/app/components/loader/loader";
import Paginate from "@/app/components/paginate/paginate";

export default function ProductDetail({ searchParams }: any) {
  const { user } = useCustomContext();
  const { getCart } = useCartContext();
  const { wish, getWish } = useWishContext();
  const [Loading, setLoading] = useState(true);
  const router = useRouter();
  const [reviews, setReviews] = useState([]) as any;
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const [hoverRating, setHoverRating] = useState(0);
  const [replies, setReplies] = useState<{ [key: string]: any[] }>({});
  const [replyCountsMap, setReplyCountsMap] = useState<{
    [key: string]: number;
  }>({});
  const [newReply, setNewReply] = useState("");
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const id = searchParams.id;
  const [products, setProducts] = useState(null) as any;

  useEffect(() => {
    const fetchProductDetail = async (id: string) => {
      try {
        const response = await fetch(`/api/product/detail?id=${id}`);
        const data = await response.json();
        if (data.status === 200) {
          setProducts(data.product);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    if (id) {
      fetchProductDetail(id as string);
    }
  }, [id]);

  // validate
  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .min(1, "Minimum 1 product")
      .max(products?.stock, `Maximum ${products?.stock} product`)
      .required("Required"),
  });

  // Add Cart
  const handlesubmit = (values: any, setSubmitting: any, resetForm: any) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setSubmitting(true);
    try {
      fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: products._id,
          quantity: values.quantity,
          price: products.discount > 0 ? products.discount : products.price,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          resetForm();
          getCart();
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Icon heart
  const handleHeart = async (e: any) => {
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      fetch("/api/wish/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: products._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          getWish();
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Get wish
  const [wishs, setWishs] = useState(false);

  useEffect(() => {
    if (wish) {
      const checkwish = wish.listWish.some(
        (value: any) => value.productId._id === products?._id
      );
      setWishs(checkwish);
    }
  }, [wish, products]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/review/get?id=${products._id}`);
        const data = await response.json();
        if (data.status === 200) {
          setReviews(data.reviews);
          setAverageRating(
            data.reviews.reduce(
              (acc: any, review: any) => acc + review.rating,
              0
            ) / data.reviews.length
          );
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    if (products) {
      fetchReviews();
    }
  }, [id, products]);

  const handleRatingChange = (newRating: any) => {
    setUserRating(newRating);
  };

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch("/api/review/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: products._id,
          rating: userRating,
          comment: userComment,
        }),
      });
      const data = await response.json();
      if (data.status === 201) {
        const newReview = {
          ...data.review,
          userId: { name: user.name },
        };
        setReviews((prevReviews: any) => {
          const updatedReviews = [newReview, ...prevReviews];
          return updatedReviews.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setSortOption("newest");
        setUserRating(0);
        setUserComment("");

        const newTotalRating =
          reviews.reduce((acc: any, review: any) => acc + review.rating, 0) +
          userRating;
        const newAverageRating = newTotalRating / (reviews.length + 1);
        setAverageRating(newAverageRating);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const totalReviews = reviews.length;

  const getPercentage = (rating: any) => {
    const count = reviews.filter(
      (review: any) => review.rating === rating
    ).length;
    return Math.round((count / totalReviews) * 100);
  };

  const percentages: any = {
    5: getPercentage(5),
    4: getPercentage(4),
    3: getPercentage(3),
    2: getPercentage(2),
    1: getPercentage(1),
  };

  // Kết quả
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/review/get?id=${products._id}&sort=${sortOption}`
        );
        const data = await response.json();
        if (data.status === 200) {
          let sortedReviews = data.reviews;
          if (sortOption === "newest") {
            sortedReviews.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          } else if (sortOption === "mostLiked") {
            sortedReviews.sort(
              (a: any, b: any) =>
                (b.likes?.length || 0) - (a.likes?.length || 0)
            );
          }
          setReviews(sortedReviews);
          setAverageRating(
            sortedReviews.reduce(
              (acc: any, review: any) => acc + review.rating,
              0
            ) / sortedReviews.length
          );
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    if (products) {
      fetchReviews();
    }
  }, [products, sortOption]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
    if (option === "newest") {
      setReviews(
        [...reviews].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } else if (option === "mostLiked") {
      setReviews(
        [...reviews].sort(
          (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
        )
      );
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Like
  const handleLike = async (reviewId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Optimistically update the UI
    setReviews((prevReviews: any) =>
      prevReviews.map((review: any) =>
        review._id === reviewId
          ? {
              ...review,
              likes: review.likes.includes(user._id)
                ? review.likes.filter((id: string) => id !== user._id)
                : [...review.likes, user._id],
            }
          : review
      )
    );

    setLikedComments((prevLikedComments) =>
      prevLikedComments.includes(reviewId)
        ? prevLikedComments.filter((id) => id !== reviewId)
        : [...prevLikedComments, reviewId]
    );

    try {
      const response = await fetch("/api/review/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          userId: user._id,
        }),
      });
      const data = await response.json();
      if (data.status !== 200) {
        // Revert the optimistic update if the request fails
        setReviews((prevReviews: any) =>
          prevReviews.map((review: any) =>
            review._id === reviewId ? { ...review, likes: data.likes } : review
          )
        );
        setLikedComments((prevLikedComments) =>
          data.isLiked
            ? [...prevLikedComments, reviewId]
            : prevLikedComments.filter((id) => id !== reviewId)
        );
      }
    } catch (error) {
      console.error("Failed to like review:", error);
      // Revert the optimistic update if the request fails
      setReviews((prevReviews: any) =>
        prevReviews.map((review: any) =>
          review._id === reviewId
            ? {
                ...review,
                likes: review.likes.includes(user._id)
                  ? review.likes.filter((id: string) => id !== user._id)
                  : [...review.likes, user._id],
              }
            : review
        )
      );
      setLikedComments((prevLikedComments) =>
        prevLikedComments.includes(reviewId)
          ? prevLikedComments.filter((id) => id !== reviewId)
          : [...prevLikedComments, reviewId]
      );
    }
  };

  const fetchReplies = async (reviewId: string) => {
    try {
      const response = await fetch(
        `/api/review/reply/get?reviewId=${reviewId}`
      );
      const data = await response.json();

      if (response.ok) {
        setReplies((prevReplies) => ({
          ...prevReplies,
          [reviewId]: data.replies,
        }));
        setReplyCountsMap((prevCounts) => ({
          ...prevCounts,
          [reviewId]: data.replies.length,
        }));
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    }
  };

  // Reply
  const handleReplySubmit = async (reviewId: string) => {
    if (!newReply.trim()) return;

    try {
      const response = await fetch("/api/review/reply/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          userId: user._id,
          content: newReply,
        }),
      });

      if (response.ok) {
        setNewReply("");
        fetchReplies(reviewId);
        setReplyCountsMap((prevCounts) => ({
          ...prevCounts,
          [reviewId]: (prevCounts[reviewId] || 0) + 1,
        }));
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
    }
  };

  const saveCurrentUrl = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "previousUrl",
        window.location.pathname + window.location.search
      );
    }
  };

  return (
    <>
      {/* Detail */}
      <section className="section-detail flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-detail-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
          <ul className="page-link inline-block">
            <li className="inline-block text-[12px] font-medium uppercase">
              <Link
                className="text-[var(--title-color)] hover:text-[var(--first-color)]"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="inline-block text-[12px] font-medium uppercase">
              <Link
                className="text-[var(--title-color)] hover:text-[var(--first-color)]"
                href={{
                  pathname: "/productDetail",
                  query: { id: products?._id },
                }}
              >
                Book detail
              </Link>
            </li>
            {products && (
              <li className="inline-block text-[12px] font-medium uppercase">
                <span className="text-[var(--title-color)]">
                  {products?.name}
                </span>
              </li>
            )}
          </ul>
        </div>
        {Loading && <Loader />}
        {!Loading && products && (
          <div>
            <div className="detail-container flex justify-center mt-[var(--margin-top-font)]">
              <div className="detail flex max-w-[var(--width-home)] w-[100%] mt-[20px]">
                {/* Left */}
                <div className="product-imgs w-[50%] flex justify-center">
                  <div className="img-display !relative w-[250px] h-[380px] cursor-pointer shadow-[0_0_8px_var(--title-color)]">
                    {products && (
                      <Image
                        className="!relative duration-[300ms]"
                        src={products?.image}
                        alt="Main Image"
                        fill
                        priority={true}
                        sizes="(max-width:768px) 100vw"
                      />
                    )}
                  </div>
                </div>
                {/* Right */}
                <div className="product-content w-[50%]">
                  <div className="product-title flex justify-between">
                    <h2 className="text-[30px] text-[var(--title-color)] relative capitalize font-bold py-[10px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-[50px] after:bg-[var(--first-color)]">
                      {products?.name}
                    </h2>
                    <i className="flex text-[var(--first-color)] text-[20px] p-[8px] border-[1px] border-solid border-[var(--first-color)] h-[38px] rounded-[10px] mt-[15px] cursor-pointer">
                      <FiHeart
                        className={wishs ? "fill-[red]" : ""}
                        onClick={(e) => handleHeart(e)}
                      />
                    </i>
                  </div>
                  <div className="product-rating mt-[10px] text-[var(--title-color)]">
                    <div className="average-rating flex items-center">
                      <span className="text-[18px] font-bold mr-[10px] leading-none">
                        {reviews.length > 0 ? averageRating.toFixed(1) : "0.0"}
                      </span>
                      <div className="stars flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-[20px] ${
                              reviews.length > 0 &&
                              star <= Math.round(averageRating)
                                ? "text-[#ffc107]"
                                : "text-[#A0A3B1]"
                            }`}
                          >
                            <FaStar />
                          </span>
                        ))}
                      </div>
                      <span className="ml-[10px] text-[14px]">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-[10px]">
                    <div className="product-price flex items-center justify-center">
                      {products?.discount > "0" && (
                        <h4
                          className="text-[25px] text-[var(--title-color)] font-normal"
                          style={{
                            textDecoration: "none",
                            color: "hsl(230, 70%, 16%)",
                            fontWeight: "bold",
                            marginRight: "10px",
                          }}
                        >
                          ${products?.discount}
                        </h4>
                      )}
                      <h3
                        className="flex items-center text-[var(--title-color)] text-[25px] font-bold"
                        style={
                          products?.discount > "0"
                            ? {
                                textDecoration: "line-through",
                                color: "hsl(230, 16%, 45%)",
                                fontWeight: "400",
                              }
                            : { textDecoration: "none" }
                        }
                      >
                        ${products?.price}
                      </h3>
                    </div>
                    <div className="stock flex justify-center items-center text-[15px] text-[var(--title-color)] font-medium ml-[20px]">
                      {products?.stock} product available
                    </div>
                  </div>

                  <div className="product-detail">
                    <h2 className="text-[25px] text-[var(--title-color)] font-bold mb-[10px]">
                      Description about content:
                    </h2>
                    <p className="text-[15px] text-[var(--title-color)] mb-[10px] overflow-hidden">
                      {products?.description}
                    </p>
                    <ul className="text-[15px] text-[var(--title-color)] font-medium mb-[10px]">
                      <li className="flex items-center mt-[10px] mb-[10px]">
                        <i className="text-[var(--first-color)]">
                          <FaCheckCircle />
                        </i>
                        Writer:
                        <span className="font-normal ml-[10px]">
                          {products?.author}
                        </span>
                      </li>
                      <li className="flex items-center mt-[10px] mb-[10px]">
                        <i className="text-[var(--first-color)]">
                          <FaCheckCircle />
                        </i>
                        Categories:
                        <span className="font-normal ml-[10px]">
                          {products?.genre}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="purchase-info mt-[10px] flex items-center">
                    {products?.stock > 0 ? (
                      <Formik
                        initialValues={{
                          quantity: "0",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          handlesubmit(values, setSubmitting, resetForm);
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form className="flex items-center">
                            <Field
                              className="text-[12px] text-[var(--title-color)] text-center p-[5px] mr-[10px] border-[1px] border-solid border-[var(--title-color)] rounded-[20px] w-[60px]"
                              type="number"
                              name="quantity"
                            />
                            <button
                              className="group/purchase-btn text-[12px] inline-block text-center font-bold p-[5px] mr-[10px] border-[3px] border-solid border-[var(--first-color)] rounded-[20px] relative text-[var(--first-color)] z-[1] transition duration-[300ms] tracking-[2px] hover:cursor-pointer hover:bg-[var(--first-color)]"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms] group-hover/purchase-btn:left-[50%] group-hover/purchase-btn:text-[var(--white-color)]">
                                <FaShoppingCart />
                              </i>
                              <p className="add-cart text-[12px] text-[var(--first-color)] font-bold ml-[30px] duration-[250ms]">
                                Add cart
                              </p>
                            </button>
                            <ErrorMessage
                              className="text-[red]"
                              component="div"
                              name="quantity"
                            />
                          </Form>
                        )}
                      </Formik>
                    ) : (
                      <button
                        className="sold-out-btn text-[12px] inline-block text-center font-bold px-[20px] py-[5px] border-[3px] border-solid border-[var(--title-color)] rounded-[20px] text-[var(--title-color)] cursor-not-allowed"
                        disabled
                      >
                        Sold Out
                      </button>
                    )}
                    <span className="sold-count flex justify-center items-center text-[15px] text-[var(--title-color)] font-medium ml-[5px]">
                      {products?.sold} sold
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-view-info max-w-[var(--width-home)] w-[100%] m-[auto]">
              <div className="product-view-content-title text-[20px] font-bold text-[var(--title-color)] mt-[100px]">
                Information
              </div>
              <div className="product-view-tab-content-ad">
                <div className="product-view-tab-content-additional border-b-[1px] border-solid border-[#c1c1c1]">
                  <table className="data-table table-additional border-none shadow-none w-[50%] mt-[10px] mb-[10px] text-[var(--title-color)]">
                    <colgroup>
                      <col width="25%"></col>
                      <col></col>
                    </colgroup>
                    <tbody>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Author
                        </th>
                        <td className="data-writer text-[15px] border-none p-[5px]">
                          {products?.author}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Categories
                        </th>
                        <td className="data-categories text-[15px] border-none p-[5px]">
                          {products?.genre}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Publication year
                        </th>
                        <td className="data-year text-[15px] border-none p-[5px]">
                          {products?.year}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Languages
                        </th>
                        <td className="data-language text-[15px] border-none p-[5px]">
                          {products?.language}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Weight(gr)
                        </th>
                        <td className="data-weight text-[15px] border-none p-[5px]">
                          330
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Cover size
                        </th>
                        <td className="data-size text-[15px] border-none p-[5px]">
                          24 x 15.5 x 1.5 cm
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Page count
                        </th>
                        <td className="data-page text-[15px] border-none p-[5px]">
                          {products?.pageCount}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                          Form
                        </th>
                        <td className="data-book-layout text-[15px] border-none p-[5px]">
                          Paperback cover
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="product-view-description">
                  <h1 className="text-[20px] text-[var(--title-color)] font-bold mt-[10px]">
                    Description
                  </h1>
                  <p className="text-[15px] text-[var(--title-color)] mt-[10px]">
                    {products?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="product-reviews mt-[30px] text-[var(--title-color)] max-w-[var(--width-home)] w-[100%] m-[auto]">
              <h2 className="text-[20px] font-bold text-[var(--title-color)] mb-[15px]">
                Reviews and Comments
              </h2>

              {/* Đánh giá */}
              <div className="review-list flex justify-between items-center space-x-4">
                <div className="review-item w-1/2 rating-summary flex ml-[20px] mb-[20px] items-center">
                  <div className="review flex flex-col mr-[20px] justify-center items-center">
                    <span className="review-title text-[25px] font-bold">
                      {reviews.length > 0 ? averageRating.toFixed(1) : "0.0"}
                      /5.0
                    </span>
                    <div className="stars flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-[30px] ${
                            reviews.length > 0 &&
                            star <= Math.round(averageRating)
                              ? "text-[#ffc107]"
                              : "text-[#A0A3B1]"
                          }`}
                        >
                          <FaStar />
                        </span>
                      ))}
                    </div>
                    <span className="text-[14px]">
                      ({reviews.length} reviews)
                    </span>
                  </div>

                  <div className="rating-details mt-[10px] space-y-2">
                    {[5, 4, 3, 2, 1].map((rating: any) => {
                      const percentage =
                        reviews.length > 0 ? percentages[rating] : 0;
                      return (
                        <div className="flex items-center" key={rating}>
                          <span className="w-12 text-sm font-medium">
                            {rating} sao
                          </span>
                          <div className="w-[200px] bg-gray-300 rounded-full h-2.5 mx-2">
                            <div
                              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-500 w-12 text-right">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="add-comment w-1/2 flex items-center justify-center">
                  {user ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn-review flex items-center justify-center bg-[white] text-[var(--first-color)] text-[18px] font-medium py-[6px] px-[10px] w-[400px] rounded-lg border-[2px] border-solid border-[var(--first-color)] hover:bg-[var(--first-color)] hover:text-white"
                    >
                      <MdEdit className="text-[18px] mr-[5px]" />
                      Write review
                    </button>
                  ) : (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          saveCurrentUrl();
                          router.push("/login");
                        }}
                        className="btn-review flex items-center justify-center bg-[white] text-[var(--first-color)] text-[18px] font-medium py-[6px] px-[10px] w-[400px] rounded-lg border-[2px] border-solid border-[var(--first-color)] hover:bg-[var(--first-color)] hover:text-white mb-2"
                      >
                        Please log in to write a review
                      </button>
                      <p className="text-sm text-gray-600">
                        Dont have an account?{" "}
                        <Link
                          href="/register"
                          onClick={saveCurrentUrl}
                          className="text-[var(--first-color)] hover:underline"
                        >
                          Register here
                        </Link>
                      </p>
                    </div>
                  )}

                  {isModalOpen && (
                    <div className="modal-comment fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="modal-item bg-white p-[20px] rounded w-[50%] relative">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="absolute top-[10px] right-[10px] text-[24px] cursor-pointer"
                        >
                          &times;
                        </button>
                        <div className="w-full add-comment flex flex-col items-center">
                          <form
                            onSubmit={handleCommentSubmit}
                            className="w-full"
                          >
                            <div className="mb-[10px]">
                              <label className="flex justify-center mb-[5px] text-[20px] font-normal">
                                Write book reviews
                              </label>
                              <div className="stars flex justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`text-[30px] cursor-pointer ${
                                      star <= (hoverRating || userRating)
                                        ? "text-[#ffc107]"
                                        : "text-[#A0A3B1]"
                                    }`}
                                    onMouseEnter={() => {
                                      setHoverRating(star);
                                      handleRatingChange(star);
                                    }}
                                    onMouseLeave={() => setHoverRating(0)}
                                  >
                                    <FaStar />
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mb-[10px]">
                              <label className="block mb-[5px]">Comment</label>
                              <textarea
                                className="w-full p-[5px] border rounded"
                                rows={6}
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              className="flex float-end bg-[var(--first-color)] text-white py-[5px] px-[10px] rounded"
                            >
                              Submit review
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sắp xếp */}
              {reviews.length > 0 && (
                <div className="review-sort-options flex justify-start mb-4 border-b border-gray-300">
                  <button
                    className={`relative px-4 py-2 mr-2 text-[15px] rounded transition-colors duration-300 ${
                      sortOption === "newest"
                        ? "text-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                    onClick={() => handleSortChange("newest")}
                  >
                    Newest
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transition-transform duration-300 ${
                        sortOption === "newest" ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                  </button>
                  <button
                    className={`relative px-4 py-2 text-[15px] rounded transition-colors duration-300 ${
                      sortOption === "mostLiked"
                        ? "text-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                    onClick={() => handleSortChange("mostLiked")}
                  >
                    Most Liked
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transition-transform duration-300 ${
                        sortOption === "mostLiked" ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                  </button>
                </div>
              )}
              {/* Kết quả */}
              <div className="comments-list mt-[20px] pt-[20px]">
                {currentReviews.map((review: any, index: any) => (
                  <div key={index} className="comment pb-[15px] mb-[15px]">
                    <div className="flex mb-[10px]">
                      <div className="flex flex-col">
                        <span className="font-bold">{review.userId.name}</span>
                        <span className="text-[15px] text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col ml-[50px] w-[600px]">
                        <div className="stars flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-[20px] ${
                                star <= review.rating
                                  ? "text-[#ffc107]"
                                  : "text-[#A0A3B1]"
                              }`}
                            >
                              <FaStar />
                            </span>
                          ))}
                        </div>
                        <p className="text-[15px]">{review.comment}</p>
                        <div className="mt-[10px] flex items-center">
                          <button
                            onClick={() => handleLike(review._id)}
                            className={`mr-[10px] flex items-center justify-center text-[16px] ${
                              likedComments.includes(review._id) ? "" : ""
                            }`}
                          >
                            <BiSolidLike className="mr-[2px] text-[#A0A3B1]" />
                            {review.likes?.length || 0}
                          </button>
                          <div className="flex items-center justify-center text-[16px] text-gray-500">
                            <BiCommentDetail
                              className="mr-[2px] cursor-pointer"
                              onClick={() => {
                                if (currentReviewId !== review._id) {
                                  setCurrentReviewId(review._id);
                                  fetchReplies(review._id);
                                } else {
                                  setCurrentReviewId(null);
                                }
                              }}
                            />
                            {replyCountsMap[review._id] ||
                              review.replies?.length ||
                              0}
                          </div>
                        </div>
                        {currentReviewId === review._id && (
                          <div className="mt-[10px]">
                            <div className="mt-4">
                              <textarea
                                value={newReply}
                                rows={1}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Write a reply..."
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <div className="flex mt-2 justify-end">
                                <button
                                  onClick={() => setCurrentReviewId(null)}
                                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-200"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleReplySubmit(review._id)}
                                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            {replies[review._id]?.map((reply, replyIndex) => (
                              <div
                                key={replyIndex}
                                className="ml-2 mt-5 flex items-start space-x-3"
                              >
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                                  <FaUser className="text-black text-lg" />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold text-base text-gray-900">
                                      {reply.userId.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(
                                        reply.createdAt
                                      ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  <div className="mt-1 text-sm text-gray-800">
                                    {reply.content}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {reviews.length > reviewsPerPage && (
                <Paginate
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        )}
      </section>
      {/* End Detail */}
    </>
  );
}
