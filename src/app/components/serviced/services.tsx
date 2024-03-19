import { FaTruck, FaLock, FaHeadset } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import "./services.css";
export default function Services() {
  return (
    <section className="services">
      <div className="services_box">
        <div className="services_card">
          <i className="fas fa-paper-plane">
            <FaTruck />
          </i>
          <h3>Free shipping</h3>
          <p>Order over $100</p>
        </div>
        <div className="services_card">
          <i className="fas fa-lock">
            <FaLock />
          </i>
          <h3>Secure payment</h3>
          <p>100 secure payment</p>
        </div>
        <div className="services_card">
          <i className="fas fa-redo-alt">
            <FaArrowRotateRight />
          </i>
          <h3>Easy returns</h3>
          <p>10 day returns</p>
        </div>
        <div className="services_card">
          <i className="fas fa-headset">
            <FaHeadset />
          </i>
          <h3>24/7 support</h3>
          <p>Call us anytime</p>
        </div>
      </div>
    </section>
  );
}
