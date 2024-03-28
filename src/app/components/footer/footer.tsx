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
      <div className="footer-container container grid">
        <div>
          <i className="footer-logo">
            <FaBookOpen />
          </i>
          <p className="footer-des">
            Visit our website to explore and choose the right books for you.
            From novels to textbooks, we have it all!<br></br> Please accompany
            Book Store on the journey to discover knowledge and creativity!
            <br></br> Order your book today!
          </p>
        </div>

        <div className="footer-data grid">
          <div>
            <h1 className="footer-title">Our location</h1>
            <ul className="footer-sub">
              <li>
                <i className="footer-subs">
                  <FaLocationDot />
                </i>
                Viet Nam
              </li>
              <li>
                <i className="footer-subs">
                  <FaLocationDot />
                </i>
                UK
              </li>
              <li>
                <i className="footer-subs">
                  <FaLocationDot />
                </i>
                USA
              </li>
              <li>
                <i className="footer-subs">
                  <FaLocationDot />
                </i>
                China
              </li>
              <li>
                <i className="footer-subs">
                  <FaLocationDot />
                </i>
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-data grid">
          <div>
            <h1 className="footer-title">About</h1>
            <ul className="footer-sub">
              <li>
                <span className="footer-about">Awards</span>
              </li>
              <li>
                <span className="footer-about">FAQs</span>
              </li>
              <li>
                <span className="footer-about">Privacy policy</span>
              </li>
              <li>
                <span className="footer-about">Term of services</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-data grid">
          <div>
            <h1 className="footer-title">Contact</h1>
            <ul className="footer-sub">
              <li>
                <i className="footer-subs">
                  <IoCall />
                </i>
                +84 12 345 6789
              </li>
              <li>
                <i className="footer-subs">
                  <IoCall />
                </i>
                +84 32 444 699
              </li>
              <li>
                <i className="footer-subs">
                  <MdEmail />
                </i>
                bookstore@gmail.com
              </li>
            </ul>
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
