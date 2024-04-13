"use client";
import "../book.css";
import TitlePage from "@/app/components/titlePage/titlePage";
import Paginate from "@/app/components/paginate/paginate";
import CardBook from "@/app/components/cardBook/cardBook";
export default function Horror() {
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
      {/* Horror */}
      <section className="section-books">
        <div className="section-books-container">
          <TitlePage title="Horror" />
        </div>
        <div className="books-container">
          <div className="books">
            <div className="books-box">
              {data.slice(-16).map((item, index) => {
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
      {/* End Horror */}
    </>
  );
}
