"use client";
import "../books.css";
import TitlePage from "@/app/components/titlePage/titlePage";
import Book from "@/app/components/typeBook/book";
export default function Comic() {
  const dataComic = [
    {
      title: "Dune",
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
      {/* Comic */}
      <section className="section-books">
        <div className="section-books-container">
          <TitlePage title="Comic" />
        </div>
        <Book data={dataComic} />
      </section>
      {/* End Comic */}
    </>
  );
}
