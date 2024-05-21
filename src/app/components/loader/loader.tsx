"use client";
import "./loader.css";

export default function Loader() {
  return (
    <div className="loader-container absolute flex justify-center items-center top-0 left-0 w-[100%] h-[100%] z-[99999] bg-[var(--white-color)]">
      <div className="loader"></div>
    </div>
  );
}
