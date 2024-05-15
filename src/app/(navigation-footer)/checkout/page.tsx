"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import "./checkout.css";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CheckOut() {
  let data: any = [
    {
      discount: "20",
      price: "100",
    },
  ];

  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Tel, setTel] = useState("");
  const [Notes, setNotes] = useState("");
  const [Card, setCard] = useState("");
  const [NameCard, setNameCard] = useState("");
  const [CVV, setCVV] = useState("");
  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");

  const RefEmail: any = useRef(null);
  useEffect(() => {
    RefEmail.current.focus();
  }, []);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e: any) => {
    setAddress(e.target.value);
  };

  const handleTel = (e: any) => {
    setTel(e.target.value);
  };

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
  });

  //Radio
  const [radio, setradio] = useState(1);

  useEffect(() => {
    const payment: any = document.querySelector("#payment-1");
    payment.addEventListener("change", (e: any) => {
      console.log(e.target.value);
    });
  });

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

  return (
    <>
      {/* Check out */}
      <section className="section-check flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-check-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
          <ul className="page-link  inline-block">
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
                  <form id="bill-form">
                    <div className="form-group mb-[15px]">
                      <input
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={Email}
                        onChange={handleEmail}
                        ref={RefEmail}
                      />
                    </div>
                    <div className="form-group mb-[15px]">
                      <input
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        type="text"
                        id="addressBill"
                        name="addressBill"
                        placeholder="Address"
                        value={Address}
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="form-group mb-[15px] flex">
                      <select
                        className="input bg-[var(--white-color)] pl-[15px] pr-[15px] mr-[10px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        name="city"
                        id="city"
                        defaultValue=""
                      >
                        <option disabled value="">
                          Choose province
                        </option>
                      </select>
                      <select
                        className="input bg-[var(--white-color)] pl-[15px] pr-[15px] mr-[10px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        name="district"
                        id="district"
                        defaultValue=""
                      >
                        <option disabled value="">
                          Choose district
                        </option>
                      </select>
                      <select
                        className="input bg-[var(--white-color)] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        name="ward"
                        id="ward"
                        defaultValue=""
                      >
                        <option disabled value="">
                          Choose ward
                        </option>
                      </select>
                    </div>

                    <div className="form-group mb-[15px]">
                      <input
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        type="tel"
                        id="telBill"
                        name="telBill"
                        placeholder="Telephone"
                        value={Tel}
                        onChange={handleTel}
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
                  </form>
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
                        <th className="w-full text-start px-[10px]">PRODUCT</th>
                        <th className="w-full text-start px-[10px]">TOTAL</th>
                        <th className="w-full text-start px-[10px]">REMOVE</th>
                      </tr>
                      <tr className="mt-[8px]">
                        <td className="w-full inline-block px-[10px]">
                          <div className="flex items-center">
                            <Link
                              className="link-prod mr-[10px] !relative"
                              href="/productDetail"
                            >
                              <Image
                                className="max-w-[100px] w-[100%] h-[auto] !relative"
                                src="/images/biasach1.png"
                                alt="Main Image"
                                fill
                                priority={true}
                                sizes="(max-with: 768px)100vw"
                              />
                            </Link>
                            <h1>1x Dune</h1>
                          </div>
                        </td>
                        <td className="w-full px-[10px]">
                          {data.discount && (
                            <span id="price-checkout">${data.discount}</span>
                          )}
                          {!data.discount && (
                            <span id="price-checkout">${data.price}</span>
                          )}
                        </td>
                        <td className="w-full px-[10px]">
                          <div className="flex justify-center">
                            <FaRegTrashAlt className="cursor-pointer text-[red]" />
                          </div>
                        </td>
                      </tr>
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
                        $500
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
                        <div style={{ display: "flex", marginTop: "10px" }}>
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
                    <span></span>I have read and accept the terms & conditions
                  </label>
                </div>
                <Link
                  href=""
                  id="submit-bill-form"
                  className="primary-btn order-submit px-[10px] bg-[var(--first-color)] rounded-[40px] text-[var(--white-color)] inline-block font-medium uppercase pl-[30px] pr-[30px] pt-[12px] pb-[12px] text-center border-none"
                >
                  Place order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Checkout */}
    </>
  );
}
