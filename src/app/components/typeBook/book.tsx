"use client";
import Link from "next/link";
import Image from "next/image";
import "./book.css";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

// Định nghĩa kiểu dữ liệu cho mỗi item trong mảng data
interface BookItem {
  title: string;
  writer: string;
  categories: string;
  price: string;
}
// Định nghĩa kiểu Props cho component Book
interface BookProps {
  data: BookItem[]; // data sẽ là một mảng các BookItem
}

export default function Book({ data }: BookProps) {
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
    <div className="books-container">
      <div className="books">
        <div className="books-box">
          {data.slice(-12).map((item, index) => {
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
                  <h2>{item.title}</h2>
                  <p className="books-writer">{item.writer}</p>
                  <div className="books-categories">{item.categories}</div>
                  <p className="books-price">{item.price}</p>
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
  );
}
