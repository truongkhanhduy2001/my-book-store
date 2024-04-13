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
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "",
      time: "old",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      time: "",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "game",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "new",
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

  // Login condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn");
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        if (!checkLogin) {
          window.location.href = "/login";
        }
        e.preventDefault();
      });
    });
  }, [checkLogin]);

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
              {data.slice(-4).map((item, index) => {
                const { discount: discount, price: price, time } = item;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return (
                  <Link key={index} href="#" className="arrivals-card">
                    {time == "new" && (
                      <div className="arrivals-label">
                        <span className="new">NEW</span>
                      </div>
                    )}
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
                      <div className="Arrivalwriter">John Deo</div>
                      <div className="Arrivalcategories">
                        Thriller, Horror, Romance
                      </div>
                      <div className="Arrivalbook-price">
                        {item.discount != "" && (
                          <h4
                            style={{
                              textDecoration: "none",
                              color: "hsl(230, 70%, 16%)",
                              fontWeight: "bold",
                              marginRight: "8px",
                            }}
                          >
                            ${item.discount}
                          </h4>
                        )}
                        <h3
                          style={
                            item.discount != ""
                              ? {
                                  textDecoration: "line-through",
                                  color: "hsl(230, 16%, 45%)",
                                  fontWeight: "400",
                                }
                              : { textDecoration: "none" }
                          }
                        >
                          ${item.price}
                        </h3>

                        {item.discount != "" && (
                          <span className="sale">-{per}%</span>
                        )}
                      </div>
                      <div className="Arrivalcart-btn">
                        <i>
                          <FaShoppingCart />
                        </i>
                        <p className="add-cart"> Add cart</p>
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
