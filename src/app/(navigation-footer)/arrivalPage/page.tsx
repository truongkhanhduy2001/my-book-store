"use client";
import Link from "next/link";
import Image from "next/image";
import "./arrivalView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import { IoIosArrowBack } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function Arrivals() {
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
    const btntocart = document.querySelectorAll(".Arrivalcart-btn-view");
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
      {/* Arrivals */}
      <section className="section-p2-view">
        <div className="section-p2-container-view">
          <Link href="/" style={{ display: "inline-block" }}>
            <i className="icon-arrow2-view">
              <IoIosArrowBack />
              <h2>New Arrivals</h2>
            </i>
          </Link>
        </div>
        <div className="arrivals-container-view">
          <div className="arrivals-view">
            <div className="arrivals-box-view">
              {data.slice(-12).map((item, index) => {
                return (
                  <Link key={index} href="#" className="arrivals-card-view">
                    <div className="book-label">
                      <span className="new">NEW</span>
                    </div>
                    <div className="arrivals-img-view">
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
                    <div className="arrivals-tag-view">
                      <h2>Dune</h2>
                      <p className="Arrivalwriter-view">John Deo</p>
                      <div className="Arrivalcategories-view">
                        Thriller, Horror, Romance
                      </div>
                      <p className="Arrivalbook-price-view">$25.50</p>
                      <div className="Arrivalcart-btn-view">
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
            <Paginate />
          </div>
        </div>
      </section>
      {/* End Arrivals */}
    </>
  );
}