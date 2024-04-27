"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import React, { useState } from "react";
import "./productDetail.css";
export default function Detail() {
  const [value, setValue] = useState("1");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  // Icon heart
  const handleHeart = (e: any) => {
    e.target.closest(".HeartIcon").classList.toggle("active");
    e.preventDefault();
  };

  return (
    <>
      {/* Detail */}
      <section className="section-detail">
        <div className="section-detail-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/productDeatil">Book detail</Link>
            </li>
          </ul>
        </div>
        <div className="detail-container">
          <div className="detail">
            {/* Left */}
            <div className="product-imgs">
              <div className="img-display">
                <Image
                  src="/images/biasach1.png"
                  alt="Main Image"
                  width={100}
                  height={100}
                  priority={true}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            {/* Right */}
            <div className="product-content">
              <div className="product-title">
                <h2>Dune</h2>
                <i>
                  <FiHeart className="HeartIcon" onClick={handleHeart} />
                </i>
              </div>
              <div className="product-rating">
                <i className="star">
                  <FaStar />
                </i>
                <i className="star">
                  <FaStar />
                </i>
                <i className="star">
                  <FaStar />
                </i>
                <i className="star">
                  <FaStar />
                </i>
                <i className="haft-star">
                  <FaStarHalfAlt />
                </i>
                <span>4.7</span>
              </div>
              <div className="product-price">
                <h3>$20</h3>
                <h4>$100</h4>
              </div>
              <div className="product-detail">
                <h2>Description about content:</h2>
                <p>
                  Explore a mesmerizing and complex science fiction universe
                  with Dune - one of Frank Herbert greatest masterpieces. From
                  the award-winning author of Hugo and Nebula, this book takes
                  you on an adventure through space, with a rich plot and
                  multi-dimensional characters. Full Description: Dune is one of
                  the seminal works of science fiction literature, immersing
                  readers in a journey through a detailed and intricate
                  fictional world. Set in a unique future setting, the book
                  explores the planet Arrakis - a place where a rare and
                  valuable resource known as Spice is found. Spice is not only a
                  crucial source of income but also a determining factor in the
                  struggle for power. In the narrative, you follow Paul
                  Atreides, a young scion of a noble house, as he faces
                  challenges and dangers on the golden desert planet of Arrakis.
                  Paul rise from a talented young man to a skilled leader is the
                  highlight of the story, while the resistance against the rule
                  of the Harkonnen and Corrino houses creates dramatic and
                  compelling situations. Dune is not just a standout adventure
                  story but also a profound work of art with themes of power,
                  religion, and destiny. With captivating language and dramatic
                  plots, this book is sure to leave a strong impression on any
                  science fiction enthusiast.
                </p>
                <ul>
                  <li>
                    <i>
                      <FaCheckCircle />
                    </i>
                    Writer:<span>John Deo</span>
                  </li>
                  <li>
                    <i>
                      <FaCheckCircle />
                    </i>
                    Categories:<span>Romance, Thriller</span>
                  </li>
                </ul>
              </div>
              <div className="purchase-info">
                <input
                  type="number"
                  min="1"
                  value={value}
                  onChange={handleChange}
                />
                <div className="purchase-btn">
                  <i>
                    <FaShoppingCart />
                  </i>
                  <p className="add-cart"> Add cart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-view-info">
          <div className="product-view-content-title">Information</div>
          <div className="product-view-tab-content-ad">
            <div className="product-view-tab-content-additional">
              <table className="data-table table-additional">
                <colgroup>
                  <col width="25%"></col>
                  <col></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th className="table-label">Writer</th>
                    <td className="data-writer">John</td>
                  </tr>
                  <tr>
                    <th className="table-label">Categories</th>
                    <td className="data-categories">Thriller, Comedy</td>
                  </tr>
                  <tr>
                    <th className="table-label">Năm XB</th>
                    <td className="data-year">2023</td>
                  </tr>
                  <tr>
                    <th className="table-label">Languages</th>
                    <td className="data-language">English</td>
                  </tr>
                  <tr>
                    <th className="table-label">Weight(gr)</th>
                    <td className="data-weight">330</td>
                  </tr>
                  <tr>
                    <th className="table-label">Kích thước bao bìa</th>
                    <td className="data-size">24 x 15.5 x 1.5 cm</td>
                  </tr>
                  <tr>
                    <th className="table-label">Số trang</th>
                    <td className="data-page">316</td>
                  </tr>
                  <tr>
                    <th className="table-label">Hình thức</th>
                    <td className="data-book-layout">Bìa mềm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="product-view-description">
              <h1>Description</h1>
              <p>
                Explore a mesmerizing and complex science fiction universe with
                Dune - one of Frank Herbert greatest masterpieces. From the
                award-winning author of Hugo and Nebula, this book takes you on
                an adventure through space, with a rich plot and
                multi-dimensional characters. Full Description: Dune is one of
                the seminal works of science fiction literature, immersing
                readers in a journey through a detailed and intricate fictional
                world. Set in a unique future setting, the book explores the
                planet Arrakis - a place where a rare and valuable resource
                known as Spice is found. Spice is not only a crucial source of
                income but also a determining factor in the struggle for power.
                In the narrative, you follow Paul Atreides, a young scion of a
                noble house, as he faces challenges and dangers on the golden
                desert planet of Arrakis. Paul rise from a talented young man to
                a skilled leader is the highlight of the story, while the
                resistance against the rule of the Harkonnen and Corrino houses
                creates dramatic and compelling situations. Dune is not just a
                standout adventure story but also a profound work of art with
                themes of power, religion, and destiny. With captivating
                language and dramatic plots, this book is sure to leave a strong
                impression on any science fiction enthusiast.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Detail */}
    </>
  );
}
