"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import "./seller.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function Seller() {
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
  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Sellercart-btn");
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
  // Slider
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="section-p1 ">
      <div className="section-p1-container">
        <h2>Best Seller</h2>
        <Link
          href="/pages/views/sellerPage"
          style={{ display: "inline-block" }}
        >
          <h3>View all</h3>
        </Link>
      </div>
      <div className="best-seller-container">
        <div className="best-seller">
          <div className="best-seller-box slider-container">
            <Slider {...settings}>
              {data.slice(-4).map((item, index) => {
                return (
                  <Link key={index} href="#" className="best-seller-card">
                    <div className="best-seller-img">
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
                    <div className="best-seller-tag">
                      <h2>{item.title}</h2>
                      <p className="Sellerwriter">John Deo</p>
                      <div className="Sellercategories">
                        Thriller, Horror, Romance
                      </div>
                      <p className="Sellerbook-price">
                        $25.50
                        <sub>
                          <del>$28.60</del>
                        </sub>
                      </p>
                      <div className="Sellercart-btn">
                        <i>
                          <FaShoppingCart />
                        </i>
                        <p>Add cart</p>
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
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
