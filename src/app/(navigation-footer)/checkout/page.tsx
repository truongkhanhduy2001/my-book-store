"use client";
import Link from "next/link";
import Image from "next/image";
import "./checkout.css";

export default function CheckOut() {
  return (
    <>
      {/* Check out */}
      <section className="section-check">
        <div className="section-check-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/checkout">Check out</Link>
            </li>
          </ul>
        </div>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="billing-details">
                  <div className="section-title">
                    <h3 className="title">Billing address</h3>
                  </div>
                  <form id="bill-form">
                    <div className="form-group">
                      <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input"
                        type="text"
                        id="addressBill"
                        name="addressBill"
                        placeholder="Address"
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="input"
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
                    <div className="form-group">
                      <input
                        className="input"
                        type="tel"
                        id="telBill"
                        name="telBill"
                        placeholder="Telephone"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="input"
                        id="notesBill"
                        name="notesBill"
                        placeholder="Order Notes"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-5 order-details">
                <div className="section-title text-center">
                  <h3 className="title">Your Order</h3>
                </div>
                <div className="order-summary">
                  <div className="order-col">
                    <div>
                      <strong>PRODUCT</strong>
                    </div>
                    <div>
                      <strong>TOTAL</strong>
                    </div>
                  </div>
                  <div className="order-products">
                    <div className="order-col">
                      <div>1x Acer Aspire 3</div>
                      <div id="price-checkout">500</div>
                    </div>
                  </div>
                  <div className="order-col">
                    <div>Shipping</div>
                    <div>
                      <strong>FREE</strong>
                    </div>
                  </div>
                  <div className="order-col">
                    <div>
                      <strong>TOTAL</strong>
                    </div>
                    <div>
                      <strong className="order-total">$500</strong>
                    </div>
                  </div>
                </div>
                <div className="payment-method">
                  <div className="input-radio">
                    <input
                      type="radio"
                      name="payment"
                      className="payment"
                      id="payment-1"
                    />
                    <label htmlFor="payment-1">
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
                    <label htmlFor="payment-2">
                      <span></span>Paypal System
                    </label>
                    <div className="caption">
                      <input
                        form="bill-form"
                        className="input"
                        type="text"
                        name="creditCardBill"
                        id="creditCardBill"
                        placeholder="Enter your credit card number"
                      />
                      <div style={{ display: "flex", marginTop: "10px" }}>
                        <input
                          className="input"
                          type="text"
                          name="cvvBill"
                          id="cvvBill"
                          placeholder="Enter your cvv"
                        />
                        <div style={{ display: "flex" }}>
                          <input
                            form="bill-form"
                            className="input"
                            type="text"
                            name="monthCreditBill"
                            id="monthCreditBill"
                            placeholder="Month"
                          />
                          <input
                            form="bill-form"
                            className="input"
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
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    className="terms-checkout"
                  />
                  <label htmlFor="terms">
                    <span></span>I have read and accept the terms & conditions
                  </label>
                </div>
                <Link
                  href=""
                  id="submit-bill-form"
                  className="primary-btn order-submit"
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
