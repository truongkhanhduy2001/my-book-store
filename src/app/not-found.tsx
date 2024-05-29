import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound-bg"></div>
      <div className="notfound">
        <div className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <Link href="/" className="home-btn">
          Go Home
        </Link>
        <Link href="#" className="contact-btn">
          Contact us
        </Link>
      </div>
    </div>
  );
}
