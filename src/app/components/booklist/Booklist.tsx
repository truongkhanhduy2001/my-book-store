"use client";
import "./Booklist.css";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { PiHeartStraight } from "react-icons/pi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
export default function BookList() {
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
    {
      title: "Queen",
    },
    {
      title: "Fly",
    },
    {
      title: "Bird",
    },
    {
      title: "Silent Hill",
    },
  ];
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Listcart-btn");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }, []);
  return (
    <section className="section-p3">
      <div className="section-p3-container">
        <h2>Book List</h2>
        <Link
          href="/pages/views/listBookPage"
          style={{ display: "inline-block" }}
        >
          <h3>View all</h3>
        </Link>
      </div>
      <div className="section1-p3-container">
        <div className="p3-container">
          <ul className="p3-list">
            <li>
              <h3>Classics</h3>
            </li>
            <li>
              <h3>Comic</h3>
            </li>
            <li>
              <h3>Horror</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="books-container">
        <div className="books">
          <div className="books-box">
            {data.slice(-10).map((item, index) => {
              return (
                <Link key={index} href="#" className="books-card">
                  <div className="books-img">
                    <Image
                      src="/images/biasach1.png"
                      alt="Main Image"
                      width={100}
                      height={100}
                      priority={true}
                    />
                  </div>
                  <div className="books-tag">
                    <h2>{item.title}</h2>
                    <p className="Listwriter">John Deo</p>
                    <div className="Listcategories">
                      Thriller, Horror, Romance
                    </div>
                    <p className="Listbook-price">
                      $25.50
                      <sub>
                        <del>$28.60</del>
                      </sub>
                    </p>
                    <div className="Listcart-btn">
                      <p> Add to cart</p>
                    </div>
                    <div className="ListIcon">
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
