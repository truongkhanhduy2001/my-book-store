"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import SideBar from "@/app/components/filter/filter";
export default function Science() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "",
      type: "Science",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      type: "Science",
      time: "new",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      type: "Science",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      type: "Science",
      time: "old",
    },
  ];

  const [dataLists, setDataList] = useState(data);

  // Filter page
  useLayoutEffect(() => {
    const filterData = dataLists.filter((item: any) => {
      return item.type.includes("Science");
    });
    setDataList(filterData);
  }, []);

  return (
    <>
      {/* Cartoon */}
      <section className="section-books">
        <div className="section-books-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/science">Science</Link>
            </li>
          </ul>
        </div>
        <div className="books-container">
          <div className="books">
            <div className="books-left">
              <SideBar />
            </div>
            <div className="books-right">
              <div className="books-box">
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
        </div>
      </section>
      {/* End Cartoon */}
    </>
  );
}
