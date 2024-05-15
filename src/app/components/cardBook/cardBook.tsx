"use client";
import Link from "next/link";
import Image from "next/image";
import "./cardBook.css";
import { useState, useEffect, useLayoutEffect } from "react";
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
      <Link
        href="/productDetail"
        className="template-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] rounded-[5px] border-solid border-[2px] border-[var(--border-color)] cursor-pointer transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
      >
        {item.time == "new" && (
          <div className="template-label absolute top-[10%] left-[27%] z-[1] bg-[var(--first-color)] rounded-[5px] translate-x-[-50%] translate-y-[-50%]">
            <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
              NEW
            </span>
          </div>
        )}

        <div className="template-img !relative w-[150px] h-[220px] mt-0 mb-0 ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
          <Image
            className="!relative duration-[300ms]"
            src="/images/biasach1.png"
            alt="Main Image"
            fill
            priority={true}
            sizes="(max-with: 768px)100vw"
          />
        </div>
        <div className="template-tag">
          <h2 className="mt-[12px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
            Dune
          </h2>
          <div className="template-writer text-[var(--text-color)] text-[16px]">
            John Deo
          </div>
          <div className="template-categories text-[var(--second-color)] text-[16px] mt-[8px]">
            {item.type}
          </div>
          <div className="template-price flex mb-[15px] mt-[8px] justify-center">
            {item.discount != "" && (
              <h4
                className="ml-[6px] font-normal text-[16px] text-[var(--title-color)]"
                style={{
                  textDecoration: "none",
                  color: "hsl(230, 70%, 16%)",
                  fontWeight: "bold",
                  marginRight: "8px",
                  marginTop: "2px",
                }}
              >
                ${item.discount}
              </h4>
            )}
            <h3
              className="text-[var(--title-color)] text-[16px] font-bold"
              style={
                item.discount != ""
                  ? {
                      textDecoration: "line-through",
                      color: "hsl(230, 16%, 45%)",
                      fontWeight: "400",
                      marginTop: "2px",
                    }
                  : { textDecoration: "none" }
              }
            >
              ${item.price}
            </h3>

            {item.discount != "" && (
              <span className="sale text-[14px] border border-solid rounded-[5px] bg-[var(--first-color)] text-[var(--white-color)] pt-[2px] pb-[2px] pl-[5px] pr-[5px] ml-[6px]">
                -{per}%
              </span>
            )}
          </div>
          <div className="template-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[var(--first-color)] rounded-[5px] relative text-[var(--first-color)] z-[1] tracking-[2px] transition duration-[300ms] hover:bg-[var(--first-color)]">
            <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms]">
              <FaShoppingCart />
            </i>
            <p className="add-cart font-bold text-[12px] text-[var(--first-color)] ml-[30px] duration-[250ms]">
              Add cart
            </p>
          </div>
          <div className="Icon-Container hidden flex-col absolute text-[var(--first-color)] top-[20px] right-[20px]">
            <i className="text-[20px] font-bold mb-[8px]">
              <LuEye />
            </i>
            <i className="text-[20px] font-bold mb-[8px]">
              <FaArrowRightArrowLeft />
            </i>
            <i className="text-[20px] font-bold mb-[8px]">
              <FiHeart className="HeartIcon" onClick={handleHeart} />
            </i>
          </div>
        </div>
      </Link>
    </>
  );
}
