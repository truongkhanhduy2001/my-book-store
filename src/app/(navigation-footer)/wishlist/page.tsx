"use client";
import Link from "next/link";
import Image from "next/image";
import "./wishlist.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function WishList() {
  const data: any = [
    {
      title: "Dune",
      price: "100",
      discount: "95",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      time: "old",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      time: "old",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "old",
    },
  ];

  return (
    <>
      {/* Wish list */}
      <section className="section-wish-list">
        <div className="section-wish-list-container">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/wishlist">Wish list</Link>
            </li>
          </ul>
        </div>
        <div className="wish-list-container">
          {data.length > 0 ? (
            <div className="wish-list">
              <div className="wish-list-box">
                {data.map((item: any, index: any) => {
                  const { discount: discount, price: price, time } = item;
                  const per = (
                    ((Number(discount) - Number(price)) / Number(price)) *
                    100
                  ).toFixed(0);
                  return <CardBook key={index} item={item} per={per} />;
                })}
              </div>
              <Paginate />
            </div>
          ) : (
            <div className="no-product"></div>
          )}
        </div>
      </section>
      {/* End Wish list */}
    </>
  );
}
