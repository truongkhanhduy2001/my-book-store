"use client";
import "../book.css";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function Adventure() {
  const [products, setProducts] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 4; // Limit for admin page

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `/api/admin/productAdmin?page=${currentPage}&limit=${limit}`
      );
      const data = await response.json();

      if (data.status === 200) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
        if (data.products.length == 0) {
          setCurrentPage(data.totalPages);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useLayoutEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // Filter page
  // useLayoutEffect(() => {
  //   const filterData = products.filter((item: any) => {
  //     return item.type.includes("Adventure");
  //   });
  //   setProducts(filterData);
  // }, []);

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
              {products?.map((product: any) => {
                const { discount: discount, price: price, time } = product;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return (
                  <CardBook
                    key={product._id}
                    product={product}
                    per={per}
                    time={time}
                  />
                );
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
      {/* End Adventure */}
    </>
  );
}
