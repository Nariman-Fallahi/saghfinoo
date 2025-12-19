"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { MutableRefObject, useEffect, useRef } from "react";
import { isMobile } from "@/utils/isMobile";
import SliderBox from "../SliderBox";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { NewsDataType } from "@/Types";

//TODO Edit Component

export default function Slider({ data }: { data: NewsDataType[] }) {
  const swiperRef: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      swiperInstance.on("reachEnd", () => {
        // alert('end')
      });

      return () => {
        swiperInstance.off("reachEnd");
      };
    }
  }, []);
  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation]}
      navigation={true}
      slidesPerView={"auto"}
      spaceBetween={20}
      loop={false}
      freeMode={true}
      centeredSlides={false}
      initialSlide={0}
      className="w-full mt-4 md:mt-6 lg:mt-7"
    >
      {data.map((item) => (
        <SwiperSlide key={item.slug} className="!w-[190px] md:!w-1/3">
          <SliderBox
            image={item.imageFullPath}
            readTime={item.readTime}
            title={item.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
