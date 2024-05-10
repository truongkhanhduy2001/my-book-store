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
      <section className="section-cart flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-cart-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
        </div>
        <div className="cart-container flex justify-center mt-[var(--margin-top-font)]">
          {data.length > 0 ? (
            <div className="table-container flex max-w-[var(--width-home)] w-[100%] mt-[20px] justify-center">
              <table className="table-cart text-[var(--title-color)] w-[100%]">
                <tbody>
                  <tr>
                    <th className="p-[8px] text-left">Product</th>
                    <th className="p-[8px] text-left">Categories</th>
                    <th className="p-[8px] text-left">Price</th>
                    <th className="p-[8px] text-left">Quantity</th>
                    <th className="p-[8px] text-left">Subtotal</th>
                    <th className="p-[8px] text-left">Remove</th>
                  </tr>
                  {/* Sử dụng map để lặp qua các mục trong giỏ hàng */}
                  {data.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="p-[8px] flex items-center">
                        <Link className="!relative" href="/productDetail">
                          <Image
                            className="max-w-[100px] w-[100%] h-[auto] !relative"
                            src="/images/biasach1.png"
                            alt="Main Image"
                            fill
                            priority={true}
                            sizes="(max-with: 768px)100vw"
                          />
                        </Link>
                        <h3 className="table-title text-[20px] font-medium ml-[10px]">
                          {item.title}
                        </h3>
                      </td>
                      <td className="p-[8px]">
                        <h3 className="table-categories">Romance</h3>
                      </td>
                      <td className="p-[8px]">
                        <span className="table-price">$100</span>
                      </td>
                      <td className="p-[8px]">x1</td>
                      <td className="p-[8px]">
                        <span className="table-subtotal">$100</span>
                      </td>
                      <td className="p-[8px]">
                        <i className="fa-trash cursor-pointer text-[red]">
                          <FaRegTrashAlt />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[var(--title-color)] text-[15px]">
              Your cart is empty.
            </p>
          )}
        </div>
      </section>
      {/* End Cart */}
    </>
  );
}
