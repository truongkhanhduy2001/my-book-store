import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
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
        spaceBetween={40}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/images/slide1.png"
            alt="slide"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slide2.png"
            alt="slide"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slide3.png"
            alt="slide"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slide4.png"
            alt="slide"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slide5.png"
            alt="slide"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slide6.png"
            alt="slide"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </SwiperSlide>
        <div className="stand">
          <img src="/images/stand.png" />
        </div>
      </Swiper>
    </>
  );
}
