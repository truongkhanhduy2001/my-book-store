import {
  TbTruckDelivery,
  TbGiftCard,
  TbArrowBack,
  TbBrandTelegram,
} from "react-icons/tb";

import "./services.css";
export default function Services() {
  return (
    <section className="services flex flex-col mt-[var(--margin-top)]">
      <div className="services-box max-w-[var(--width-home)] w-[100%] m-[auto] flex justify-center gap-[100px]">
        <div className="services-card text-center">
          <i className="fa-paper-plane flex justify-center text-[var(--first-color)] text-[60px] mb-[15px] cursor-pointer">
            <TbTruckDelivery />
          </i>
          <h3 className="text-[18px] text-[var(--title-color)] font-bold mb-[10px]">
            FREE SHIPPING
          </h3>
          <p className="text-[15px] text-[var(--text-color)] mb-[10px]">
            Free worldwide<br></br> shipping on all <br></br> orders
          </p>
        </div>
        <div className="services-card text-center">
          <i className="fa-lock flex justify-center text-[var(--first-color)] text-[60px] mb-[15px] cursor-pointer">
            <TbGiftCard />
          </i>
          <h3 className="text-[18px] text-[var(--title-color)] font-bold mb-[10px]">
            GIFT CARDS
          </h3>
          <p className="text-[15px] text-[var(--text-color)] mb-[10px]">
            Buy gift cards and <br></br> use coupon code <br></br> easily
          </p>
        </div>
        <div className="services-card text-center">
          <i className="fa-redo-alt flex justify-center text-[var(--first-color)] text-[60px] mb-[15px] cursor-pointer">
            <TbArrowBack />
          </i>
          <h3 className="text-[18px] text-[var(--title-color)] font-bold mb-[10px]">
            30 DAYS RETURN
          </h3>
          <p className="text-[15px] text-[var(--text-color)] mb-[10px]">
            No question return <br></br> and easy refund in <br></br> 14 days
          </p>
        </div>
        <div className="services-card text-center">
          <i className="fas fa-headset flex justify-center text-[var(--first-color)] text-[60px] mb-[15px] cursor-pointer">
            <TbBrandTelegram />
          </i>
          <h3 className="text-[18px] text-[var(--title-color)] font-bold mb-[10px]">
            CONTACT US!
          </h3>
          <p className="text-[15px] text-[var(--text-color)] mb-[10px]">
            Keep in touch via <br></br> email and support <br></br> system
          </p>
        </div>
      </div>
    </section>
  );
}
