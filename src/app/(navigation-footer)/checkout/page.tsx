"use client";
import Link from "next/link";
import Image from "next/image";
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
  });

  const [Notes, setNotes] = useState("");
  const [Card, setCard] = useState("");
  const [NameCard, setNameCard] = useState("");
  const [CVV, setCVV] = useState("");
  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");

  const handleNotes = (e: any) => {
    setNotes(e.target.value);
  };

  const handleCard = (e: any) => {
    setCard(e.target.value);
  };

  const handleNameCard = (e: any) => {
    setNameCard(e.target.value);
  };

  const handleCVV = (e: any) => {
    setCVV(e.target.value);
  };

  const handleMonth = (e: any) => {
    setMonth(e.target.value);
  };

  const handleYear = (e: any) => {
    setYear(e.target.value);
  };

  // Option select
  useEffect(() => {
    const citis: any = document.querySelector("#city");
    const districts: any = document.querySelector("#district");
    const wards: any = document.querySelector("#ward");

    if (citis && districts && wards) {
      fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          for (const x of data) {
            citis.options[citis.options.length] = new Option(x.Name, x.Id);
          }
          citis.onchange = function () {
            districts.length = 1;
            wards.length = 1;
            if (this.value != "") {
              const result = data.filter((n: any) => n.Id === this.value);

              for (const k of result[0].Districts) {
                districts.options[districts.options.length] = new Option(
                  k.Name,
                  k.Id
                );
              }
            }
          };
          districts.onchange = function () {
            wards.length = 1;
            const dataCity = data.filter((n: any) => n.Id === citis.value);
            if (this.value != "") {
              const dataWards = dataCity[0].Districts.filter(
                (n: any) => n.Id === this.value
              )[0].Wards;

              for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name, w.Id);
              }
            }
          };
        });
    }
  }, []);

  //Radio
  const [radio, setradio] = useState(0);

  useEffect(() => {
    const payment: any = document.querySelector("#payment-1");
    if (payment) {
      payment.addEventListener("change", (e: any) => {
        console.log(e.target.value);
      });
    }
  }, []);

  useEffect(() => {
    credit_card_format(Card);
  }, [Card]);

  useEffect(() => {
    formatCardName(NameCard);
  }, [NameCard]);

  useEffect(() => {
    CVV_number(CVV);
  }, [CVV]);

  useEffect(() => {
    Expired_month(Month);
  }, [Month]);

  useEffect(() => {
    Expired_year(Year);
  }, [Year]);

  // Credit card number
  function credit_card_format(value: any) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return setCard(parts.join(" "));
    } else {
      return setCard(val);
    }
  }

  // Name card
  function formatCardName(value: any) {
    const uppercaseName = value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();

    return setNameCard(uppercaseName);
  }

  // CVV number
  function CVV_number(value: any) {
    const cvvRegex = value.replace(/[^0-9]/gi, "");
    // Giới hạn độ dài của chuỗi CVV thành 3 ký tự
    return setCVV(cvvRegex.slice(0, 3));
  }

  // Expired month
  function Expired_month(value: any) {
    const mon = value
      .replace(/[^0-9]/gi, "")
      .replace(/^([2-9])$/gi, "0$1")
      .replace(/^0{1,}/gi, "0");
    return setMonth(mon.slice(0, 2));
  }

  // Expired year
  function Expired_year(value: any) {
    const yea = value.replace(/[^0-9]/gi, "");
    return setYear(yea.slice(0, 2));
  }

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
              address: "",
              city: "",
              district: "",
              ward: "",
              telephone: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
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
                                >
                                  <option disabled value="">
                                    Choose province
                                  </option>
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
                                >
                                  <option disabled value="">
                                    Choose district
                                  </option>
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
                                >
                                  <option disabled value="">
                                    Choose ward
                                  </option>
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
                            <div className="form-group mb-[15px]">
                              <textarea
                                className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] min-h-[100px] p-[15px] rounded-[5px] border-solid border border-[var(--text-color)]"
                                id="notesBill"
                                name="notesBill"
                                placeholder="Order Notes"
                                value={Notes}
                                onChange={handleNotes}
                              ></textarea>
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
                                        href="/productDetail"
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
                            <input
                              type="radio"
                              name="payment"
                              className="payment"
                              id="payment-1"
                              value={radio}
                              defaultChecked={radio == 1 ? true : false}
                              onChange={() => {
                                setradio(1);
                              }}
                            />
                            <label
                              className="cursor-pointer font-normal min-h-[20px] pl-[10px]"
                              htmlFor="payment-1"
                            >
                              Direct Payment
                            </label>
                          </div>
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="payment"
                              className="payment"
                              id="payment-2"
                              value={radio}
                              defaultChecked={radio == 2 ? true : false}
                              onChange={() => {
                                setradio(2);
                              }}
                            />
                            <label
                              className="cursor-pointer font-normal mb-[5px] min-h-[20px] pl-[10px]"
                              htmlFor="payment-2"
                            >
                              Paypal System
                            </label>
                            {radio == 2 && (
                              <div className="caption mt-[5px] max-h-[800px]">
                                <input
                                  form="bill-form"
                                  className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] mb-[10px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                  type="text"
                                  name="creditCardBill"
                                  id="creditCardBill"
                                  placeholder="Enter your credit card number"
                                  onChange={handleCard}
                                  value={Card}
                                />
                                <input
                                  form="bill-form"
                                  className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                                  type="text"
                                  name="nameBill"
                                  id="nameBill"
                                  placeholder="Enter your name card"
                                  onChange={handleNameCard}
                                  value={NameCard}
                                />
                                <div
                                  style={{ display: "flex", marginTop: "10px" }}
                                >
                                  <input
                                    className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] rounded-r-none border-solid border border-[var(--text-color)]"
                                    type="text"
                                    name="cvvBill"
                                    id="cvvBill"
                                    placeholder="Enter your cvv"
                                    onChange={handleCVV}
                                    value={CVV}
                                  />
                                  <div style={{ display: "flex" }}>
                                    <input
                                      form="bill-form"
                                      className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] border-solid border border-[var(--text-color)]"
                                      type="text"
                                      name="monthCreditBill"
                                      id="monthCreditBill"
                                      placeholder="Month"
                                      onChange={handleMonth}
                                      value={Month}
                                    />
                                    <input
                                      form="bill-form"
                                      className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] rounded-l-none border-solid border border-[var(--text-color)]"
                                      type="text"
                                      name="yearCreditBill"
                                      id="yearCreditBill"
                                      placeholder="Year"
                                      onChange={handleYear}
                                      value={Year}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="input-checkbox px-[10px] flex">
                          <input
                            type="checkbox"
                            id="terms"
                            className="terms-checkout"
                          />
                          <label
                            className="cursor-pointer font-normal min-h-[20px] pl-[10px] text-[var(--title-color)]"
                            htmlFor="terms"
                          >
                            <span></span>I have read and accept the terms &
                            conditions
                          </label>
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
