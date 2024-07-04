"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function Horror() {
  const [products, setProducts] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchDataHorror = async () => {
      try {
        const res = await fetch("/api/product/horror");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!products) {
      fetchDataHorror();
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
      {/* Horror */}
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
                href="/horror"
              >
                Horror
              </Link>
            </li>
          </ul>
        </div>
        <div className="books-container flex justify-center mt-[var(--margin-top-font)]">
          <div className="books max-w-[var(--width-home)] w-[100%]">
            <div className="books-box grid grid-cols-4 gap-[15px]">
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
      {/* End Horror */}
    </>
  );
}
