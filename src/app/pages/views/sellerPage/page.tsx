"use client";
import Link from "next/link";
import Image from "next/legacy/image";
import "./sellerView.css";
import { IoIosArrowBack } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import LayOut from "@/app/pages/layout/page";
export default function Seller() {
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Sellercart-btn-view");
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
    <LayOut>
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
              <Link href="#" className="best-seller-card-view">
                <div className="best-seller-img-view">
                  <Image
                    src="/images/biasach1.png"
                    alt="Main Image"
                    width={100}
                    height={100}
                    priority={true}
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
                      <FiHeart className="HeartIcon" onClick={handleHeart} />
                    </i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End Best Seller */}
    </LayOut>
  );
}
