"use client";
import { useState, useEffect } from "react";
import Banner from "../components/banner/banner";
import Services from "../components/serviced/services";
import Seller from "../components/seller/seller";
import Arrival from "../components/arrival/arrival";
import Discount from "../components/discount/discount";
import Loader from "../components/loader/loader";

export default function Home() {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
  }, []);

  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
        <>
          <Banner />
          <Services />
          <Seller />
          <Arrival />
          <Discount />
        </>
      )}
    </>
  );
}
