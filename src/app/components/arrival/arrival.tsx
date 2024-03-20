"use client";
import Link from "next/link";
import "./arrival.css";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { PiHeartStraight } from "react-icons/pi";
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
      title: "Bee",
    },
  ];
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }, []);
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
                    ></Image>
                  </div>
                  <div className="arrivals-tag">
                    <h2>{item.title}</h2>
                    <p className="Arrivalwriter">John Deo</p>
                    <div className="Arrivalcategories">
                      Thriller, Horror, Romance
                    </div>
                    <p className="Arrivalbook-price">
                      $25.50
                      <sub>
                        <del>$28.60</del>
                      </sub>
                    </p>
                    <div className="Arrivalcart-btn">
                      <i>
                        <FaShoppingCart />
                      </i>
                      <p> Add cart</p>
                    </div>
                    <div className="ArrivalIcon">
                      <i>
                        <LuEye />
                      </i>
                      <i>
                        <FaArrowRightArrowLeft />
                      </i>
                      <i>
                        <PiHeartStraight />
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
