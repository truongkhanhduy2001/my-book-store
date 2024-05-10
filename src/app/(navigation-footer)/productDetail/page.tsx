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
      <section className="section-detail flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-detail-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
          <ul className="page-link inline-block">
            <li className="inline-block text-[12px] font-medium uppercase">
              <Link
                className="text-[var(--title-color)] hover:text-[var(--first-color)]"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="inline-block text-[12px] font-medium uppercase">
              <Link
                className="text-[var(--title-color)] hover:text-[var(--first-color)]"
                href="/productDeatil"
              >
                Book detail
              </Link>
            </li>
          </ul>
        </div>
        <div className="detail-container flex justify-center mt-[var(--margin-top-font)]">
          <div className="detail flex max-w-[var(--width-home)] w-[100%] mt-[20px]">
            {/* Left */}
            <div className="product-imgs w-[50%] flex justify-center">
              <div className="img-display !relative w-[250px] h-[380px] cursor-pointer shadow-[0_0_8px_var(--title-color)]">
                <Image
                  className="!relative duration-[300ms]"
                  src="/images/biasach1.png"
                  alt="Main Image"
                  fill
                  priority={true}
                  sizes="(max-width:768px)100vw"
                />
              </div>
            </div>
            {/* Right */}
            <div className="product-content w-[50%]">
              <div className="product-title flex justify-between">
                <h2 className="text-[30px] text-[var(--title-color)] relative capitalize font-bold py-[10px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-[50px] after:bg-[var(--first-color)]">
                  Dune
                </h2>
                <i className="flex text-[var(--first-color)] text-[20px] p-[8px] border-[1px] border-solid border-[var(--first-color)] h-[38px] rounded-[10px] mt-[15px] cursor-pointer">
                  <FiHeart className="HeartIcon" onClick={handleHeart} />
                </i>
              </div>
              <div className="product-rating flex items-center text-[var(--first-color)] mb-[10px]">
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
                <span className="font-semibold ml-[5px] mr-[5px] mt-[4px]">
                  4.7
                </span>
              </div>
              <div className="product-price flex">
                <h3 className="text-[var(--title-color)] text-[25px] font-bold">
                  $20
                </h3>
                <h4 className="text-[25px] text-[var(--text-color)] font-normal ml-[6px] line-through">
                  $100
                </h4>
              </div>
              <div className="product-detail">
                <h2 className="text-[25px] text-[var(--title-color)] font-bold mb-[10px]">
                  Description about content:
                </h2>
                <p className="text-[15px] text-[var(--title-color)] mb-[10px] overflow-hidden">
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
                <ul className="text-[15px] text-[var(--title-color)] font-medium mb-[10px]">
                  <li className="flex items-center mt-[10px] mb-[10px]">
                    <i className="text-[var(--first-color)]">
                      <FaCheckCircle />
                    </i>
                    Writer:
                    <span className="font-normal ml-[10px]">John Deo</span>
                  </li>
                  <li className="flex items-center mt-[10px] mb-[10px]">
                    <i className="text-[var(--first-color)]">
                      <FaCheckCircle />
                    </i>
                    Categories:
                    <span className="font-normal ml-[10px]">
                      Romance, Thriller
                    </span>
                  </li>
                </ul>
              </div>
              <div className="purchase-info mt-[10px] flex">
                <input
                  className="text-[12px] text-[var(--title-color)] text-center p-[5px] mr-[10px] border-[1px] border-solid border-[var(--title-color)] rounded-[20px] w-[60px]"
                  type="number"
                  min="1"
                  value={value}
                  onChange={handleChange}
                />
                <div className="purchase-btn text-[12px] inline-block text-center font-bold p-[5px] mr-[10px] border-[3px] border-solid border-[var(--first-color)] rounded-[20px] relative text-[var(--first-color)] z-[1] transition duration-[300ms] tracking-[2px] hover:cursor-pointer hover:bg-[var(--first-color)]">
                  <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms]">
                    <FaShoppingCart />
                  </i>
                  <p className="add-cart text-[12px] text-[var(--first-color)] font-bold ml-[30px] duration-[250ms]">
                    Add cart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-view-info max-w-[var(--width-home)] w-[100%] m-[auto]">
          <div className="product-view-content-title text-[20px] font-bold text-[var(--title-color)] mt-[100px]">
            Information
          </div>
          <div className="product-view-tab-content-ad">
            <div className="product-view-tab-content-additional border-b-[1px] border-solid border-[#c1c1c1]">
              <table className="data-table table-additional border-none shadow-none w-[50%] mt-[10px] mb-[10px] text-[var(--title-color)]">
                <colgroup>
                  <col width="25%"></col>
                  <col></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Author
                    </th>
                    <td className="data-writer text-[15px] border-none p-[5px]">
                      John
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Categories
                    </th>
                    <td className="data-categories text-[15px] border-none p-[5px]">
                      Thriller, Comedy
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Publication year
                    </th>
                    <td className="data-year text-[15px] border-none p-[5px]">
                      2023
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Languages
                    </th>
                    <td className="data-language text-[15px] border-none p-[5px]">
                      English
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Weight(gr)
                    </th>
                    <td className="data-weight text-[15px] border-none p-[5px]">
                      330
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Cover size
                    </th>
                    <td className="data-size text-[15px] border-none p-[5px]">
                      24 x 15.5 x 1.5 cm
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Page count
                    </th>
                    <td className="data-page text-[15px] border-none p-[5px]">
                      316
                    </td>
                  </tr>
                  <tr>
                    <th className="table-label text-[15px] border-none p-[5px] table-cell !pl-0 leading-[1.6] text-left font-normal align-baseline whitespace-nowrap">
                      Form
                    </th>
                    <td className="data-book-layout text-[15px] border-none p-[5px]">
                      Paperback cover
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="product-view-description">
              <h1 className="text-[20px] text-[var(--title-color)] font-bold mt-[10px]">
                Description
              </h1>
              <p className="text-[15px] text-[var(--title-color)] mt-[10px]">
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
