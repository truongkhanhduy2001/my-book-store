"use client";
import Link from "next/link";
import Image from "next/image";
import "./wishlist.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function WishList() {
  const data: any = [];

  return (
    <>
      {/* Arrivals */}
      <section className="section-wish-list">
        <div className="section-wish-list-container">
          <h2>Wish List</h2>
        </div>
        <div className="wish-list-container">
          <div className="wish-list">
            <div className="wish-list-box">
              {data.length <= 0 ? (
                <div className="no-product"></div>
              ) : (
                <>
                  {data.map((item: any, index: any) => {
                    const { discount: discount, price: price, time } = item;
                    const per = (
                      ((Number(discount) - Number(price)) / Number(price)) *
                      100
                    ).toFixed(0);
                    return <CardBook key={index} item={item} per={per} />;
                  })}
                </>
              )}
            </div>
            <Paginate />
          </div>
        </div>
      </section>
      {/* End Arrivals */}
    </>
  );
}
