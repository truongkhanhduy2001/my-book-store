"use client";
import Link from "next/link";
import "./wishlist.css";
import { useState } from "react";
import Paginate from "@/app/components/paginate/paginate";
import TemplateWish from "@/app/components/templateWish/templateWish";
import { TiShoppingCart } from "react-icons/ti";
import { useCustomContext } from "@/provider/CustomProvider";
import { useWishContext } from "@/provider/WishProvider";

export default function WishList() {
  const { user } = useCustomContext();
  const { wish, getWish } = useWishContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const calculateAverageRating = (reviews: any) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce(
      (acc: any, review: any) => acc + review.rating,
      0
    );
    return (sum / reviews.length).toFixed(1);
  };

  // Calculate total pages
  const totalPages = wish ? Math.ceil(wish.listWish.length / itemsPerPage) : 0;

  // Calculate the index of the last and first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice products for the current page
  const currentItems = wish
    ? wish.listWish.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalProducts = wish ? wish.listWish.length : 0;
  const limit = itemsPerPage;

  return (
    <>
      {/* Wish list */}
      <section className="section-wish-list flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-wish-list-container max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/wishlist"
              >
                Wish list
              </Link>
            </li>
          </ul>
        </div>
        <div className="wish-list-container flex justify-center mt-[var(--margin-top-font)]">
          {wish && wish.listWish.length > 0 ? (
            <div className="wish-list max-w-[var(--width-home)] w-[100%]">
              <div className="wish-list-box grid grid-cols-4 gap-[15px]">
                {currentItems.map((item: any, index: any) => {
                  const price = item.productId.price;
                  const discount = item.productId.discount;
                  const per = (
                    ((Number(discount) - Number(price)) / Number(price)) *
                    100
                  ).toFixed(0);
                  const averageRating = calculateAverageRating(
                    item.productId.reviews
                  );
                  return (
                    <TemplateWish
                      key={index}
                      item={item}
                      per={per}
                      averageRating={averageRating}
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
          ) : (
            <div className="wrapper text-[var(--title-color)] text-[15px]">
              <div className="wrap-container w-[350px]">
                <div className="content text-center px-[30px] pt-[60px] pb-[30px]">
                  <p className="title text-[18px] font-bold text-[var(--first-color)]">
                    Uh, oh!
                  </p>
                  <TiShoppingCart className="text-[80px] text-[var(--first-color)] text-center justify-center w-[100%]" />
                  <p className="info text-[15px] font-normal text-[var(--text-color)] opacity-[0.7]">
                    Your wish list is empty!
                  </p>
                </div>
                <Link href="/">
                  <button className="block w-[100%] p-[15px] font-bold cursor-pointer text-[var(--white-color)] bg-[var(--first-color)] rounded-[10px] hover:rounded-[20px]">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* End Wish list */}
    </>
  );
}
