"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import SideBar from "@/app/components/filter/filter";
export default function Adventure() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "",
      type: ["Adventure", "Comedy"],
      time: "old",
    },
    {
      title: "Anime",
      price: "100",
      discount: "",
      type: ["Adventure", "Thriller"],
      time: "old",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      type: ["Adventure", "Science"],
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      type: ["Adventure", "Romance"],
      time: "old",
    },
    {
      title: "Tom",
      price: "900",
      discount: "",
      type: ["Adventure", "Horror"],
      time: "old",
    },
  ];
  const [dataLists, setDataList] = useState([]);
  const [type, setType] = useState(["Adventure"]);

  const getDataParent = (data: any) => {
    setType([data, ...type]);
  };

  const getDataRemove = (data: any) => {
    let filter: any = type.filter((item: any) => {
      return item != data;
    });
    setType([...filter]);
  };

  useEffect(() => {
    let filter: any = data.filter((item: any) => {
      return item.type.some((e: any) => type.includes(e));
    });
    setDataList(filter);
  }, [type]);

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
            <div className="books-left">
              <SideBar
                parent={getDataParent}
                parentRemoveType={getDataRemove}
                typeDefault="Adventure"
              />
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
      {/* End Adventure */}
    </>
  );
}
