"use client";
import Link from "next/link";
import Image from "next/image";
import "./discountView.css";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function Discount() {
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

  // Button cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Discountcart-btn-view");
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
    <>
      {/* Discount */}
      <section className="section-p3-view">
        <div className="section-p3-container-view">
          <Link href="/" style={{ display: "inline-block" }}>
            <i className="icon-arrow3-view">
              <IoIosArrowBack />
              <h2>Book Discount</h2>
            </i>
          </Link>
        </div>
        <div className="discount-container-view">
          <div className="discount-view">
            <div className="discount-box-view">
              {data.slice(-12).map((item, index) => {
                return (
                  <Link key={index} href="#" className="discount-card-view">
                    <div className="discount-img-view">
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
                    <div className="discount-tag-view">
                      <h2>Dune</h2>
                      <p className="Discountwriter-view">John Deo</p>
                      <div className="Discountcategories-view">
                        Thriller, Horror, Romance
                      </div>
                      <p className="Discountbook-price-view">
                        $25.50
                        <sub>
                          <del>$28.60</del>
                        </sub>
                        <span className="sale">-30%</span>
                      </p>
                      <div className="Discountcart-btn-view">
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
      {/* End Books list */}
    </>
  );
}
