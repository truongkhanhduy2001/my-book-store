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
    const checkScroll = () => {
      const scroll = window.scrollY;
      if (scroll < 350) {
        scrollUp.style.display = "none";
      } else {
        scrollUp.style.display = "block";
      }
    };
    const scrollUp: any = document.querySelector(".scroll-up");
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1000,
      smooth: "esaeInOutQuint",
    });
  };

  return (
    <section className="footer flex w-[100%] flex-col mt-[var(--margin-top)]">
      <div className="box-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
        <div className="box ml-[25px] mr-[25px] flex-[1_1_20%]">
          <div className="logo-footer cursor-pointer text-[45px] text-[var(--first-color)] mb-[10px]">
            <i>
              <FaBookOpen />
            </i>
          </div>
          <p className="text-[14px] text-[var(--text-color)] leading-normal">
            Visit our website to explore and choose the right books for you.
            From novels to textbooks, we have it all!<br></br> Please accompany
            Book Store on the journey to discover knowledge and creativity!
            <br></br> Order your book today!
          </p>
        </div>

        <div className="box ml-[25px] mr-[25px] flex-[1_1_20%]">
          <h1 className="box-tilte text-[18px] mb-[10px] text-[var(--title-color)] font-bold relative before:content-[''] before:absolute before:left-0 before:bottom-[-5px] before:bg-[var(--first-color)] before:h-[2px] before:w-[50px]">
            Our Locations
          </h1>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-location text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaLocationDot />
            </i>
            Viet Nam
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-location text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaLocationDot />
            </i>
            USA
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-location text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaLocationDot />
            </i>
            UK
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-location text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaLocationDot />
            </i>
            China
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-location text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaLocationDot />
            </i>
            France
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-location text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaLocationDot />
            </i>
            India
          </Link>
        </div>

        <div className="box ml-[25px] mr-[25px] flex-[1_1_20%]">
          <h1 className="box-tilte text-[18px] mb-[10px] text-[var(--title-color)] font-bold relative before:content-[''] before:absolute before:left-0 before:bottom-[-5px] before:bg-[var(--first-color)] before:h-[2px] before:w-[50px]">
            Company
          </h1>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-arrow text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaArrowRight />
            </i>
            About Us
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-arrow text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaArrowRight />
            </i>
            Our Services
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-arrow text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaArrowRight />
            </i>
            Privacy Policy
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="">
            <i className="fa-arrow text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <FaArrowRight />
            </i>
            Affiliate Program
          </Link>
        </div>

        <div className="box ml-[25px] mr-[25px] flex-[1_1_20%]">
          <h1 className="box-tilte text-[18px] mb-[10px] text-[var(--title-color)] font-bold relative before:content-[''] before:absolute before:left-0 before:bottom-[-5px] before:bg-[var(--first-color)] before:h-[2px] before:w-[50px]">
            Contact Info
          </h1>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="#">
            <i className="fa-phone text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <IoCall />
            </i>
            +84 12 345 6789
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="#">
            <i className="fa-phone text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <IoCall />
            </i>
            +84 32 444 699
          </Link>
          <Link className="flex mb-[5px] text-[var(--text-color)]" href="#">
            <i className="fa-envelope text-[var(--first-color)] pr-[0.5rem] mt-[5px]">
              <MdEmail />
            </i>
            bookstore@gmail.com
          </Link>
          <Image
            className="map w-[200px]"
            src="/images/worldmap.png"
            alt="map"
            priority={true}
            width={100}
            height={100}
          ></Image>
        </div>
      </div>

      {/* Icon social */}
      <div className="wrapper-container mt-[var(--margin-top)] grid w-[100%] h-[100%] place-items-center">
        <div className="wrapper inline-flex">
          <div className="icon facebook flex items-center justify-center flex-col relative z-[2] ml-[10px] mr-[10px] cursor-pointer transition duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <div className="tooltip absolute top-0 bg-[var(--white-color)] text-[var(--white-color)] text-[18px] px-[10px] py-[6px] rounded-[25px] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)] opacity-0 pointer-events-none before:absolute before:content-[''] before:h-[15px] before:w-[15px] before:bg-[var(--white-color)] before:bottom-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-[45deg] before:transition before:duration-[400ms] before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              Facebook
            </div>
            <span className="w-[3rem] h-[3rem] block text-center bg-[var(--white-color)] rounded-[50%] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)]">
              <i className="flex justify-center pt-[12px] text-[var(--title-color)] text-[25px] leading-[60px]">
                <FaFacebookF />
              </i>
            </span>
          </div>
          <div className="icon twitter flex items-center justify-center flex-col relative z-[2] ml-[10px] mr-[10px] cursor-pointer transition duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <div className="tooltip absolute top-0 bg-[var(--white-color)] text-[var(--white-color)] text-[18px] px-[10px] py-[6px] rounded-[25px] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)] opacity-0 pointer-events-none before:absolute before:content-[''] before:h-[15px] before:w-[15px] before:bg-[var(--white-color)] before:bottom-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-[45deg] before:transition before:duration-[400ms] before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              Twitter
            </div>
            <span className="w-[3rem] h-[3rem] block text-center bg-[var(--white-color)] rounded-[50%] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)]">
              <i className="flex justify-center pt-[12px] text-[var(--title-color)] text-[25px] leading-[60px]">
                <FaTwitter />
              </i>
            </span>
          </div>
          <div className="icon github flex items-center justify-center flex-col relative z-[2] ml-[10px] mr-[10px] cursor-pointer transition duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <div className="tooltip absolute top-0 bg-[var(--white-color)] text-[var(--white-color)] text-[18px] px-[10px] py-[6px] rounded-[25px] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)] opacity-0 pointer-events-none before:absolute before:content-[''] before:h-[15px] before:w-[15px] before:bg-[var(--white-color)] before:bottom-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-[45deg] before:transition before:duration-[400ms] before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              GitHub
            </div>
            <span className="w-[3rem] h-[3rem] block text-center bg-[var(--white-color)] rounded-[50%] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)]">
              <i className="flex justify-center pt-[12px] text-[var(--title-color)] text-[25px] leading-[60px]">
                <FaGithub />
              </i>
            </span>
          </div>
          <div className="icon youtube flex items-center justify-center flex-col relative z-[2] ml-[10px] mr-[10px] cursor-pointer transition duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <div className="tooltip absolute top-0 bg-[var(--white-color)] text-[var(--white-color)] text-[18px] px-[10px] py-[6px] rounded-[25px] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)] opacity-0 pointer-events-none before:absolute before:content-[''] before:h-[15px] before:w-[15px] before:bg-[var(--white-color)] before:bottom-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-[45deg] before:transition before:duration-[400ms] before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              Youtube
            </div>
            <span className="w-[3rem] h-[3rem] block text-center bg-[var(--white-color)] rounded-[50%] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)]">
              <i className="flex justify-center pt-[12px] text-[var(--title-color)] text-[25px] leading-[60px]">
                <FaYoutube />
              </i>
            </span>
          </div>
          <div className="icon instagram flex items-center justify-center flex-col relative z-[2] ml-[10px] mr-[10px] cursor-pointer transition duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
            <div className="tooltip absolute top-0 bg-[var(--white-color)] text-[var(--white-color)] text-[18px] px-[10px] py-[6px] rounded-[25px] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)] opacity-0 pointer-events-none before:absolute before:content-[''] before:h-[15px] before:w-[15px] before:bg-[var(--white-color)] before:bottom-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-[45deg] before:transition before:duration-[400ms] before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              Instagram
            </div>
            <span className="w-[3rem] h-[3rem] block text-center bg-[var(--white-color)] rounded-[50%] shadow-[0_10px_10px_rgba(0, 0, 0, 0.1)]">
              <i className="flex justify-center pt-[12px] text-[var(--title-color)] text-[25px] leading-[60px]">
                <FaInstagram />
              </i>
            </span>
          </div>
        </div>
      </div>
      {/* End icon social */}
      <div className="end max-w-[var(--width-home)] m-[auto] mt-[40px] text-[14px] text-[var(--title-color)] justify-around">
        <ul className="footer-payments flex w-[100%] m-[auto] justify-center mb-[40px]">
          <li className="payments mr-[5px]">
            <Link
              href="#"
              className="link-payments text-[var(--text-color)] block text-[36px]"
            >
              <i className="visa" aria-hidden="true">
                <FaCcVisa />
              </i>
            </Link>
          </li>
          <li className="payments mr-[5px]">
            <Link
              href="#"
              className="link-payments text-[var(--text-color)] block text-[36px]"
            >
              <i className="credit-card" aria-hidden="true">
                <FaCreditCard />
              </i>
            </Link>
          </li>
          <li className="payments mr-[5px]">
            <Link
              href="#"
              className="link-payments text-[var(--text-color)] block text-[36px]"
            >
              <i className="paypal" aria-hidden="true">
                <FaCcPaypal />
              </i>
            </Link>
          </li>
          <li className="payments mr-[5px]">
            <Link
              href="#"
              className="link-payments text-[var(--text-color)] block text-[36px]"
            >
              <i className="mastercard" aria-hidden="true">
                <FaCcMastercard />
              </i>
            </Link>
          </li>
          <li className="payments mr-[5px]">
            <Link
              href="#"
              className="link-payments text-[var(--text-color)] block text-[36px]"
            >
              <i className="discover" aria-hidden="true">
                <FaCcDiscover />
              </i>
            </Link>
          </li>
          <li className="payments mr-[5px]">
            <Link
              href="#"
              className="link-payments text-[var(--text-color)] block text-[36px]"
            >
              <i className="amex" aria-hidden="true">
                <FaCcAmex />
              </i>
            </Link>
          </li>
        </ul>
        Design By
        <span className="ml-[10px] text-[var(--first-color)] font-bold mr-[10px] border-t-[1px] border-solid border-[var(--first-color)]">
          <i className="icon-ds"></i>Duy, Điểm
        </span>
        | All rights reservel!
      </div>
      {/* Scroll up */}
      <div
        onClick={scrollToTop}
        className="scroll-up fixed bottom-[70px] right-[20px] bg-[var(--first-color)] text-[var(--white-color)] inline-flex p-[10px] shadow-[0_0_10px_rgba(0, 0, 0, 0.1)] cursor-pointer rounded-[5px] hover:translate-y-[-10px]"
      >
        <span>
          <FaArrowUp />
        </span>
      </div>
    </section>
  );
}
