"use client";
import Link from "next/link";
import Image from "next/image";
import "./wishlist.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function WishList() {
  const data: any = [
    {
      title: "Dune",
      price: "100",
      discount: "95",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      time: "old",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "old",
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
            <div className="no-product"></div>
          )}
        </div>
      </section>
      {/* End Wish list */}
    </>
  );
}
