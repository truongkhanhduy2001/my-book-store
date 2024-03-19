"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiMagnifyingGlass, PiHeartStraight, PiHandbag } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import "./navigation.css";

export default function Navigate() {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const navigation = document.querySelector(".header");

    window.addEventListener("scroll", () => {
      if (navigation.offsetTop > 5) {
        navigation.style.boxShadow = "0 2px 4px #089da1";
      } else {
        navigation.style.boxShadow = "unset";
      }
    });
  }, []);

  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              layout="fill"
              priority={true}
            ></Image>
          </Link>
        </div>
        <div className="search">
          <label className="fa-search">
            <PiMagnifyingGlass />
          </label>
          <input type="search" placeholder="Search" />
        </div>
        <ul>
          {!check ? (
            <li className="book-accounts">
              <Link href="/pages/accounts/login">
                <VscAccount />
              </Link>
            </li>
          ) : (
            <li className="book-accounts-name">
              <h3>Trương Khánh Duy</h3>
              <div className="book-user-container">
                <Link href="#" className="user-details">
                  <p>Account Details</p>
                </Link>
                <Link href="#" className="user-details">
                  <p>Logout</p>
                </Link>
              </div>
            </li>
          )}
          <li className="book-heart">
            <PiHeartStraight />
          </li>
          <li className="book-cart">
            <PiHandbag />
            <div className="book-cart-container">
              <div className="book-cart-title">
                <h2>Add Book</h2>
                <h3>Add cart</h3>
              </div>
              <div className="btn-cart">
                <Link href="#">
                  <p>Check out</p>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
