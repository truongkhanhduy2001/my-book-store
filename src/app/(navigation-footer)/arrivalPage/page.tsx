"use client";
import Link from "next/link";
import "./arrivalView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function ArrivalsView() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "new",
    },
  ];

  return (
    <>
      {/* Arrivals */}
      <section className="section-p2-view">
        <div className="section-p2-container-view">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/arrivalPage">New arrivals</Link>
            </li>
          </ul>
        </div>
        <div className="arrivals-container-view">
          <div className="arrivals-view">
            <div className="arrivals-box-view">
              {data.map((item, index) => {
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
      {/* End Arrivals */}
    </>
  );
}
