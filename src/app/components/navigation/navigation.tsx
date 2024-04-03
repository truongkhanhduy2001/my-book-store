"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PiMagnifyingGlass, PiHeartStraight, PiHandbag } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import "./navigation.css";

export default function Navigate() {
  // First space
  const [check, setCheck] = useState(false);
  // Box shadow navbar
  useEffect(() => {
    const handleScroll = () => {
      const navigation = document.querySelector(".header") as HTMLElement;
      if (navigation) {
        if (window.scrollY > 5) {
          navigation.style.boxShadow = "0 2px 4px rgba(0, 122, 255, 0.5)";
        } else {
          navigation.style.boxShadow = "none";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Active Page
  useEffect(() => {
    const windowPathname = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");
    // Loại bỏ lớp 'active' từ tất cả các phần tử .nav-link
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    // Chọn phần tử hiện tại và thêm lớp 'active'
    const currentNavLink = document.querySelector(
      `.nav-link[href='${windowPathname}']`
    );
    if (currentNavLink) {
      currentNavLink.classList.add("active");
    }
    return () => {
      // Loại bỏ lớp 'active' từ phần tử hiện tại (nếu có)
      if (currentNavLink) {
        currentNavLink.classList.remove("active");
      }
    };
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <i>
            <FaBookOpen />
          </i>
        </div>
        <div className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                <span>Home</span>
              </Link>
            </li>
          </ul>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/pages/books/comedy/" className="nav-link">
                <span>Comedy</span>
              </Link>
            </li>
          </ul>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/pages/books/horror/" className="nav-link">
                <span>Horror</span>
              </Link>
            </li>
          </ul>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/pages/books/comic/" className="nav-link">
                <span>Comic</span>
              </Link>
            </li>
          </ul>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/pages/books/novel/" className="nav-link">
                <span>Novel</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Icon */}
        <ul className="icons-list">
          {!check ? (
            <li className="book-accounts">
              <Link href="/pages/accounts/login">
                <i>
                  <VscAccount />
                </i>
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

          <li className="book-search">
            <i>
              <PiMagnifyingGlass />
            </i>
            <div className="search-container">
              <form action="#" className="search-form">
                <input type="search" placeholder="Search" />
              </form>
            </div>
          </li>

          <li className="book-heart">
            <i>
              <PiHeartStraight />
            </i>
          </li>

          <li className="book-cart">
            <Link href="#">
              <i>
                <PiHandbag />
              </i>
              <span className="count-cart">1</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
