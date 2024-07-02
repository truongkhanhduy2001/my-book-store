"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function Adventure() {
  const [products, setProducts] = useState(null) as any;

  useEffect(() => {
    const fetchDataAdventure = async () => {
      try {
        const res = await fetch("/api/product/adventure");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!products) {
      fetchDataAdventure();
    }
  }, [products]);

  return (
    <>
      {/* Adventure */}
      <section className="section-books flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-books-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/adventure"
              >
                Adventure
              </Link>
            </li>
          </ul>
        </div>
        <div className="books-container flex justify-center mt-[var(--margin-top-font)]">
          <div className="books max-w-[var(--width-home)] w-[100%]">
            <div className="books-box grid grid-cols-4 gap-[15px]">
              {products?.map((product: any, index: any) => {
                const { discount: discount, price: price } = product;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return <CardBook key={index} product={product} per={per} />;
              })}
            </div>
            <Paginate />
          </div>
        </div>
      </section>
      {/* End Adventure */}
    </>
  );
}
