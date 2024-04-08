"use client";
import Link from "next/link";
import Image from "next/image";
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
  FaArrowRight,
  FaCcVisa,
  FaCcAmex,
  FaCcMastercard,
  FaCreditCard,
  FaCcPaypal,
  FaCcDiscover,
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
    <section className="footer">
      <div className="box-container">
        <div className="box">
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

        <div className="box">
          <h1 className="box-tilte">Our Locations</h1>
          <Link href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            Viet Nam
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

        <div className="box">
          <h1 className="box-tilte">Company</h1>
          <Link href="">
            <i className="fa-arrow">
              <FaArrowRight />
            </i>
            About Us
          </Link>
          <Link href="">
            <i className="fa-arrow">
              <FaArrowRight />
            </i>
            Our Services
          </Link>
          <Link href="">
            <i className="fa-arrow">
              <FaArrowRight />
            </i>
            Privacy Policy
          </Link>
          <Link href="">
            <i className="fa-arrow">
              <FaArrowRight />
            </i>
            Affiliate Program
          </Link>
        </div>

        <div className="box">
          <h1 className="box-tilte">Contact Info</h1>
          <Link href="#">
            <i className="fa-phone">
              <IoCall />
            </i>
            +84 12 345 6789
          </Link>
          <Link href="#">
            <i className="fa-phone">
              <IoCall />
            </i>
            +84 32 444 699
          </Link>
          <Link href="#">
            <i className="fa-envelope">
              <MdEmail />
            </i>
            bookstore@gmail.com
          </Link>
          <Image
            src="/images/worldmap.png"
            alt="map"
            priority={true}
            width={100}
            height={100}
            className="map"
          ></Image>
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
        <ul className="footer-payments">
          <li className="payments">
            <Link href="#" className="link-payments">
              <i className="visa" aria-hidden="true">
                <FaCcVisa />
              </i>
            </Link>
          </li>
          <li className="payments">
            <Link href="#" className="link-payments">
              <i className="credit-card" aria-hidden="true">
                <FaCreditCard />
              </i>
            </Link>
          </li>
          <li className="payments">
            <Link href="#" className="link-payments">
              <i className="paypal" aria-hidden="true">
                <FaCcPaypal />
              </i>
            </Link>
          </li>
          <li className="payments">
            <Link href="#" className="link-payments">
              <i className="mastercard" aria-hidden="true">
                <FaCcMastercard />
              </i>
            </Link>
          </li>
          <li className="payments">
            <Link href="#" className="link-payments">
              <i className="discover" aria-hidden="true">
                <FaCcDiscover />
              </i>
            </Link>
          </li>
          <li className="payments">
            <Link href="#" className="link-payments">
              <i className="amex" aria-hidden="true">
                <FaCcAmex />
              </i>
            </Link>
          </li>
        </ul>
        Design By
        <span>
          <i className="icon-ds"></i>Trương Khánh Duy, Nguyễn Văn Điểm
        </span>
        | All rights reservel!
      </div>
      {/* Scroll up */}
      <div onClick={scrollToTop} className="scroll-up">
        <span>
          <FaArrowUp />
        </span>
      </div>
    </section>
  );
}
