"use client";
import Link from "next/link";
import Image from "next/image";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./checkout.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useCustomContext } from "@/provider/CustomProvider";
import { useCartContext } from "@/provider/CartProvider";

export default function CheckOut() {
  const { user } = useCustomContext();
  const { cart, getCart } = useCartContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your Name"),
    address: Yup.string()
      .required("Please enter your Address")
      .min(5, "Address must be at least 5 characters"),
    city: Yup.string().required("Please select your City"),
    district: Yup.string().required("Please select your District"),
    ward: Yup.string().required("Please select your Ward"),
    telephone: Yup.string()
      .required("Please enter your Telephone")
      .matches(/^\d+$/, "Telephone must be only digits")
      .min(10, "Telephone must be at least 10 digits")
      .max(15, "Telephone must be at most 15 digits"),
    payment: Yup.string().required("Please select a payment method"),
    terms: Yup.boolean()
      .required("You must accept the terms and conditions.")
      .oneOf([true], "You must accept the terms and conditions."),
  });

  const [city, setCity] = useState(null) as any;
  const [district, setDistrict] = useState(null) as any;
  const [ward, setWard] = useState(null) as any;

  const fetchArea = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      const result = await res.json();
      setCity(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Option select
  useEffect(() => {
    if (!city) {
      fetchArea();
    }
  }, []);

  // Submit form
  const handleSubmit = async (values: any, setSubmitting: any) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          name: values.name,
          address: values.address,
          city: values.city,
          district: values.district,
          ward: values.ward,
          telephone: values.telephone,
          payment: values.payment,
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        Toastify({
          text: "Order successfully!",
          offset: {
            x: 50,
            y: 10,
          },
        }).showToast();
        setSubmitting(false);
        getCart();
      } else {
        Toastify({
          text: "Product out of stock!",
          offset: {
            x: 50,
            y: 10,
          },
        }).showToast();
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
    }
  };

  // Delete item form cart
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

  return (
    <>
      {/* Check out */}
      <section className="section-check flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-check-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/checkout"
              >
                Check out
              </Link>
            </li>
          </ul>
        </div>
        {cart && cart.listItem.length > 0 ? (
          <Formik
            initialValues={{
              name: "",
              address: "",
              city: "",
              district: "",
              ward: "",
              telephone: "",
              payment: "Direct Payment",
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="section pt-[30px] pd-[30px]">
                  <div className="container max-w-[var(--width-home)] w-[100%] m-[auto]">
                    <div className="row flex">
                      <div className="col-md-7 w-[58.33333333%] mr-[10px]">
                        <div className="billing-details">
                          <div className="section-title mb-[30px] mt-[15px] relative">
                            <h3 className="title inline-block m-0 uppercase text-[var(--title-color)] text-[24px] font-bold">
                              Billing address
                            </h3>
                          </div>
                          <div id="bill-form">
                            <div className="form-group mb-[15px]">
                              <Field
                                className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-[red]"
                              />
                            </div>
                            <div className="form-group mb-[15px]">
                              <Field
                                className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                              />
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="text-[red]"
                              />
                            </div>
                            <div className="form-group mb-[15px] flex flex-wrap">
                              <div className="field-container w-[33.33%] pr-[5px]">
                                <Field
                                  as="select"
                                  className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                  name="city"
                                  id="city"
                                  value={values.city}
                                  onChange={(e: any) => {
                                    const filterCity =
                                      city &&
                                      city.filter(
                                        (item: any) =>
                                          item.Name === e.target.value
                                      );
                                    setDistrict(filterCity[0].Districts);
                                    setFieldValue("city", e.target.value);
                                  }}
                                >
                                  <option disabled value="">
                                    Choose province
                                  </option>
                                  {city &&
                                    city.map((item: any, index: any) => {
                                      return (
                                        <option key={index} value={item.Name}>
                                          {item.Name}
                                        </option>
                                      );
                                    })}
                                </Field>
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="text-[red]"
                                />
                              </div>
                              <div className="field-container w-[33.33%] pr-[5px]">
                                <Field
                                  as="select"
                                  className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                  name="district"
                                  id="district"
                                  value={values.district}
                                  onChange={(e: any) => {
                                    const filterDistrict =
                                      district &&
                                      district.filter(
                                        (item: any) =>
                                          item.Name === e.target.value
                                      );
                                    setWard(filterDistrict[0].Wards);
                                    setFieldValue("district", e.target.value);
                                  }}
                                >
                                  <option disabled value="">
                                    Choose district
                                  </option>
                                  {district &&
                                    district.map((value: any, index: any) => {
                                      return (
                                        <option key={index} value={value.Name}>
                                          {value.Name}
                                        </option>
                                      );
                                    })}
                                </Field>
                                <ErrorMessage
                                  name="district"
                                  component="div"
                                  className="text-[red]"
                                />
                              </div>
                              <div className="field-container w-[33.33%]">
                                <Field
                                  as="select"
                                  className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                  name="ward"
                                  id="ward"
                                  value={values.ward}
                                  onChange={(e: any) =>
                                    setFieldValue("ward", e.target.value)
                                  }
                                >
                                  <option disabled value="">
                                    Choose ward
                                  </option>
                                  {ward &&
                                    ward.map((value: any, index: any) => {
                                      return (
                                        <option key={index} value={value.Name}>
                                          {value.Name}
                                        </option>
                                      );
                                    })}
                                </Field>
                                <ErrorMessage
                                  name="ward"
                                  component="div"
                                  className="text-[red]"
                                />
                              </div>
                            </div>

                            <div className="form-group mb-[15px]">
                              <Field
                                className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                type="text"
                                id="telephone"
                                name="telephone"
                                placeholder="Telephone"
                              />
                              <ErrorMessage
                                name="telephone"
                                component="div"
                                className="text-[red]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 order-details w-[41.66666667%] pl-[10px] pr-[10px] pb-[10px] rounded-[5px] border-solid border border-[var(--text-color)]">
                        <div className="section-title text-center mb-[30px] mt-[15px] relative">
                          <h3 className="title inline-block m-0 uppercase text-[var(--title-color)] text-[24px] font-bold">
                            Your Order
                          </h3>
                        </div>
                        <div className="order-summary mt-[20px] mb-[20px] text-[var(--title-color)]">
                          <table>
                            <tbody>
                              <tr>
                                <th className="w-full text-start px-[10px]">
                                  PRODUCT
                                </th>
                                <th className="w-full text-start px-[10px]">
                                  PRICE
                                </th>
                                <th className="w-full text-start px-[10px]">
                                  TOTAL
                                </th>
                                <th className="w-full text-start px-[10px]">
                                  REMOVE
                                </th>
                              </tr>
                              {cart.listItem.map((item: any, index: any) => (
                                <tr key={index} className="mt-[8px]">
                                  <td className="w-full inline-block px-[10px]">
                                    <div className="flex items-center mt-[8px]">
                                      <Link
                                        className="link-prod mr-[10px] !relative"
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
                                          sizes="(max-with: 768px)100vw"
                                        />
                                      </Link>
                                      <h1>
                                        {item.productId.name} x{item.quantity}
                                      </h1>
                                    </div>
                                  </td>
                                  <td className="w-full px-[10px]">
                                    <span id="price-checkout">
                                      ${item.price}
                                    </span>
                                  </td>
                                  <td className="w-full px-[10px]">
                                    <span id="price-checkout">
                                      ${item.totalPrice}
                                    </span>
                                  </td>

                                  <td className="w-full px-[10px]">
                                    <div
                                      className="flex justify-center"
                                      onClick={() =>
                                        handleDeleteItem(item.productId._id)
                                      }
                                    >
                                      <FaRegTrashAlt className="cursor-pointer text-[red]" />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="order-col px-[10px] mt-[32px] flex justify-between w-[100%] mb-[10px]">
                            <div>Shipping</div>
                            <div>
                              <strong>FREE</strong>
                            </div>
                          </div>
                          <div className="order-col px-[10px] flex justify-between w-[100%] mb-[10px]">
                            <div>
                              <strong>TOTAL</strong>
                            </div>
                            <div>
                              <strong className="order-total text-[var(--first-color)] text-[24px]">
                                ${cart?.total || 0}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="payment-method px-[10px] text-[var(--title-color)] mt-[30px] mb-[30px]">
                          <div className="input-radio flex">
                            <Field
                              type="radio"
                              name="payment"
                              value="Direct Payment"
                              checked
                              disabled
                            />
                            <span className="cursor-pointer font-normal min-h-[20px] pl-[10px]">
                              Direct Payment
                            </span>
                          </div>
                          <ErrorMessage
                            name="payment"
                            component="div"
                            className="text-[red]"
                          />
                        </div>
                        <div className="input-checkbox px-[10px] flex flex-col">
                          <div className="flex items-center">
                            <Field
                              type="checkbox"
                              name="terms"
                              id="terms"
                              className="terms-checkout"
                            />
                            <span className="cursor-pointer font-normal min-h-[20px] pl-[10px] text-[var(--title-color)]">
                              I have read and accept the terms & conditions
                            </span>
                          </div>
                          <ErrorMessage
                            name="terms"
                            component="div"
                            className="text-[red]"
                          />
                        </div>
                        <button
                          type="submit"
                          id="submit-bill-form"
                          className="primary-btn order-submit px-[10px] bg-[var(--first-color)] rounded-[40px] text-[var(--white-color)] inline-block font-medium uppercase pl-[30px] pr-[30px] pt-[12px] pb-[12px] text-center border-none"
                          disabled={isSubmitting}
                        >
                          Place order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="wrapper text-[var(--title-color)] text-[15px] flex justify-center items-center">
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
      </section>
      {/* End Checkout */}
    </>
  );
}
