import "./filter.css";
import Writer from "../writerBar/writer";
import Categories from "../categoriesBar/categories";
import Price from "../priceBar/price";
export default function SideBar() {
  return (
    <>
      <section className="sidebar">
        <Writer />
        <Categories />
        <Price />
        <div className="sidebar-btn">Apply now</div>
      </section>
    </>
  );
}
