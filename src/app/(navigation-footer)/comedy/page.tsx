"use client";
import "../books.css";
import TitlePage from "@/app/components/titlePage/titlePage";
import Book from "@/app/components/typeBook/book";
export default function Comedy() {
  const dataComedy = [
    {
      title: "Dune",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
    {
      title: "Anime",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
    {
      title: "Naruto",
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
      {/* Comedy */}
      <section className="section-books">
        <div className="section-books-container">
          <TitlePage title="Comedy" />
        </div>
        <Book data={dataComedy} />
      </section>
      {/* End Comedy */}
    </>
  );
}
