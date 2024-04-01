import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./Bannerslider.css";

export default function BannerSlider() {
  return (
    <>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/slide1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide3.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide4.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide5.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide6.png" />
        </SwiperSlide>
        <div className="stand">
          <img src="/images/stand.png" />
        </div>
      </Swiper>
    </>
  );
}
