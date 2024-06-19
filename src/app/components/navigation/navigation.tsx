"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiMagnifyingGlass, PiHeartStraight, PiHandbag } from "react-icons/pi";
import { FaBookOpen, FaRegTrashAlt, FaHome } from "react-icons/fa";
import { VscChromeClose, VscAccount } from "react-icons/vsc";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import "./navigation.css";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navigate() {
  const dat: any = [
    {
      title: "Dune",
      price: "100",
      discount: "40",
    },
  ];
  const router = useRouter();

  // Login Condition
  const [checkLogin, setCheckLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = Cookies.get("TOKEN-USER");
    if (token) {
      setCheckLogin(true);
      fetchUserInfo(token);
    } else {
      setCheckLogin(false);
    }
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch("/api/admin/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      if (data.status === 200) {
        console.log("User info:", data);
        setUserName(data.userName);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

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
    const cartDropdown = document.querySelector(".cart-dropdown");
    const navLinks = document.querySelectorAll(".nav-link");
    // Remove modal
    function handleShowCart() {
      cartDropdown?.classList.remove("active");
    }
    handleShowCart();
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

  const handleLogOut = () => {
    try {
      fetch("/api/users/logout", { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            router.push("/login");
          }
        });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="nav-main h-[60px] w-[100%] bg-[var(--BG)] sticky z-[100] top-0 left-0 right-0">
      <div className="nav-bar relative max-w-[var(--width-home)] w-[100%] h-[100%] bg-[var(--BG)] ml-[auto] mr-[auto] px-[30px] flex items-center justify-between">
        <div className="logo text-[45px] text-[var(--first-color)] mt-[auto] mb-[auto] cursor-pointer">
          <Link href="/" className="logo-link">
            <i>
              <FaBookOpen />
            </i>
          </Link>
        </div>
        <div className="nav-menu">
          <ul className="nav-list flex items-center">
            <li className="nav-item flex px-[10px] py-[7px]">
              <Link
                href="/"
                as="/"
                passHref
                className="nav-link active relative text-[18px] text-[var(--title-color)] px-[10px] hover:text-[var(--first-color)] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms]"
              >
                <i className="fa-home hidden">
                  <FaHome />
                </i>
                <h1>Home</h1>
              </Link>
            </li>
            <li className="nav-item flex px-[10px] py-[7px]">
              <Link
                href="/adventure"
                as="/adventure"
                passHref
                className="nav-link relative text-[18px] text-[var(--title-color)] px-[10px] hover:text-[var(--first-color)] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms]"
              >
                Adventure
              </Link>
            </li>
            <li className="nav-item flex px-[10px] py-[7px]">
              <Link
                href="/comedy"
                as="/comedy"
                passHref
                className="nav-link relative text-[18px] text-[var(--title-color)] px-[10px] hover:text-[var(--first-color)] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms]"
              >
                Comedy
              </Link>
            </li>
            <li className="nav-item flex px-[10px] py-[7px]">
              <Link
                href="/science"
                as="/science"
                passHref
                className="nav-link relative text-[18px] text-[var(--title-color)] px-[10px] hover:text-[var(--first-color)] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms]"
              >
                Science
              </Link>
            </li>
            <li className="nav-item flex px-[10px] py-[7px]">
              <Link
                href="/horror"
                as="/horror"
                passHref
                className="nav-link relative text-[18px] text-[var(--title-color)] px-[10px] hover:text-[var(--first-color)] before:content-[''] before:w-0 before:h-[4px] before:rounded-[4px] before:bg-[var(--first-color)] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:duration-[300ms]"
              >
                Horror
              </Link>
            </li>
          </ul>
        </div>
        {/* Icon */}
        <ul className="icons-list text-[25px] text-[var(--title-color)] grid grid-flow-col auto-cols-auto gap-[15px]">
          {!checkLogin ? (
            <li className="book-accounts flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
              <Link href="/login">
                <i className="hover:text-[var(--first-color)]">
                  <VscAccount />
                </i>
              </Link>
            </li>
          ) : (
            <li className="book-accounts-name group/book-accounts-name flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
              <i className="Vs-acc hidden hover:text-[var(--first-color)]">
                <VscAccount />
              </i>
              <h3 className="text-[16px] text-[var(--text-color)]">
                {userName}
              </h3>
              <div className="book-user-container absolute bg-[var(--BG)] flex flex-col right-0 w-[100%] h-[auto] shadow-[0_6px_12px_var(--text-color)] duration-[300ms] opacity-0 rounded-[5px] invisible origin-top-[90%] scale-0 before:absolute before:z-0 before:content-[''] before:w-[100%] before:h-[40px] before:top-[-30px] before:bg-transparent group-hover/book-accounts-name:duration-[300ms] group-hover/book-accounts-name:scale-100 group-hover/book-accounts-name:opacity-100 group-hover/book-accounts-name:visible">
                <Link
                  href="#"
                  className="user-details text-[14px] text-[var(--text-color)] font-bold leading-[150%]"
                >
                  <p className="accounts flex text-[14px] text-[var(--text-color)] font-normal items-center px-[16px] py-[8px] leading-[150%] opacity-[1] transition-opacity duration-[100ms] ease cursor-pointer hover:font-medium hover:text-[var(--first-color)] hover:opacity-[0.7]">
                    <i className="mr-[10px]">
                      <VscAccount />
                    </i>
                    My Account
                  </p>
                </Link>
                <div
                  className="user-details text-[14px] text-[var(--text-color)] font-bold leading-[150%]"
                  onClick={handleLogOut}
                >
                  <p className="logouts flex text-[14px] text-[var(--text-color)] font-normal items-center px-[16px] py-[8px] leading-[150%] opacity-[1] cursor-pointer hover:font-medium hover:text-[red] hover:opacity-[0.7]">
                    <i className="mr-[10px]">
                      <IoIosLogOut />
                    </i>
                    Logout
                  </p>
                </div>
              </div>
            </li>
          )}
          {/* Search */}
          <li className="book-search group/book-search flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
            <i className="search hover:text-[var(--first-color)]">
              <PiMagnifyingGlass />
            </i>
            <div className="search-container absolute bg-[var(--card-color)] flex flex-col right-0 min-w-[400px] shadow-[0_6px_12px_var(--text-color)] duration-[300ms] opacity-0 rounded-[5px] invisible origin-top-[90%] z-[10] scale-0 before:absolute before:z-0 before:content-[''] before:w-[100%] before:h-[40px] before:top-[-30px] before:bg-transparent group-hover/book-search:duration-[300ms] group-hover/book-search:scale-100 group-hover/book-search:opacity-100 group-hover/book-search:visible">
              <form action="#" className="search-form">
                <input
                  className="min-w-[400px] py-[10px] pl-[36px] pr-[10px] rounded-[5px] bg-[var(--card-color)] text-[18px] text-[var(--text-color)] outline-none border-[1px] border-solid border-[var(--border-color)]"
                  type="search"
                  placeholder="Search"
                />
              </form>
            </div>
          </li>
          {/* Heart */}
          {!checkLogin ? (
            <li className="book-heart flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
              <Link href="/login">
                <i className="hover:text-[var(--first-color)]">
                  <PiHeartStraight />
                </i>
              </Link>
              <span className="count-wish absolute bottom-[20px] left-[25px] bg-[var(--first-color)] text-[var(--white-color)] h-[18px] w-[18px] leading-[18px] rounded-[50%] text-center text-[10px]">
                0
              </span>
            </li>
          ) : (
            <li className="book-heart flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
              <Link href="/wishlist">
                <i className="hover:text-[var(--first-color)]">
                  <PiHeartStraight />
                </i>
              </Link>
              <span className="count-wish absolute bottom-[20px] left-[25px] bg-[var(--first-color)] text-[var(--white-color)] h-[18px] w-[18px] leading-[18px] rounded-[50%] text-center text-[10px]">
                0
              </span>
            </li>
          )}
          {/* Cart */}
          {!checkLogin ? (
            <li className="book-cart flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
              <Link href="/login">
                <i className="hover:text-[var(--first-color)]">
                  <PiHandbag />
                </i>
                <span className="count-cart absolute bottom-[20px] left-[25px] bg-[var(--first-color)] text-[var(--white-color)] h-[18px] w-[18px] leading-[18px] rounded-[50%] text-center text-[10px]">
                  0
                </span>
              </Link>
            </li>
          ) : (
            <li className="book-cart flex items-center justify-center px-[10px] py-[7px] cursor-pointer relative rounded-[8px]">
              <Link className="link-cart" href="/checkout">
                <i className="book-cart-icon-mb hidden hover:text-[var(--first-color)]">
                  <PiHandbag />
                </i>
              </Link>
              <i className="book-cart-icon block hover:text-[var(--first-color)]">
                <PiHandbag />
              </i>
              <span className="count-cart absolute bottom-[20px] left-[25px] bg-[var(--first-color)] text-[var(--white-color)] h-[18px] w-[18px] leading-[18px] rounded-[50%] text-center text-[10px]">
                0
              </span>
              <div
                className="cart-dropdown absolute bg-[var(--BG)] right-0 w-[400px] h-[auto] shadow-[0_6px_12px_var(--text-color)] rounded-[5px] hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cart-title text-[16px] text-[var(--title-color)] px-[12px] mt-[16px] flex justify-between font-bold">
                  <h2>Your cart</h2>
                  <i className="cart-icon-close">
                    <VscChromeClose />
                  </i>
                </div>
                <div className="cart-list mb-[15px] max-h-[249px] px-[12px] overflow-y-auto">
                  {dat.length > 0 ? (
                    <>
                      {dat.map((item: any, index: any) => {
                        return (
                          <Link
                            key={index}
                            href="/productDetail"
                            className="book-widget mt-[10px] mb-[10px] flex hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]"
                          >
                            <div className="book-img !relative">
                              <Image
                                className="max-w-[100px] w-[100%] h-[auto] !relative"
                                src="/images/biasach1.png"
                                alt="product"
                                fill
                                priority={true}
                                sizes="(max-with: 768px)100vw"
                              />
                            </div>
                            <div className="book-content ml-[30px] flex-[0_1_100%]">
                              <h3 className="book-name text-[16px] uppercase text-[var(--title-color)] font-bold">
                                {item.title}
                              </h3>
                              <div className="book-price flex">
                                {item.discount > "0" && (
                                  <h4
                                    className="text-[16px] text-[var(--title-color)] font-normal"
                                    style={{
                                      textDecoration: "none",
                                      color: "hsl(230, 70%, 16%)",
                                      fontWeight: "bold",
                                      marginRight: "8px",
                                    }}
                                  >
                                    ${item.discount}
                                  </h4>
                                )}
                                <h3
                                  className="text-[var(--title-color)] text-[16px] font-bold"
                                  style={
                                    item.discount > "0"
                                      ? {
                                          textDecoration: "line-through",
                                          color: "hsl(230, 16%, 45%)",
                                          fontWeight: "400",
                                        }
                                      : { textDecoration: "none" }
                                  }
                                >
                                  ${item.price}
                                </h3>
                              </div>
                              <span className="cart-quanity text-[16px] text-[var(--text-color)]">
                                x1
                              </span>
                              <div className="book-delete flex justify-end text-[red] text-[15px]">
                                <i>
                                  <FaRegTrashAlt />
                                </i>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    <div className="wrapper text-[var(--title-color)] text-[15px]">
                      <div className="wrap-container w-[100%]">
                        <div className="content text-center px-[30px] pt-[40px] pb-[40px]">
                          <p className="title text-[18px] font-bold text-[var(--first-color)]">
                            Uh, oh!
                          </p>
                          <TiShoppingCart className="text-[80px] text-[var(--first-color)] text-center justify-center w-[100%]" />
                          <p className="info text-[15px] font-normal text-[var(--text-color)] opacity-[0.7]">
                            Your cart is empty!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="cart-total mb-[15px] border-top-[1px] border-solid border-[var(--text-color)] px-[12px] pt-[15px] border-t-[1px]">
                  <div className="total-title flex justify-end text-[var(--title-color)] text-[18px] font-bold uppercase">
                    SubTotal
                  </div>
                  <div className="total-price flex justify-end text-[var(--title-color)] text-[18px] font-bold uppercase">
                    $300
                  </div>
                </div>
                <div className="cart-btn flex justify-between text-[18px] px-[12px] mb-[16px]">
                  <Link
                    href="/cart"
                    className="view-link flex flex-1 justify-center px-[20px] py-[10px] border-[1px] border-solid border-[var(--first-color)] rounded-[5px] text-[var(--first-color)] hover:text-[var(--white-color)] hover:bg-[var(--first-color)] first:mr-[10px]"
                  >
                    View Cart
                    <i className="view-icon px-[10px] py-[4px]">
                      <PiHandbag />
                    </i>
                  </Link>
                  <Link
                    href="/checkout"
                    className="check-link flex flex-1 justify-center px-[20px] py-[10px] border-[1px] border-solid border-[var(--first-color)] rounded-[5px] text-[var(--white-color)] bg-[var(--first-color)] hover:text-[var(--first-color)] hover:bg-[var(--BG)]"
                  >
                    Check out
                    <i className="check-icon px-[10px] py-[4px]">
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
