"use client";
import Link from "next/link";
import "./sellerView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function SellerView() {
  const data = [
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
      {/* Best Seller */}
      <section className="section-p1-view">
        <div className="section-p1-container-view">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sellerPage">Best seller</Link>
            </li>
          </ul>
        </div>
        <div className="best-seller-container-view">
          <div className="best-seller-view">
            <div className="best-seller-box-view">
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
      {/* End Best Seller */}
    </>
  );
}
