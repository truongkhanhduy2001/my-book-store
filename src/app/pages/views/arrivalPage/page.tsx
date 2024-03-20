"use client";
import Link from "next/link";
import Image from "next/image";
import "./arrivalView.css";
import { PiHandbag } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { PiHeartStraight } from "react-icons/pi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import LayOut from "@/app/pages/layout/page";
export default function Arrivals() {
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn-view");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }, []);
  return (
    <LayOut>
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
              <Link href="#" className="arrivals-card-view">
                <div className="arrivals-image-view">
                  <Image
                    src="/images/biasach1.png"
                    alt="Main Image"
                    width={100}
                    height={100}
                    priority={true}
                  ></Image>
                </div>
                <div className="arrivals-tag-view">
                  <h2>Dune</h2>
                  <p className="Arrivalwriter-view">John Deo</p>
                  <div className="Arrivalcategories-view">
                    Thriller, Horror, Romance
                  </div>
                  <p className="Arrivalbook-price-view">
                    $25.50
                    <sub>
                      <del>$28.60</del>
                    </sub>
                  </p>
                  <div className="Arrivalcart-btn-view">
                    <i>
                      <FaShoppingCart />
                    </i>
                    <p> Add cart</p>
                  </div>
                  <div className="ArrivalIcon-view">
                    <i>
                      <LuEye />
                    </i>
                    <i>
                      <FaArrowRightArrowLeft />
                    </i>
                    <i>
                      <PiHeartStraight />
                    </i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End Arrivals */}
    </LayOut>
  );
}
