"use client";
import "./home.css";
import LayOut from "./pages/layout/page";
import React, { useRef, useState } from "react";
import Banner from "./components/banner/banner";
import Services from "./components/serviced/services";
import Seller from "./components/seller/seller";
import Arrival from "./components/arrival/arrival";
import Discount from "./components/discount/discount";

export default function Home() {
  return (
    <LayOut>
      <Banner />
      <Services />
      {/* Best Seller */}
      <Seller />
      {/* End Best Seller */}
      {/* New Arrivals */}
      <Arrival />
      {/* End Arrivals */}
      {/* Books list */}
      <Discount />
      {/* End Books List */}
    </LayOut>
  );
}
