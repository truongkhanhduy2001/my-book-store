"use client";
import Link from "next/link";
import Image from "next/image";
import "./listBook.css";
import { PiHandbag } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { PiHeartStraight } from "react-icons/pi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import LayOut from "@/app/pages/layout/page";
export default function Seller() {
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Listcart-btn-view");
    console.log(btntocart);
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }, []);
  return (
    <LayOut>
      {/* Books list */}
      <section className="section-p3-view">
        <div className="section-p3-container-view">
          <Link href="/" style={{ display: "inline-block" }}>
            <i className="icon-arrow3-view">
              <IoIosArrowBack />
              <h2>Book List</h2>
            </i>
          </Link>
        </div>
        <div className="section1-p3-container-view">
          <div className="p3-container-view">
            <ul className="p3-list-view">
              <li>
                <h3>Classics</h3>
              </li>
              <li>
                <h3>Comic</h3>
              </li>
              <li>
                <h3>Horror</h3>
              </li>
            </ul>
          </div>
        </div>
        <div className="books-container-view">
          <div className="books-view">
            <div className="books-box-view">
              <Link href="#" className="books-card-view">
                <div className="books-img-view">
                  <Image
                    src="/images/biasach1.png"
                    alt="Main Image"
                    width={100}
                    height={100}
                    priority={true}
                  />
                </div>
                <div className="books-tag-view">
                  <h2>Dune</h2>
                  <p className="Listwriter-view">John Deo</p>
                  <div className="Listcategories-view">
                    Thriller, Horror, Romance
                  </div>
                  <p className="Listbook-price-view">
                    $25.50
                    <sub>
                      <del>$28.60</del>
                    </sub>
                  </p>
                  <div className="Listcart-btn-view">
                    <p> Add to cart</p>
                  </div>
                  <div className="ListIcon-view">
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
      {/* End Books list */}
    </LayOut>
  );
}
