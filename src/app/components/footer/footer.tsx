"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import "./footer.css";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot, FaArrowUp } from "react-icons/fa6";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaInstagram,
  FaBookOpen,
} from "react-icons/fa";

export default function Footer() {
  // Scroll up
  useEffect(() => {
    window.addEventListener("scroll", (e: any) => {
      const scrollUp: any = document.querySelector(".scroll-up");
      const scroll = window.scrollY;
      if (scroll < 350) {
        scrollUp.style.display = "none";
      } else {
        scrollUp.style.display = "block";
      }
    });
  }, []);
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1000,
      smooth: "esaeInOutQuint",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="tag">
          <div className="logo-footer">
            <i>
              <FaBookOpen />
            </i>
          </div>
          <p>
            Visit our website to explore and choose the right books for you.
            From novels to textbooks, we have it all!<br></br> Please accompany
            Book Store on the journey to discover knowledge and creativity!
            <br></br> Order your book today!
          </p>
        </div>
        <div className="tag">
          <h1>Our Locations</h1>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            VietNam
          </Link>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            USA
          </Link>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            UK
          </Link>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            China
          </Link>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            France
          </Link>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            India
          </Link>
        </div>

        <div className="tag">
          <h1>Newsletter</h1>
          <div className="searchBar">
            <input type="text" placeholder="Your email here" />
            <button type="submit">Subscribe</button>
          </div>
        </div>

        <div className="tag">
          <div>
            <h1>Contact Info</h1>
            <a href="#">
              <i className="fa-solid fa-phone">
                <IoCall />
              </i>
              +84 12 345 6789
            </a>
            <a href="#">
              <i className="fa-solid fa-phone">
                <IoCall />
              </i>
              +84 32 444 699
            </a>
            <a href="#">
              <i className="fa-solid fa-envelope">
                <MdEmail />
              </i>
              bookstore123@gmail.com
            </a>
          </div>
        </div>
      </div>
      {/* Icon social */}
      <div className="wrapper-container">
        <div className="wrapper">
          <div className="icon facebook">
            <div className="tooltip">Facebook</div>
            <span>
              <i>
                <FaFacebookF />
              </i>
            </span>
          </div>
          <div className="icon twitter">
            <div className="tooltip">Twitter</div>
            <span>
              <i>
                <FaTwitter />
              </i>
            </span>
          </div>
          <div className="icon github">
            <div className="tooltip">GitHub</div>
            <span>
              <i>
                <FaGithub />
              </i>
            </span>
          </div>
          <div className="icon youtube">
            <div className="tooltip">Youtube</div>
            <span>
              <i>
                <FaYoutube />
              </i>
            </span>
          </div>
          <div className="icon instagram">
            <div className="tooltip">Instagram</div>
            <span>
              <i>
                <FaInstagram />
              </i>
            </span>
          </div>
        </div>
      </div>
      {/* End icon social */}
      <div className="end">
        Design By
        <span>
          <i className="icon-ds"></i>Trương Khánh Duy, Nguyễn Văn Điểm
        </span>
        | All rights reservel!
      </div>
      <div onClick={scrollToTop} className="scroll-up">
        <span>
          <FaArrowUp />
        </span>
      </div>
    </footer>
  );
}
