"use client";
import { useState, useEffect } from "react";
import Banner from "../components/banner/banner";
import Services from "../components/serviced/services";
import Seller from "../components/seller/seller";
import Arrival from "../components/arrival/arrival";
import Discount from "../components/discount/discount";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      <Seller />
      <Arrival />
      <Discount />
    </>
  );
}
