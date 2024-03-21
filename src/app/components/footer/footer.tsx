"use client";
import Link from "next/link";
import Image from "next/legacy/image";
import "./footer.css";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuFacebook, LuTwitter } from "react-icons/lu";
import { CiLinkedin } from "react-icons/ci";
import { PiInstagramLogo } from "react-icons/pi";
import { AiOutlineYoutube } from "react-icons/ai";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="tag">
          <div className="logo-footer">
            <Image
              src="/images/logo.png"
              alt="Logo"
              layout="fill"
              priority={true}
            ></Image>
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
          <a href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            VietNam
          </a>
          <a href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            USA
          </a>
          <a href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            UK
          </a>
          <a href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            China
          </a>
          <a href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            France
          </a>
          <a href="">
            <i className="fa-location">
              <FaLocationDot />
            </i>
            India
          </a>
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
      <div className="icons-social">
        <Link href="" className="fa-facebook">
          <LuFacebook />
        </Link>
        <Link href="" className="fa-twitter">
          <LuTwitter />
        </Link>
        <Link href="" className="fa-linkedin">
          <CiLinkedin />
        </Link>
        <Link href="" className="fa-instagram">
          <PiInstagramLogo />
        </Link>
        <Link href="" className="fa-youtube">
          <AiOutlineYoutube />
        </Link>
      </div>
      <div className="end">
        Design By
        <span>
          <i className="icon-ds"></i>Trương Khánh Duy
        </span>
        | All rights reservel!
      </div>
    </footer>
  );
}
