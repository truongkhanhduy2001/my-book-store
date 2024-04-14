import "./writer.css";

export default function Writer() {
  return (
    <>
      <h2 className="writer-title">Writer</h2>
      <div className="writer-container">
        <div className="writer-label">
          <input type="radio" name="radio" />
          <span className="radio"></span>All
        </div>
        <div className="writer-label">
          <input type="radio" name="radio" />
          <span className="radio"></span>John
        </div>
        <div className="writer-label">
          <input type="radio" name="radio" />
          <span className="radio"></span>John
        </div>
        <div className="writer-label">
          <input type="radio" name="radio" />
          <span className="radio"></span>John
        </div>
      </div>
    </>
  );
}
