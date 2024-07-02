"use client";
import Link from "next/link";
import "./discountView.css";
import { useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import { useEffect } from "react";

export default function DiscountView() {
  const [products, setProducts] = useState(null) as any;

  useEffect(() => {
    const fetchDataDiscount = async () => {
      try {
        const res = await fetch("/api/product/discount");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!products) {
      fetchDataDiscount();
    }
  }, [products]);

  return (
    <>
      {/* Discount */}
      <section className="section-p3-view flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-p3-container-view max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/discountPage"
              >
                Book discount
              </Link>
            </li>
          </ul>
        </div>
        <div className="discount-container-view flex justify-center mt-[var(--margin-top-font)]">
          <div className="discount-view max-w-[var(--width-home)] w-[100%]">
            <div className="discount-box-view grid grid-cols-4 gap-[15px]">
              {products?.map((product: any) => {
                const { discount: discount, price: price } = product;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return (
                  <CardBook key={product._id} product={product} per={per} />
                );
              })}
            </div>
            <Paginate />
          </div>
        </div>
      </section>
      {/* End Discount */}
    </>
  );
}
