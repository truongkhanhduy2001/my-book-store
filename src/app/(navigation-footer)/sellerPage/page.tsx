"use client";
import Link from "next/link";
import Image from "next/image";
import "./sellerView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import { IoIosArrowBack } from "react-icons/io";
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
  // Button cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Sellercart-btn-view");
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
      {/* Best Seller */}
      <section className="section-p1-view">
        <div className="section-p1-container-view">
          <Link href="/" style={{ display: "inline-block" }}>
            <i className="icon-arrow-view">
              <IoIosArrowBack />
              <h2>Best Seller</h2>
            </i>
          </Link>
        </div>
        <div className="best-seller-container-view">
          <div className="best-seller-view">
            <div className="best-seller-box-view">
              {data.slice(-12).map((item, index) => {
                return (
                  <Link key={index} href="#" className="best-seller-card-view">
                    <div className="best-seller-img-view">
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
                    <div className="best-seller-tag-view">
                      <h2>Dune</h2>
                      <p className="Sellerwriter-view">John Deo</p>
                      <div className="Sellercategories-view">
                        Thriller, Horror, Romance
                      </div>
                      <p className="Sellerbook-price-view">
                        $25.50
                        <sub>
                          <del>$28.60</del>
                        </sub>
                        <span className="sale">-30%</span>
                      </p>
                      <div className="Sellercart-btn-view">
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
            <Paginate />
          </div>
        </div>
      </section>
      {/* End Best Seller */}
    </>
  );
}
