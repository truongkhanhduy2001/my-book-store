"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiMagnifyingGlass, PiHeartStraight, PiHandbag } from "react-icons/pi";
import { FaList, FaBookOpen, FaRegTrashAlt } from "react-icons/fa";
import { VscChromeClose, VscAccount } from "react-icons/vsc";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoIosClose, IoIosLogOut } from "react-icons/io";
import "./navigation.css";
import { usePathname } from "next/navigation";
export default function Navigate() {
  const data: any = [];

  // Login Condition
  const [checkLogin, setCheckLogin] = useState(true);

  useEffect(() => {
    // Cart Dropdown
    const cartDropdown = document.querySelector(".cart-dropdown");
    const bookCart: any = document.querySelector(".book-cart-icon");
    const cartIconClose: any = document.querySelector(".cart-icon-close");
    function handleShowCart(e: any) {
      cartDropdown?.classList.add("active");
      e.stopPropagation();
    }
    function handleHideCart(e: any) {
      cartDropdown?.classList.remove("active");
    }
    checkLogin && bookCart.addEventListener("click", handleShowCart);
    checkLogin && cartIconClose.addEventListener("click", handleHideCart);

    // Scroll
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

  const handleClick = () => {};
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
              <Link href="/" className="nav-link active" onClick={handleClick}>
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
                  <p className="accounts">
                    <i>
                      <VscAccount />
                    </i>
                    My Account
                  </p>
                </Link>
                <Link href="/login" className="user-details">
                  <p className="logouts">
                    <i>
                      <IoIosLogOut />
                    </i>
                    Logout
                  </p>
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
              <Link href="/wishlist">
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
              <i className="book-cart-icon">
                <PiHandbag />
              </i>
              <span className="count-cart">0</span>
              <div
                className="cart-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cart-title">
                  <h2>Your cart</h2>
                  <i className="cart-icon-close">
                    <VscChromeClose />
                  </i>
                </div>
                <div className="cart-list">
                  {data.length <= 0 ? (
                    <div className="no-product"></div>
                  ) : (
                    <>
                      {data.map((item: any, index: any) => {
                        return (
                          <Link key={index} href="#" className="book-widget">
                            <div className="book-img">
                              <Image
                                src="/images/biasach1.png"
                                alt="product"
                                width={100}
                                height={100}
                                priority={true}
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                }}
                              ></Image>
                            </div>
                            <div className="book-content">
                              <h3 className="book-name">{item.title}</h3>
                              <div className="book-price">
                                <h3>$100</h3>
                                <h4>$28.60</h4>
                              </div>
                              <span className="cart-quanity">x1</span>
                              <div className="book-delete">
                                <i>
                                  <FaRegTrashAlt />
                                </i>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="cart-total">
                  <div className="total-title">SubTotal</div>
                  <div className="total-price">$300</div>
                </div>
                <div className="cart-btn">
                  <Link href="/cart" className="view-link">
                    View Cart
                    <i className="view-icon">
                      <PiHandbag />
                    </i>
                  </Link>
                  <Link href="/checkout" className="check-link">
                    Check out
                    <i className="check-icon">
                      <MdOutlineShoppingCartCheckout />
                    </i>
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
