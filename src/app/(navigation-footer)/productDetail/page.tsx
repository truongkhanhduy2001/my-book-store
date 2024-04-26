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
              <h2 className="product-title">Dune</h2>
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
                <div className="wishlist-btn">
                  <i>
                    <FiHeart />
                  </i>
                  <p className="add-wish"> Add wishlist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Detail */}
    </>
  );
}
