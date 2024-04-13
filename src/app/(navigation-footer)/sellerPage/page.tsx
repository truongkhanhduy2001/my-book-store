"use client";
import Link from "next/link";
import "./sellerView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import { IoIosArrowBack } from "react-icons/io";

export default function SellerView() {
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
      discount: "45",
      time: "new",
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

  // Login condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Button cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Sellercart-btn-view");
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
      {/* Best Seller */}
      <section className="section-p1-view">
        <div className="section-p1-container-view">
          <Link href="/" style={{ display: "inline-block" }}>
            <i className="icon-arrow-view">
              <IoIosArrowBack />
              <h2>Best Seller</h2>
            </i>
          </Link>
        </div>
        <div className="best-seller-container-view">
          <div className="best-seller-view">
            <div className="best-seller-box-view">
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
      {/* End Best Seller */}
    </>
  );
}
