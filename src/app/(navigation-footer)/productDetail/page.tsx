"use client";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./productDetail.css";
import { useCustomContext } from "@/provider/CustomProvider";
import { useCartContext } from "@/provider/CartProvider";
import { useWishContext } from "@/provider/WishProvider";

export default function ProductDetail({ searchParams }: any) {
  const { user } = useCustomContext();
  const { getCart } = useCartContext();
  const { wish, getWish } = useWishContext();

  const id = searchParams.id;

  const [products, setProducts] = useState(null) as any;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`/api/product/detail?id=${id}`);
        const data = await response.json();
        if (data.status === 200) {
          setProducts(data.product);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    if (!products) {
      fetchProductDetail();
    }
  }, [id, products]);

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
      window.location.href = "/login";
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
      window.location.href = "/login";
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
              <div className="purchase-info mt-[10px] flex">
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
                    <Form className="flex flex-col">
                      <div className="flex items-center">
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
                        <span className="sold-count flex justify-center items-center text-[15px] text-[var(--title-color)] font-medium ml-[5px]">
                          {products?.sold} sold
                        </span>
                      </div>
                      <ErrorMessage
                        className="text-[red]"
                        component="div"
                        name="quantity"
                      />
                    </Form>
                  )}
                </Formik>
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
      </section>
      {/* End Detail */}
    </>
  );
}
