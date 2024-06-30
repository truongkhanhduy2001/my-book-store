"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./cart.css";
import { useCustomContext } from "@/provider/CustomProvider";
import { useCartContext } from "@/provider/CartProvider";

export default function Cart() {
  const { user } = useCustomContext();
  const { cart, getCart } = useCartContext();

  // Delete item from cart
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
          {cart && cart.listItem.length > 0 ? (
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
                  {/* Sử dụng map để lặp qua các mục trong giỏ hàng */}
                  {cart.listItem.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="p-[8px] flex items-center">
                        <Link
                          className="!relative"
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
                          onClick={() => handleDeleteItem(item.productId._id)}
                        >
                          <FaRegTrashAlt />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="wrapper text-[var(--title-color)] text-[15px]">
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
      </section>
      {/* End Cart */}
    </>
  );
}
