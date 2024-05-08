"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import "./cart.css";

export default function Cart() {
  // Giả sử bạn có một mảng chứa các mục trong giỏ hàng
  const data: any = [
    {
      title: "Dune",
    },
  ];

  return (
    <>
      {/* Cart */}
      <section className="section-cart">
        <div className="section-cart-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="cart-container">
          {data.length > 0 ? (
            <div className="table-container">
              <table className="table-cart">
                <tbody>
                  <tr>
                    <th>Product</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                  {/* Sử dụng map để lặp qua các mục trong giỏ hàng */}
                  {data.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="td-product">
                        <Link href="/productDetail">
                          <Image
                            src="/images/biasach1.png"
                            alt="Main Image"
                            width={100}
                            height={100}
                            priority={true}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          />
                        </Link>
                        <h3 className="table-title">{item.title}</h3>
                      </td>
                      <td>
                        <h3 className="table-categories">Romance</h3>
                      </td>
                      <td>
                        <span className="table-price">$100</span>
                      </td>
                      <td>x1</td>
                      <td>
                        <span className="table-subtotal">$100</span>
                      </td>
                      <td>
                        <i className="fa-trash">
                          <FaRegTrashAlt />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </section>
      {/* End Cart */}
    </>
  );
}
