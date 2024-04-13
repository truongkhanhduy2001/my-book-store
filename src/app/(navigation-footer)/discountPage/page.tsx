"use client";
import Link from "next/link";
import "./discountView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import { IoIosArrowBack } from "react-icons/io";
export default function DiscountView() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "55",
      time: "old",
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
      discount: "60",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "90",
      time: "old",
    },
  ];

  // Login condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Button cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Discountcart-btn-view");
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        if (!checkLogin) {
          window.location.href = "/login";
        }
        e.preventDefault();
      });
    });
  }, [checkLogin]);

  // Icon heart
  const handleHeart = (e: any) => {
    e.target.closest(".HeartIcon").classList.toggle("active");
    e.preventDefault();
  };
  return (
    <>
      {/* Discount */}
      <section className="section-p3-view">
        <div className="section-p3-container-view">
          <Link href="/" style={{ display: "inline-block" }}>
            <i className="icon-arrow3-view">
              <IoIosArrowBack />
              <h2>Book Discount</h2>
            </i>
          </Link>
        </div>
        <div className="discount-container-view">
          <div className="discount-view">
            <div className="discount-box-view">
              {data.slice(-12).map((item, index) => {
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
      {/* End Discount */}
    </>
  );
}
