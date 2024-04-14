"use client";
import Link from "next/link";
import "./wishlist.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function WishList() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      time: "new",
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
      {/* Arrivals */}
      <section className="section-wish-list">
        <div className="section-wish-list-container">
          <h2>Wish List</h2>
        </div>
        <div className="wish-list-container">
          <div className="wish-list">
            <div className="wish-list-box">
              {data.length <= 0 ? (
                ""
              ) : (
                <>
                  {data.map((item, index) => {
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
