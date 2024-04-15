"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function Adventure() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "",
      type: ["Adventure", "Comedy"],
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      type: "Adventure",
      time: "new",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      type: "Adventure",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      type: "Adventure",
      time: "old",
    },
  ];

  const [dataLists, setDataList] = useState(data);

  // Filter page
  useLayoutEffect(() => {
    const filterData = dataLists.filter((item: any) => {
      return item.type.includes("Adventure");
    });
    setDataList(filterData);
  }, []);

  return (
    <>
      {/* Adventure */}
      <section className="section-books">
        <div className="section-books-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/adventure">Adventure</Link>
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
      {/* End Adventure */}
    </>
  );
}
