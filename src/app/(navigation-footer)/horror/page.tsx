"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function Horror() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "0",
      type: "Horror",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      type: "Horror",
      time: "new",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "0",
      type: "Horror",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "0",
      type: "Horror",
      time: "old",
    },
  ];

  const [dataLists, setDataList] = useState(data);

  // Filter page
  useLayoutEffect(() => {
    const filterData = dataLists.filter((item: any) => {
      return item.type.includes("Horror");
    });
    setDataList(filterData);
  }, []);

  return (
    <>
      {/* Horror */}
      <section className="section-books flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-books-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/horror"
              >
                Horror
              </Link>
            </li>
          </ul>
        </div>
        <div className="books-container flex justify-center mt-[var(--margin-top-font)]">
          <div className="books max-w-[var(--width-home)] w-[100%]">
            <div className="books-box grid grid-cols-4 gap-[15px]">
              {dataLists.map((item, index) => {
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
        </div>
      </section>
      {/* End Horror */}
    </>
  );
}
