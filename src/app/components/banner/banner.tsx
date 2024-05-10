"use client";
import "./banner.css";
import Link from "next/link";
import React, { useRef, useState } from "react";
import BannerSlider from "../slider/banner/Bannerslider";
export default function Banner() {
  return (
    /* Main */
    <section
      className="banner-container flex justify-center items-center"
      id="banner"
    >
      <div className="banner max-w-[var(--width-home)] w-[100%]">
        <div className="flex mt-[200px]">
          <div className="banner-tag flex-col font-bold mr-[16px]">
            <h1 className="text-[55px] text-[var(--title-color)] font-sans">
              WELCOME TO
              <br />
              <span className="text-[var(--first-color)] flex-none">
                BOOK STORE
              </span>
            </h1>
            <p
              style={{ margin: "30px 0 0 0" }}
              className="text-[18px] w-[650px] text-justify text-[var(--text-color)] leading-[22px]"
            >
              Visit our website to explore and choose the right books for you.
              From novels to textbooks, we have it all!<br></br> Please
              accompany Book Store on the journey to discover knowledge and
              creativity!<br></br> Order your book today!
            </p>
            <div className="banner-btn mt-[40px] text-[var(--white-color)] pt-[10px] pb-[10px] pl-[20px] pr-[20px] rounded-[5px] bg-[var(--first-color)] w-[140px] text-[16px] transition-shadow duration-[400ms] hover:shadow-[0_4px_32px_var(--first-color)]">
              <Link href="#">Explore now</Link>
            </div>
          </div>
          <BannerSlider />
        </div>
      </div>
    </section>
    /* End main */
  );
}
