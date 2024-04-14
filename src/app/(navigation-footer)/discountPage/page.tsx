"use client";
import Link from "next/link";
import "./discountView.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
import SideBar from "@/app/components/filter/filter";

export default function DiscountView() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "55",
      time: "old",
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
      discount: "60",
      time: "old",
    },
  ];

  return (
    <>
      {/* Discount */}
      <section className="section-p3-view">
        <div className="section-p3-container-view">
          <ul className="page-link">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/discountPage">Book discount</Link>
            </li>
          </ul>
        </div>
        <div className="discount-container-view">
          <div className="discount-view">
            <div className="discount-left">
              <SideBar />
            </div>
            <div className="discount-right">
              <div className="discount-box-view">
                {data.slice(-12).map((item, index) => {
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
          </div>
        </div>
      </section>
      {/* End Discount */}
    </>
  );
}
