import "./newsletter.css";
export default function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-left">
            <img className="newsletter-img-1" src="/images/newsletter-1.png" />
            <img className="newsletter-img-2" src="/images/newsletter-2.png" />
          </div>
          <div className="newsletter-right">
            <h2 className="newsletter-heading">
              Sign Up for the <strong>NEWSLETTER</strong>
            </h2>
            <input
              type="email"
              className="email-input"
              placeholder="Enter your email"
            ></input>
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
