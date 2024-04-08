"use client";
import "../books.css";
import TitlePage from "@/app/components/titlePage/titlePage";
import Book from "@/app/components/typeBook/book";
import Paginate from "@/app/components/paginate/paginate";
export default function Adventure() {
  const dataAdventure = [
    {
      title: "English",
      writer: "Author 1",
      categories: "Category 1, Category 2",
      price: "$20.00",
    },
    {
      title: "France",
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
      {/* Adventure */}
      <section className="section-books">
        <div className="section-books-container">
          <TitlePage title="Adventure" />
        </div>
        <Book data={dataAdventure} />
      </section>
      {/* End Adventure */}
    </>
  );
}
