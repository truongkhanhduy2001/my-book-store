"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import "./seller.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
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
    {
      title: "Dragon",
    },
  ];
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Sellercart-btn");
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
    <section className="section-p1 section" id="bestseller">
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
        <Swiper
          navigation={true}
          loop={true}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="best-seller">
              <div className="best-seller-box">
                {data.slice(-5).map((item, index) => {
                  return (
                    <Link key={index} href="#" className="best-seller-card">
                      <div className="best-seller-img">
                        <Image
                          src="/images/biasach1.png"
                          alt="Main Image"
                          width={100}
                          height={100}
                          priority={true}
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
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="best-seller">
              <div className="best-seller-box">
                {data.slice(-5).map((item, index) => {
                  return (
                    <Link key={index} href="#" className="best-seller-card">
                      <div className="best-seller-img">
                        <Image
                          src="/images/biasach1.png"
                          alt="Main Image"
                          width={100}
                          height={100}
                          priority={true}
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
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
