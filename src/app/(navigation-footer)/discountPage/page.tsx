"use client";
import Link from "next/link";
import "./discountView.css";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";

export default function DiscountView() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "55",
      type: ["Adventure"],
      time: "old",
    },
    {
      title: "Anime",
      price: "100",
      discount: "45",
      type: ["Horror"],
      time: "old",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "60",
      type: ["Adventure"],
      time: "old",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "60",
      type: ["Adventure"],
      time: "old",
    },
  ];

  return (
    <>
      {/* Discount */}
      <section className="section-p3-view flex flex-col mt-[var(--margin-top-view)]">
        <div className="section-p3-container-view max-w-[var(--width-home)] w-[100%] m-[auto] flex">
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
                href="/discountPage"
              >
                Book discount
              </Link>
            </li>
          </ul>
        </div>
        <div className="discount-container-view flex justify-center mt-[var(--margin-top-font)]">
          <div className="discount-view max-w-[var(--width-home)] w-[100%]">
            <div className="discount-box-view grid grid-cols-4 gap-[15px]">
              {data.map((item, index) => {
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
      </section>
      {/* End Discount */}
    </>
  );
}
