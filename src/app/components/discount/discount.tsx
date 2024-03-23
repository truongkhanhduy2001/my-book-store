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
      type: ["Horror"],
    },
    {
      title: "Dune",
      type: ["Horror", "Comedy"],
    },
    {
      title: "Anime",
      type: "Novel",
    },
    {
      title: "Anime",
      type: "Comic",
    },
    {
      title: "Naruto",
      type: "Comic",
    },
  ];
  // Type
  const [dataList, setDataList] = useState(data);

  function changePositionNav(e: any) {
    document.querySelector(".nav-discount.active")?.classList.remove("active");
    e.classList.add("active");
  }

  const handleAllBooks = (e: any) => {
    setDataList(data);
    changePositionNav(e.target.closest(".nav-discount"));
  };

  const handleTypeComedy = (e: any) => {
    const item = data.filter((item, index) => {
      return item.type.includes("Comedy");
    });
    setDataList(item);
    changePositionNav(e.target.closest(".nav-discount"));
  };
  const handleTypeHorror = (e: any) => {
    const item = data.filter((item, index) => {
      console.log(item);
      return item.type.includes("Horror");
    });
    setDataList(item);
    changePositionNav(e.target.closest(".nav-discount"));
  };
  const handleTypeComic = (e: any) => {
    const item = data.filter((item, index) => {
      return item.type.includes("Comic");
    });
    setDataList(item);
    changePositionNav(e.target.closest(".nav-discount"));
  };
  const handleTypeNovel = (e: any) => {
    const item = data.filter((item, index) => {
      return item.type.includes("Novel");
    });
    setDataList(item);
    changePositionNav(e.target.closest(".nav-discount"));
  };
  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Discountcart-btn");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }, []);
  // Icon heart
  const handleHeart = (e: any) => {
    e.target.closest(".HeartIcon").classList.toggle("active");
    e.preventDefault();
  };
  return (
    <section className="section-p3 ">
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
            <li className="nav-discount active">
              <h3 onClick={handleAllBooks}>All books</h3>
            </li>
            <li className="nav-discount">
              <h3 onClick={handleTypeComedy}>Comedy</h3>
            </li>
            <li className="nav-discount">
              <h3 onClick={handleTypeHorror}>Horror</h3>
            </li>
            <li className="nav-discount">
              <h3 onClick={handleTypeComic}>Comic</h3>
            </li>
            <li className="nav-discount">
              <h3 onClick={handleTypeNovel}>Novel</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className="discount-container">
        <div className="discount">
          <div className="discount-box">
            {dataList.slice(-4).map((item, index) => {
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
                    <div className="Discountcategories">{item.type}</div>
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
