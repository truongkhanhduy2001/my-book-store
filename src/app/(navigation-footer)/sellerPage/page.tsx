"use client";
import Link from "next/link";
import "./sellerView.css";
import { useState, useEffect } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function SellerView() {
  const [products, setProducts] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchDataSeller = async () => {
      try {
        const res = await fetch("/api/product/bestSeller");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!products) {
      fetchDataSeller();
    }
  }, [products]);

  // Calculate total pages
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  // Calculate the index of the last and first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice products for the current page
  const currentItems = products
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalProducts = products ? products.length : 0;
  const limit = itemsPerPage;

  return (
    <>
      <section className="section-p1-view flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-p1-container-view max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/sellerPage"
              >
                Best seller
              </Link>
            </li>
          </ul>
        </div>
        <div className="best-seller-container-view flex justify-center mt-[var(--margin-top-font)]">
          <div className="best-seller-view max-w-[var(--width-home)] w-[100%]">
            <div className="best-seller-box-view grid grid-cols-4 gap-[15px]">
              {currentItems.map((product: any, index: any) => {
                const { discount, price } = product;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return <CardBook key={index} product={product} per={per} />;
              })}
            </div>
            {totalProducts > limit && (
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
