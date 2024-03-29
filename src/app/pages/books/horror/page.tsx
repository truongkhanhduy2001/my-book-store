"use client";
import Link from "next/link";
import Image from "next/image";
import "./horror.css";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import LayOut from "@/app/pages/layout/page";
export default function Comedy() {
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
  ];

  useEffect(() => {
    const btntocart = document.querySelectorAll(".books-cart-btn");
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
    <LayOut>
      {/* Horror */}
      <section className="section-books">
        <div className="section-books-container">
          <h2>Horror</h2>
        </div>
        <div className="books-container">
          <div className="books">
            <div className="books-box">
              {data.slice(-4).map((item, index) => {
                return (
                  <Link key={index} href="#" className="books-card">
                    <div className="books-image">
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
                    <div className="books-tag">
                      <h2>Dune</h2>
                      <p className="books-writer">John Deo</p>
                      <div className="books-categories">
                        Thriller, Horror, Romance
                      </div>
                      <p className="books-price">$25.50</p>
                      <div className="books-cart-btn">
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
                          <FiHeart
                            className="HeartIcon"
                            onClick={handleHeart}
                          />
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
      {/* End horror */}
    </LayOut>
  );
}
