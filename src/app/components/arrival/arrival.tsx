"use client";
import Link from "next/link";
import "./arrival.css";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
export default function Arrival() {
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
    {
      title: "Dragon",
    },
  ];
  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(btntocart);
      });
    });
  }, []);
  // Icon heart
  const handleHeart = (e: any) => {
    e.target.closest(".HeartIcon").classList.toggle("active");
    e.preventDefault();
  };
  return (
    <section className="section-p2">
      <div className="section-p2-container">
        <h2>New Arrivals</h2>
        <Link
          href="/pages/views/arrivalPage"
          style={{ display: "inline-block" }}
        >
          <h3>View all</h3>
        </Link>
      </div>
      <div className="arrivals-container">
        <div className="arrivals">
          <div className="arrivals-box">
            {data.slice(-6).map((item, index) => {
              return (
                <Link key={index} href="#" className="arrivals-card">
                  <div className="arrivals-image">
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
                    ></Image>
                  </div>
                  <div className="arrivals-tag">
                    <h2>{item.title}</h2>
                    <p className="Arrivalwriter">John Deo</p>
                    <div className="Arrivalcategories">
                      Thriller, Horror, Romance
                    </div>
                    <p className="Arrivalbook-price">$25.50</p>
                    <div className="Arrivalcart-btn">
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
