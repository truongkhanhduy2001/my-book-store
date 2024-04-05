"use client";
import "../books.css";
import TitlePage from "@/app/components/titlePage/titlePage";
import Book from "@/app/components/typeBook/book";
export default function Horror() {
  const dataHorror = [
    {
      title: "Ghost",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
    {
      title: "Dragon",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
    {
      title: "One Piece",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
    {
      title: "Drama",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
  ];
  return (
    <>
      {/* Horror */}
      <section className="section-books">
        <div className="section-books-container">
          <TitlePage title="Horror" />
        </div>
        <Book data={dataHorror} />
      </section>
      {/* End horror */}
    </>
  );
}
