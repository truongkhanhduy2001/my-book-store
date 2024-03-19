import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "./slider.css";

export default function Slider() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        coverflowEffect={{
          rotate: 3,
          stretch: 0,
          depth: 100,
          modifier: 7,
          //   slideShadows: true,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
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
      </Swiper>
    </>
  );
}
