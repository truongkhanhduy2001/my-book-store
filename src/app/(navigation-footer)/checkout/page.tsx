"use client";
import Link from "next/link";
import Image from "next/image";
import "./checkout.css";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CheckOut() {
  let data: any = [
    {
      discount: "20",
      price: "100",
    },
  ];
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
                      />
                    </div>
                    <div className="form-group mb-[15px]">
                      <input
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        type="text"
                        id="addressBill"
                        name="addressBill"
                        placeholder="Address"
                      />
                    </div>
                    <div className="form-group mb-[15px]">
                      <select
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        name="cityBill"
                        id="cityBill"
                        defaultValue=""
                      >
                        <option disabled value="">
                          Choose city
                        </option>
                        {/* Các option đã được sắp xếp lại */}
                        <option value="0">An Giang</option>
                        <option value="1">Bắc Giang</option>
                        <option value="2">Bắc Kan</option>
                        <option value="3">Bạc Lieu</option>
                        <option value="4">Bắc Ninh</option>
                        <option value="5">Bà Rịa-Vũng Tàu</option>
                        <option value="6">Bến Tre</option>
                        <option value="7">Bình Định</option>
                        <option value="8">Bình Dương</option>
                        <option value="9">Bình Phước</option>
                        <option value="10">Bình Thuận</option>
                        <option value="11">Cà Mau</option>
                        <option value="12">Cao Bằng</option>
                        <option value="13">Đắc Lắk</option>
                        <option value="14">Đắc Nông</option>
                        <option value="15">Điện Biên</option>
                        <option value="16">Đồng Nai</option>
                        <option value="17">Đồng Tháp</option>
                        <option value="18">Gia Lai</option>
                        <option value="19">Hà Giang</option>
                        <option value="20">Hải Dương</option>
                        <option value="21">Hà Nam</option>
                        <option value="22">Hà Tây</option>
                        <option value="23">Hà Tĩnh</option>
                        <option value="24">Hậu Giang</option>
                        <option value="25">Hòa Bình</option>
                        <option value="26">Hưng Yên</option>
                        <option value="27">Khánh Hòa</option>
                        <option value="28">Kiên Giang</option>
                        <option value="29">Kon Tum</option>
                        <option value="30">Lai Châu</option>
                        <option value="31">Lâm Đồng</option>
                        <option value="32">Lạng Sơn</option>
                        <option value="33">Lào Cai</option>
                        <option value="34">Long An</option>
                        <option value="35">Nam Định</option>
                        <option value="36">Nghệ An</option>
                        <option value="37">Ninh Bình</option>
                        <option value="38">Ninh Thuậnn</option>
                        <option value="39">Phú Thọ</option>
                        <option value="40">Phú Yên</option>
                        <option value="41">Quảng Bình</option>
                        <option value="42">Quảng Nam</option>
                        <option value="43">Quảng Ngải</option>
                        <option value="44">Quảng Ninh</option>
                        <option value="45">Quảng Trị</option>
                        <option value="46">Sóc Trăng</option>
                        <option value="47">Sơn La</option>
                        <option value="48">Tây Ninh</option>
                        <option value="49">Thái Bình</option>
                        <option value="50">Thái Nguyên</option>
                        <option value="51">Thanh Hóa</option>
                        <option value="52">Thừa Thiên-Huế</option>
                        <option value="53">Tiền Giang</option>
                        <option value="54">Trà Vinh</option>
                        <option value="55">Tuyên Quang</option>
                        <option value="56">Vĩnh Long</option>
                        <option value="57">Vĩnh Phúc</option>
                        <option value="58">Yên Bái</option>
                        <option value="59">Cần Thơ</option>
                        <option value="60">Đà Nẵng</option>
                        <option value="61">Hải Phòng</option>
                        <option value="62">Hà Nội</option>
                        <option value="63">Hồ Chí Minh</option>
                      </select>
                    </div>
                    <div className="form-group mb-[15px]">
                      <input
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        type="tel"
                        id="telBill"
                        name="telBill"
                        placeholder="Telephone"
                      />
                    </div>
                    <div className="form-group mb-[15px]">
                      <textarea
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] min-h-[100px] p-[15px] rounded-[5px] border-solid border border-[var(--text-color)]"
                        id="notesBill"
                        name="notesBill"
                        placeholder="Order Notes"
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
                  <div className="input-radio">
                    <input
                      type="radio"
                      name="payment"
                      className="payment"
                      id="payment-1"
                    />
                    <label
                      className="cursor-pointer font-normal mb-[5px] min-h-[20px] pl-[10px]"
                      htmlFor="payment-1"
                    >
                      <span></span>Direct Payment
                    </label>
                  </div>
                  <div className="input-radio">
                    <input
                      type="radio"
                      name="payment"
                      className="payment"
                      id="payment-2"
                    />
                    <label
                      className="cursor-pointer font-normal mb-[5px] min-h-[20px] pl-[10px]"
                      htmlFor="payment-2"
                    >
                      <span></span>Paypal System
                    </label>
                    <div className="caption mt-[5px] max-h-[800px]">
                      <input
                        form="bill-form"
                        className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] border-solid border border-[var(--text-color)]"
                        type="text"
                        name="creditCardBill"
                        id="creditCardBill"
                        placeholder="Enter your credit card number"
                      />
                      <div style={{ display: "flex", marginTop: "10px" }}>
                        <input
                          className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] rounded-r-none border-solid border border-[var(--text-color)]"
                          type="text"
                          name="cvvBill"
                          id="cvvBill"
                          placeholder="Enter your cvv"
                        />
                        <div style={{ display: "flex" }}>
                          <input
                            form="bill-form"
                            className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] border-solid border border-[var(--text-color)]"
                            type="text"
                            name="monthCreditBill"
                            id="monthCreditBill"
                            placeholder="Month"
                          />
                          <input
                            form="bill-form"
                            className="input bg-[var(--white-color)] h-[40px] pl-[15px] pr-[15px] w-[100%] text-[var(--title-color)] rounded-[5px] rounded-l-none border-solid border border-[var(--text-color)]"
                            type="text"
                            name="yearCreditBill"
                            id="yearCreditBill"
                            placeholder="Year"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-checkbox px-[10px]">
                  <input
                    type="checkbox"
                    id="terms"
                    className="terms-checkout"
                  />
                  <label
                    className="cursor-pointer font-normal mb-[5px] min-h-[20px] pl-[10px] text-[var(--title-color)]"
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
