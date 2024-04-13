"use client";
import Link from "next/link";
import Image from "next/image";
import "./cardBook.css";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function CardBook(props: any) {
  const { item, per } = props;
  // Login condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Button cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".template-btn");
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
  return (
    <>
      <Link href="#" className="template-card">
        {item.time == "new" && (
          <div className="template-label">
            <span className="new">NEW</span>
          </div>
        )}

        <div className="template-img">
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
        <div className="template-tag">
          <h2>Dune</h2>
          <div className="template-writer">John Deo</div>
          <div className="template-categories">Thriller, Horror, Romance</div>
          <div className="template-price">
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

            {item.discount != "" && <span className="sale">-{per}%</span>}
          </div>
          <div className="template-btn">
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
              <FiHeart className="HeartIcon" onClick={handleHeart} />
            </i>
          </div>
        </div>
      </Link>
    </>
  );
}
