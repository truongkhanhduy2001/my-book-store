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
      discount: "0",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "0",
      time: "new",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "0",
      time: "new",
    },
    {
      title: "Drama",
      price: "100",
      discount: "0",
      time: "new",
    },
  ];

  return (
    <>
      {/* Arrivals */}
      <section className="section-p2-view flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-p2-container-view max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/arrivalPage"
              >
                New arrivals
              </Link>
            </li>
          </ul>
        </div>
        <div className="arrivals-container-view flex justify-center mt-[var(--margin-top-font)]">
          <div className="arrivals-view max-w-[var(--width-home)] w-[100%]">
            <div className="arrivals-box-view grid grid-cols-4 gap-[15px]">
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
