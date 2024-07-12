"use client";
import "./discount.css";
import Link from "next/link";
import Image from "next/image";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useCustomContext } from "@/provider/CustomProvider";
import { useWishContext } from "@/provider/WishProvider";
import { useCartContext } from "@/provider/CartProvider";
import SkeletonLoad from "../SkeletonLoad/Skeleton";

export default function Discount() {
  const router = useRouter();
  const { user } = useCustomContext();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const { wish, getWish } = useWishContext();
  const { cart, getCart } = useCartContext();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataDiscount = async () => {
      try {
        const res = await fetch("/api/product/discount");
        const data = await res.json();
        setProducts(data.data);
        setOriginalProducts(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataDiscount();
  }, []);

  function changePositionNav(e: any) {
    document.querySelector(".nav-discount.active")?.classList.remove("active");
    e.classList.add("active");
  }

  const handleAllBooks = (e: any) => {
    setProducts(originalProducts);
    changePositionNav(e.target.closest(".nav-discount"));
  };

  const handleType = (genre: string, e: any) => {
    const filteredProducts = originalProducts.filter((product: any) =>
      product.genre.includes(genre)
    );
    setProducts(filteredProducts);
    changePositionNav(e.target.closest(".nav-discount"));
  };

  // Specific genre handlers
  const handleTypeAdventure = (e: any) => handleType("Adventure", e);
  const handleTypeComedy = (e: any) => handleType("Comedy", e);
  const handleTypeScience = (e: any) => handleType("Science", e);
  const handleTypeHorror = (e: any) => handleType("Horror", e);

  // Button Cart
  const handleCart = async (e: any, productId: any) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (productId?.stock === 0) {
      Toastify({
        text: "This product is out of stock!",
        offset: {
          x: 50,
          y: 10,
        },
        gravity: "top",
        position: "right",
        className: "info",
        stopOnFocus: true,
        duration: 5000,
      }).showToast();
      return;
    }
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: productId._id,
          quantity: 1,
          price: productId.discount > 0 ? productId.discount : productId.price,
          totalPrice: productId.price * 1,
        }),
      });

      const data = await response.json();
      if (data.status === 200) {
        getCart();
      } else {
        console.error("Failed to add to cart:", data);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Icon heart
  const handleHeart = async (e: any, productId: any) => {
    e.preventDefault();
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
          productId: productId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          getWish();
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Get wish
  const [wishList, setWishList] = useState({}) as any;

  useEffect(() => {
    if (wish) {
      const initialWishList: any = {};
      wish.listWish.forEach((item: any) => {
        initialWishList[item.productId._id] = true;
      });
      setWishList(initialWishList);
    }
  }, [wish]);

  // Slider
  function NextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <i onClick={onClick} className={className}>
        <IoIosArrowForward />
      </i>
    );
  }
  function PrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <i onClick={onClick} className={className}>
        <IoIosArrowBack />
      </i>
    );
  }
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      className="section-p3 flex flex-col mt-[var(--margin-top)]"
      id="discounts"
    >
      <div className="section-p3-container max-w-[var(--width-home)] w-[100%] m-[auto] flex justify-between">
        <h2 className="text-[25px] text-[var(--title-color)] font-bold">
          Book Discount
        </h2>
        <Link href="/discountPage" style={{ display: "inline-block" }}>
          <h3 className="text-[18px] mt-[5px] text-[var(--text-color)] hover:text-[var(--first-color)]">
            View all
          </h3>
        </Link>
      </div>
      <div className="section1-p3-container flex">
        <div className="p3-container max-w-[var(--width-home)] w-[100%] m-[auto]">
          <ul className="p3-list flex mt-[var(--margin-top-font)]">
            <li className="nav-discount group/nav-discount active mr-[18px] relative duration-[400ms] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms] before:hover:w-[100%] before:hover:duration-[300ms]">
              <h3
                className="group-hover/nav-discount:text-[var(--first-color)] text-[var(--text-color)] cursor-pointer text-[18px] font-bold"
                onClick={handleAllBooks}
              >
                All
              </h3>
            </li>
            <li className="nav-discount group/nav-discount mr-[18px] relative duration-[400ms] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms] before:hover:w-[100%] before:hover:duration-[300ms]">
              <h3
                className="group-hover/nav-discount:text-[var(--first-color)] text-[var(--text-color)] cursor-pointer text-[18px] font-bold"
                onClick={handleTypeAdventure}
              >
                Adventure
              </h3>
            </li>
            <li className="nav-discount group/nav-discount mr-[18px] relative duration-[400ms] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms] before:hover:w-[100%] before:hover:duration-[300ms]">
              <h3
                className="group-hover/nav-discount:text-[var(--first-color)] text-[var(--text-color)] cursor-pointer text-[18px] font-bold"
                onClick={handleTypeComedy}
              >
                Comedy
              </h3>
            </li>
            <li className="nav-discount group/nav-discount mr-[18px] relative duration-[400ms] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms] before:hover:w-[100%] before:hover:duration-[300ms]">
              <h3
                className="group-hover/nav-discount:text-[var(--first-color)] text-[var(--text-color)] cursor-pointer text-[18px] font-bold"
                onClick={handleTypeScience}
              >
                Science
              </h3>
            </li>
            <li className="nav-discount group/nav-discount mr-[18px] relative duration-[400ms] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms] before:hover:w-[100%] before:hover:duration-[300ms]">
              <h3
                className="group-hover/nav-discount:text-[var(--first-color)] text-[var(--text-color)] cursor-pointer text-[18px] font-bold"
                onClick={handleTypeHorror}
              >
                Horror
              </h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="discount-container flex justify-center mt-[var(--margin-top-font)]">
        {Loading && (
          <div className="arrivals max-w-[var(--width-home)] w-[100%]">
            <div className="arrivals-box grid grid-cols-4 gap-[15px]">
              {[...Array(4)].map((_, index) => (
                <SkeletonLoad key={index} />
              ))}
            </div>
          </div>
        )}
        {!Loading && products && products.length > 0 && (
          <div className="discount max-w-[var(--width-home)] w-[100%]">
            <div className="discount-box slider-container">
              <Slider {...settings}>
                {products?.slice(-4).map((product: any) => {
                  const { discount, price, time, stock } = product;
                  const per = (
                    ((Number(discount) - Number(price)) / Number(price)) *
                    100
                  ).toFixed(0);

                  const isWished = wishList[product._id];
                  return (
                    <Link
                      key={product._id}
                      href={{
                        pathname: "/productDetail",
                        query: { id: product._id },
                      }}
                      className="discount-card group/discount-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] border-[2px] border-solid border-[var(--border-color)] rounded-[5px] cursor-pointer transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
                    >
                      {time == "new" && (
                        <div className="discount-label absolute top-[10%] left-[27%] z-[1] translate-x-[-50%] translate-y-[-50%] bg-[var(--first-color)] rounded-[5px]">
                          <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
                            NEW
                          </span>
                        </div>
                      )}
                      {stock == 0 && (
                        <div className="arrivals-label absolute top-[20%] left-[26%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-[red] rounded-[5px]">
                          <span className="sold-out text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                      <div className="discount-img !relative w-[150px] h-[220px] ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
                        <Image
                          className="!relative duration-[300ms] group-hover/discount-card:scale-110"
                          src={product.image}
                          alt="Main Image"
                          fill
                          priority={true}
                          sizes="(max-with: 768px)100vw"
                        />
                      </div>
                      <div className="discount-tag">
                        <h2 className="mt-[12px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
                          {product.name}
                        </h2>
                        <div className="Discountwriter text-[var(--text-color)] text-[16px]">
                          {product.author}
                        </div>
                        <div className="Discountcategories text-[var(--second-color)] mt-[8px] text-[16px]">
                          {product.genre}
                        </div>
                        <div className="Discountbook-price mt-[8px] mb-[15px] flex justify-center">
                          {discount > "0" && (
                            <h4
                              className="ml-[6px] font-normal text-[16px] text-[var(--title-color)]"
                              style={{
                                textDecoration: "none",
                                color: "hsl(230, 70%, 16%)",
                                fontWeight: "bold",
                                marginRight: "8px",
                                marginTop: "2px",
                              }}
                            >
                              ${discount}
                            </h4>
                          )}
                          <h3
                            className="text-[var(--title-color)] text-[16px] font-bold"
                            style={
                              discount > "0"
                                ? {
                                    textDecoration: "line-through",
                                    color: "hsl(230, 16%, 45%)",
                                    fontWeight: "400",
                                    marginTop: "2px",
                                  }
                                : { textDecoration: "none" }
                            }
                          >
                            ${price}
                          </h3>

                          {discount > "0" && (
                            <span className="sale text-[14px] border-[1px] border-solid bg-[var(--first-color)] text-[var(--white-color)] pt-[2px] pb-[2px] pl-[5px] pr-[5px] rounded-[5px] ml-[6px]">
                              -{per}%
                            </span>
                          )}
                        </div>
                        <div
                          className="Discountcart-btn group/Discountcart-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[var(--first-color)] rounded-[5px] relative text-[var(--first-color)] z-[1] tracking-[2px] transition duration-[300ms] hover:bg-[var(--first-color)]"
                          onClick={(e) => handleCart(e, product)}
                        >
                          <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms] group-hover/Discountcart-btn:left-[50%] group-hover/Discountcart-btn:text-[var(--white-color)]">
                            <FaShoppingCart />
                          </i>
                          <p className="add-cart text-[12px] font-bold ml-[30px] text-[var(--first-color)] duration-[250ms]">
                            Add cart
                          </p>
                        </div>
                        <div className="Icon-Container group-hover/discount-card:!inline-flex text-[var(--first-color)] hidden flex-col absolute top-[20px] right-[20px]">
                          <i className="text-[20px] font-bold mb-[8px]">
                            <LuEye />
                          </i>
                          <i className="text-[20px] font-bold mb-[8px]">
                            <FaArrowRightArrowLeft />
                          </i>
                          <i className="text-[20px] font-bold mb-[8px]">
                            <FiHeart
                              className={isWished ? "fill-[red]" : ""}
                              onClick={(e) => handleHeart(e, product?._id)}
                            />
                          </i>
                        </div>
                      </div>
                      <div className="sold flex justify-end items-center text-[15px] text-[var(--title-color)] font-medium ml-[5px]">
                        {product?.sold} sold
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
