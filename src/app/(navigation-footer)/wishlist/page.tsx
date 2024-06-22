"use client";
import Link from "next/link";
import Image from "next/image";
import "./wishlist.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import { TiShoppingCart } from "react-icons/ti";
import { useCustomContext } from "@/provider/CustomProvider";

export default function WishList() {
  const { user } = useCustomContext();

  const data: any = [
    {
      title: "Dune",
      price: "100",
      discount: "95",
      time: "new",
    },
  ];

  return (
    <>
      {/* Wish list */}
      <section className="section-wish-list flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-wish-list-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/wishlist"
              >
                Wish list
              </Link>
            </li>
          </ul>
        </div>
        <div className="wish-list-container flex justify-center mt-[var(--margin-top-font)]">
          {data.length > 0 ? (
            <div className="wish-list max-w-[var(--width-home)] w-[100%]">
              <div className="wish-list-box grid grid-cols-4 gap-[15px]">
                {data.map((item: any, index: any) => {
                  const { discount: discount, price: price, time } = item;
                  const per = (
                    ((Number(discount) - Number(price)) / Number(price)) *
                    100
                  ).toFixed(0);
                  return <CardBook key={index} item={item} per={per} />;
                })}
              </div>
              <Paginate />
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
                    Your wish list is empty!
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
      {/* End Wish list */}
    </>
  );
}
