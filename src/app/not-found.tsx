import Link from "next/link";
import "./not-found.css";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

export default function NotFound() {
  return (
    // <section
    //   style={{
    //     position: "fixed",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     top: "0",
    //     bottom: "0",
    //     right: "0",
    //     left: "0",
    //   }}
    // >
    //   <div
    //     style={{
    //       marginLeft: "auto",
    //       marginRight: "auto",
    //       textAlign: "center",
    //     }}
    //   >
    //     <h1
    //       style={{
    //         fontSize: "80px",
    //         color: "hsl(230, 62%, 56%)",
    //         zIndex: "10",
    //         fontStyle: "normal",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       404
    //     </h1>
    //     <div style={{ marginTop: "-50px" }}>
    //       <h3
    //         style={{
    //           fontSize: "40px",
    //           color: "hsl(230, 70%, 16%)",
    //           marginBottom: "10px",
    //         }}
    //       >
    //         Looks Like You are Lost
    //       </h3>
    //       <p
    //         style={{
    //           fontSize: "20px",
    //           color: "hsl(230, 16%, 45%)",
    //           marginBottom: "50px",
    //         }}
    //       >
    //         The page you are looking for is not available
    //       </p>
    //       <Link
    //         style={{
    //           color: "white",
    //           paddingTop: "5px",
    //           paddingBottom: "5px",
    //           paddingLeft: "20px",
    //           paddingRight: "20px",
    //           display: "inline-block",
    //           background: "hsl(230, 62%, 56%)",
    //           textDecoration: "none",
    //           borderRadius: "5px",
    //         }}
    //         href="/"
    //       >
    //         Go to Home
    //       </Link>
    //     </div>
    //   </div>
    // </section>
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
        <div className="notfound-social">
          <Link href="#">
            <i className="fa fa-facebook">
              <FaFacebookF />
            </i>
          </Link>
          <Link href="#">
            <i className="fa fa-twitter">
              <FaTwitter />
            </i>
          </Link>
          <Link href="#">
            <i className="fa fa-instagram">
              <FaInstagram />
            </i>
          </Link>
          <Link href="#">
            <i className="fa fa-github">
              <FaGithub />
            </i>
          </Link>
          <Link href="#">
            <i className="fa fa-youtube">
              <FaYoutube />
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
}
