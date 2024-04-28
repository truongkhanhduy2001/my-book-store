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
        <div className="checkout section-lg">
          <div className="checkout-container container grid">
            <div className="checkout-group">
              <h3 className="section-title">Billing Details</h3>
              <form action="" className="form grid">
                <input type="text" placeholder="Name" className="form-input" />
                <input
                  type="text"
                  placeholder="Address"
                  className="form-input"
                />
                <input type="text" placeholder="City" className="form-input" />
                <input
                  type="text"
                  placeholder="Country"
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  className="form-input"
                />
                <input type="text" placeholder="Phone" className="form-input" />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                />
                <h3 className="checkout-title"> Additional Information</h3>
                <textarea
                  name=""
                  placeholder="Order note"
                  id=""
                  cols={5}
                  rows={2}
                  className="form-input textarea"
                ></textarea>
              </form>
            </div>
            <div className="checkout-group">
              <h3 className="section-title-total">Carts total</h3>
              <table className="order-table">
                <tbody>
                  <tr>
                    <th>Products</th>
                    <th>Total</th>
                  </tr>
                  <tr>
                    <td>
                      <h3 className="order-title">Dune</h3>
                      <p className="table-quanity">x1</p>
                    </td>
                    <td className="table-price">$100</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="order-subtitle">Shipping</span>
                    </td>
                    <td>
                      <span className="table-ship">Free</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="order-total">Total</span>
                    </td>
                    <td>
                      <span className="table-total-price">$100</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="payment-method">
                <div className="input-radio">
                  <input
                    type="radio"
                    name="payment"
                    className="payment"
                    id="payment-1"
                  />
                  <label className="payment-1">Direct Payment</label>
                </div>
                <div className="input-radio">
                  <input
                    type="radio"
                    name="payment"
                    className="payment"
                    id="payment-2"
                  />
                  <label className="payment-2">Paypal System</label>
                </div>
              </div>
              <div className="input-checkbox">
                <input type="checkbox" id="terms" className="terms-checkout" />
                <label className="terms">
                  <span></span>I ve read and accept the
                  <Link href="#">terms &amp; conditions</Link>
                </label>
              </div>
              <Link
                href="#"
                id="submit-bill-form"
                className="primary-btn order-submit"
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End Cart */}
    </>
  );
}
