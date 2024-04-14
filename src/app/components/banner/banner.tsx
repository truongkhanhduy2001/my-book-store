"use client";
import "./banner.css";
import Link from "next/link";
import React, { useRef, useState } from "react";
import BannerSlider from "../slider/banner/Bannerslider";
export default function Banner() {
  return (
    /* Main */
    <section className="banner-container" id="banner">
      <div className="banner">
        <div>
          <div className="banner-tag">
            <h1>
              WELCOME TO
              <br />
              <span>BOOK STORE</span>
            </h1>
            <p style={{ margin: "30px 0 0 0" }}>
              Visit our website to explore and choose the right books for you.
              From novels to textbooks, we have it all!<br></br> Please
              accompany Book Store on the journey to discover knowledge and
              creativity!<br></br> Order your book today!
            </p>
            <div className="banner-btn">
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
