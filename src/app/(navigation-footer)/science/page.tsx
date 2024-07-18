"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import SkeletonLoad from "@/app/components/SkeletonLoad/Skeleton";

export default function Science() {
  const [products, setProducts] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataScience = async () => {
      try {
        const res = await fetch("/api/product/science");
        const data = await res.json();
        setProducts(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (!products) {
      fetchDataScience();
    }
  }, [products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
      {/* Cartoon */}
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
                href="/science"
              >
                Science
              </Link>
            </li>
          </ul>
        </div>
        <div className="books-container flex justify-center mt-[var(--margin-top-font)]">
          {Loading && (
            <div className="arrivals max-w-[var(--width-home)] w-[100%]">
              <div className="arrivals-box grid grid-cols-4 gap-[15px]">
                {[...Array(4)].map((_, index) => (
                  <SkeletonLoad key={index} />
                ))}
              </div>
            </div>
          )}
          {!Loading && currentItems && currentItems.length > 0 && (
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
          )}
        </div>
      </section>
      {/* End Cartoon */}
    </>
  );
}
