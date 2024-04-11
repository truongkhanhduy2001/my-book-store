"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PiMagnifyingGlass, PiHeartStraight, PiHandbag } from "react-icons/pi";
import { FaList, FaBookOpen } from "react-icons/fa";
import { VscChromeClose, VscAccount } from "react-icons/vsc";
import { IoIosClose } from "react-icons/io";
import "./navigation.css";
import { usePathname } from "next/navigation";
export default function Navigate() {
  // Login Condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Box shadow navbar
  useEffect(() => {
    const handleScroll = () => {
      const navigation = document.querySelector("nav") as HTMLElement;
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
  const pathname = usePathname();
  const url: any = ["/", "/horror", "/comedy", "/science", "/adventure"];

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    // Loại bỏ lớp 'active' từ tất cả các phần tử .nav-link
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    // Chọn phần tử hiện tại và thêm lớp 'active'
    const currentNavLink: any = document.querySelector(
      `.nav-link[href='${pathname}']`
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
  }, [pathname]);

  return (
    <nav className="nav-main">
      <div className="nav-bar">
        <i className="open-menu">
          <FaList />
        </i>
        <div className="logo">
          <Link href="/" className="logo-link">
            <i>
              <FaBookOpen />
            </i>
          </Link>
        </div>
        <div className="nav-menu">
          <div className="logo-toggle">
            <div className="logo">
              <Link href="/" className="logo-link">
                <i>
                  <FaBookOpen />
                </i>
              </Link>
            </div>
            <i className="close">
              <IoIosClose />
            </i>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/adventure" className="nav-link">
                Adventure
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/comedy" className="nav-link">
                Comedy
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/science" className="nav-link">
                Science
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/horror" className="nav-link">
                Horror
              </Link>
            </li>
          </ul>
        </div>
        {/* Icon */}
        <ul className="icons-list">
          {!checkLogin ? (
            <li className="book-accounts">
              <Link href="/login">
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
                <Link href="/login" className="user-details">
                  <p>Logout</p>
                </Link>
              </div>
            </li>
          )}
          {/* Search */}
          <li className="book-search">
            <i className="search">
              <PiMagnifyingGlass />
            </i>
            <div className="search-container">
              <form action="#" className="search-form">
                <input type="search" placeholder="Search" />
              </form>
            </div>
          </li>
          {/* Heart */}
          {!checkLogin ? (
            <li className="book-heart">
              <Link href="/login">
                <i>
                  <PiHeartStraight />
                </i>
              </Link>
              <span className="count-wish">0</span>
            </li>
          ) : (
            <li className="book-heart">
              <Link href="/wish">
                <i>
                  <PiHeartStraight />
                </i>
              </Link>
              <span className="count-wish">0</span>
            </li>
          )}
          {/* Cart */}
          {!checkLogin ? (
            <li className="book-cart">
              <Link href="/login">
                <i>
                  <PiHandbag />
                </i>
                <span className="count-cart">0</span>
              </Link>
            </li>
          ) : (
            <li className="book-cart">
              <Link href="/cart">
                <i>
                  <PiHandbag />
                </i>
                <span className="count-cart">0</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
