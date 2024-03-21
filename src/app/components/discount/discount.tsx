"use client";
import "./dicount.css";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
export default function Discount() {
  const data = [
    {
      title: "Dune",
    },
    {
      title: "Anime",
    },
    {
      title: "Naruto",
    },
    {
      title: "Drama",
    },
    {
      title: "Dragon",
    },
  ];
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Discountcart-btn");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }, []);
  const handleHeart = (e: any) => {
    e.target.closest(".HeartIcon").classList.toggle("active");
    e.preventDefault();
  };
  return (
    <section className="section-p3 section" id="booklist">
      <div className="section-p3-container">
        <h2>Book Discount</h2>
        <Link
          href="/pages/views/discountPage"
          style={{ display: "inline-block" }}
        >
          <h3>View all</h3>
        </Link>
      </div>
      <div className="section1-p3-container">
        <div className="p3-container">
          <ul className="p3-list">
            <li>
              <h3>Comedy</h3>
            </li>
            <li>
              <h3>Horror</h3>
            </li>
            <li>
              <h3>Comic</h3>
            </li>
            <li>
              <h3>Novel</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="discount-container">
        <div className="discount">
          <div className="discount-box">
            {data.slice(-10).map((item, index) => {
              return (
                <Link key={index} href="#" className="discount-card">
                  <div className="discount-img">
                    <Image
                      src="/images/biasach1.png"
                      alt="Main Image"
                      width={100}
                      height={100}
                      priority={true}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="discount-tag">
                    <h2>{item.title}</h2>
                    <p className="Discountwriter">John Deo</p>
                    <div className="Discountcategories">
                      Thriller, Horror, Romance
                    </div>
                    <p className="Discountbook-price">
                      $25.50
                      <sub>
                        <del>$28.60</del>
                      </sub>
                    </p>
                    <div className="Discountcart-btn">
                      <i>
                        <FaShoppingCart />
                      </i>
                      <p> Add cart</p>
                    </div>
                    <div className="Icon-Container">
                      <i>
                        <LuEye />
                      </i>
                      <i>
                        <FaArrowRightArrowLeft />
                      </i>
                      <i>
                        <FiHeart className="HeartIcon" onClick={handleHeart} />
                      </i>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
