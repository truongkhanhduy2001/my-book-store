"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt, FaShoppingCart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./cart.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCustomContext } from "@/provider/CustomProvider";
import { useCartContext } from "@/provider/CartProvider";
import { useState, useEffect } from "react";

export default function Cart() {
  const { user } = useCustomContext();
  const { cart, getCart } = useCartContext();
  const [productId, setProductId] = useState(null) as any;
  const [recommendations, setRecommendation] = useState(null) as any;

  useEffect(() => {
    const getDataFetch = async () => {
      console.log("fetching data");
      const getData = await fetch(
        `http://127.0.0.1:8000/recommendate/?userId=${user._id}`
      );
      const data = await getData.json();
      setProductId(data.productId);
    };
    if (user) {
      getDataFetch();
    }
  }, [user, cart]);

  useEffect(() => {
    const getRecommendation = async () => {
      console.log("fetching recommendation");
      const getData = await fetch("/api/product/recommend", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
      const data = await getData.json();
      console.log(data);
      setRecommendation(data.products);
    };
    if (productId) {
      getRecommendation();
    }
  }, [productId]);

  const handleDeleteItem = async (id: any) => {
    try {
      const response = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: id,
        }),
      });
      const result = await response.json();
      if (result.status === 200) {
        getCart();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .min(1, "Minimum 1 product")
      .max(Yup.ref("stock"), "Maximum stock available")
      .required("Required"),
  });

  const handleSubmit = async (
    values: any,
    setSubmitting: any,
    productId: any
  ) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: recommendations[0]._id,
          quantity: values.quantity,
          price:
            recommendations[0].discount > 0
              ? recommendations[0].discount
              : recommendations[0].price,
        }),
      });
      const result = await response.json();
      if (result.status === 200) {
        getCart();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="section-cart flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-cart-container max-w-[var(--width-home)] w-[100%] m-[auto] flex flex-col">
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
                href="/cart"
              >
                Cart
              </Link>
            </li>
          </ul>
          <div className="cart-container flex flex-col justify-center mt-[var(--margin-top-font)]">
            {cart && cart.listItem.length > 0 ? (
              <>
                <div className="table-container flex max-w-[var(--width-home)] w-[100%] mt-[20px] justify-center">
                  <table className="table-cart text-[var(--title-color)] w-[100%]">
                    <tbody>
                      <tr>
                        <th className="p-[8px] text-left">Product</th>
                        <th className="p-[8px] text-left">Categories</th>
                        <th className="p-[8px] text-left">Price</th>
                        <th className="p-[8px] text-left">Quantity</th>
                        <th className="p-[8px] text-left">Total</th>
                        <th className="p-[8px] text-left">Remove</th>
                      </tr>
                      {cart.listItem.map((item: any, index: any) => (
                        <tr key={index}>
                          <td className="p-[8px] flex items-center">
                            <Link
                              className="!relative w-[80px] h-[110px]"
                              href={{
                                pathname: "/productDetail",
                                query: { id: item.productId._id },
                              }}
                            >
                              <Image
                                className="max-w-[100px] w-[100%] h-[auto] !relative"
                                src={item.productId.image}
                                alt="Main Image"
                                fill
                                priority={true}
                                sizes="(max-width: 768px) 100vw"
                              />
                            </Link>
                            <h3 className="table-title text-[20px] font-medium ml-[10px]">
                              {item.productId.name}
                            </h3>
                          </td>
                          <td className="p-[8px]">
                            <h3 className="table-categories">
                              {item.productId.genre}
                            </h3>
                          </td>
                          <td className="p-[8px]">
                            <span className="table-price">${item.price}</span>
                          </td>
                          <td className="p-[8px]">x{item.quantity}</td>
                          <td className="p-[8px]">${item.totalPrice}</td>
                          <td className="p-[8px]">
                            <i
                              className="fa-trash cursor-pointer text-[red]"
                              onClick={() =>
                                handleDeleteItem(item.productId._id)
                              }
                            >
                              <FaRegTrashAlt />
                            </i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Recommendations */}
                {recommendations?.length > 0 && (
                  <div className="recommendations mt-[20px] w-[100%]">
                    <h2 className="text-[20px] font-medium text-[var(--title-color)]">
                      Recommended for you
                    </h2>
                    <div className="table-container flex max-w-[var(--width-home)] w-[100%] mt-[20px] justify-center">
                      <table className="table-cart text-[var(--title-color)] w-[100%]">
                        <tbody>
                          <tr>
                            <th className="p-[8px] text-left">Product</th>
                            <th className="p-[8px] text-left">Categories</th>
                            <th className="p-[8px] text-left">Price</th>
                            <th className="p-[8px] text-left">Quantity</th>
                          </tr>
                          {recommendations.map((product: any, index: any) => (
                            <tr key={index}>
                              <td className="p-[8px] flex items-center">
                                <Link
                                  className="!relative"
                                  href={{
                                    pathname: "/productDetail",
                                    query: { id: product._id },
                                  }}
                                >
                                  <Image
                                    className="max-w-[100px] w-[100%] h-[auto] !relative"
                                    src={product.image}
                                    alt="Recommended Product"
                                    fill
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw"
                                  />
                                </Link>
                                <h3 className="table-title text-[20px] font-medium ml-[10px]">
                                  {product.name}
                                </h3>
                              </td>
                              <td className="p-[8px]">
                                <h3 className="table-categories">
                                  {product.genre}
                                </h3>
                              </td>
                              <td className="p-[8px]">
                                <span className="table-price">
                                  ${product.price}
                                </span>
                              </td>
                              <td className="p-[8px]">
                                <Formik
                                  initialValues={{
                                    quantity: 1,
                                    stock: product.stock,
                                  }}
                                  validationSchema={validationSchema}
                                  onSubmit={(values, { setSubmitting }) =>
                                    handleSubmit(
                                      values,
                                      setSubmitting,
                                      product._id
                                    )
                                  }
                                >
                                  {({ isSubmitting }) => (
                                    <Form>
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
                                        name="quantity"
                                        component="div"
                                        className="text-red-500 text-[12px]"
                                      />
                                    </Form>
                                  )}
                                </Formik>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="wrapper flex justify-center items-center text-[var(--title-color)] text-[15px]">
                <div className="wrap-container w-[350px]">
                  <div className="content text-center px-[30px] pt-[60px] pb-[30px]">
                    <p className="title text-[18px] font-bold text-[var(--first-color)]">
                      Uh, oh!
                    </p>
                    <TiShoppingCart className="text-[80px] text-[var(--first-color)] text-center justify-center w-[100%]" />
                    <p className="info text-[15px] font-normal text-[var(--text-color)] opacity-[0.7]">
                      Your Cart is empty!
                    </p>
                  </div>
                  <Link href="/">
                    <button className="block w-[100%] p-[15px] font-bold cursor-pointer text-[var(--white-color)] bg-[var(--first-color)] rounded-[10px] hover:rounded-[20px]">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
