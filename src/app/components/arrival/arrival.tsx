"use client";
import Link from "next/link";
import "./arrival.css";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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

  // Save scroll
  useEffect(() => {
    // Get scroll position from localStorage
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
    // Scroll event listener to save scroll position
    const handleScroll = () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn");
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
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="section-p2" id="newarrival">
      <div className="section-p2-container">
        <h2>New Arrivals</h2>
        <Link href="/arrivalPage" style={{ display: "inline-block" }}>
          <h3>View all</h3>
        </Link>
      </div>
      <div className="arrivals-container">
        <div className="arrivals">
          <div className="arrivals-box slider-container">
            <Slider {...settings}>
              {data.slice(-3).map((item, index) => {
                return (
                  <Link key={index} href="#" className="arrivals-card">
                    <div className="book-label">
                      <span className="new">NEW</span>
                    </div>
                    <div className="arrivals-img">
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
            <Slider {...settings}>
              {data.slice(-3).map((item, index) => {
                return (
                  <Link key={index} href="#" className="arrivals-card">
                    <div className="book-label">
                      <span className="new">NEW</span>
                    </div>
                    <div className="arrivals-img">
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
