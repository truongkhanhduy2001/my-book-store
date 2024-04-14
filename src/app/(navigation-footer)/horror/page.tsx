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
      discount: "",
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
      discount: "",
      type: "Horror",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      type: "Horror",
      time: "old",
    },
  ];

  const [dataLists, setDataList] = useState(data);

  useLayoutEffect(() => {
    const filterData = dataLists.filter((item: any) => {
      return item.type.includes("Horror");
    });
    setDataList(filterData);
  }, []);

  return (
    <>
      {/* Horror */}
      <section className="section-books">
        <div className="section-books-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/horror">Horror</Link>
            </li>
          </ul>
        </div>
        <div className="books-container">
          <div className="books">
            <div className="books-box">
              {dataLists.slice(-16).map((item, index) => {
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
