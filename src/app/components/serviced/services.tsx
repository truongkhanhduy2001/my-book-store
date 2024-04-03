import { FaTruck, FaHeadset, FaGift } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import "./services.css";
export default function Services() {
  return (
    <section className="services">
      <div className="services-box">
        <div className="services-card">
          <i className="fa-paper-plane">
            <FaTruck />
          </i>
          <h3>FREE SHIPPING</h3>
          <p>
            Free worldwide<br></br> shipping on all <br></br> orders
          </p>
        </div>
        <div className="services-card">
          <i className="fa-lock">
            <FaGift />
          </i>
          <h3>GIFT CARDS</h3>
          <p>
            Buy gift cards and <br></br> use coupon code <br></br> easily
          </p>
        </div>
        <div className="services-card">
          <i className="fa-redo-alt">
            <FaArrowRotateRight />
          </i>
          <h3>30 DAYS RETURN</h3>
          <p>
            No question return <br></br> and easy refund in <br></br> 14 days
          </p>
        </div>
        <div className="services-card">
          <i className="fas fa-headset">
            <FaHeadset />
          </i>
          <h3>CONTACT US!</h3>
          <p>
            Keep in touch via <br></br> email and support <br></br> system
          </p>
        </div>
      </div>
    </section>
  );
}
