import "./filter.css";
export default function SideBar() {
  return (
    <>
      <section className="sidebar">
        <div className="writer">
          <h2 className="writer-title">Writer</h2>
          <div className="writer-container">
            <div className="writer-label">
              <input type="checkbox" name="check" />
              <span className="check"></span>John
            </div>
          </div>
        </div>
        <div className="categories">
          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            <div className="categories-label">
              <input type="checkbox" name="check" />
              Adventure
            </div>
          </div>
        </div>
        <div className="prices">
          <header>
            <h2>Price</h2>
            <p>Use slider or enter min and max price</p>
          </header>
        </div>
        <div className="sidebar-btn">Apply now</div>
      </section>
    </>
  );
}
