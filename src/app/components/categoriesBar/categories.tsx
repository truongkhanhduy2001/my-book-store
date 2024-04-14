import "./categories.css";

export default function Categories() {
  return (
    <>
      <h2 className="categories-title">Categories</h2>
      <div className="categories-container">
        <label className="categories-label">
          <input type="checkbox" name="check" />
          Adventure
        </label>
        <label className="categories-label">
          <input type="checkbox" name="check" />
          Comedy
        </label>
        <label className="categories-label">
          <input type="checkbox" name="check" />
          Horror
        </label>
        <label className="categories-label">
          <input type="checkbox" name="check" />
          Science
        </label>
        <label className="categories-label">
          <input type="checkbox" name="check" />
          Romance
        </label>
        <label className="categories-label">
          <input type="checkbox" name="check" />
          Thriller
        </label>
      </div>
    </>
  );
}
