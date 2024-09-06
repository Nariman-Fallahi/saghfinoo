"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef } from "react";
import ReadingTimeCard from "../ReadingTimeCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function NewsSlider() {
  const swiperRef: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      swiperInstance.on("reachEnd", () => {
        // Code
      });

      return () => {
        swiperInstance.off("reachEnd");
      };
    }
  }, []);

  //   useEffect(() => {
  //     if (pageNumber > 1 && data && data?.length < 1) {
  //       setPageNumber((prevState) => prevState - 1);
  //     }
  //   }, [data, pageNumber, setPageNumber]);

  // useEffect(() => {
  //     if (status === "success" && data) {
  //       setCompleteData((prevData) => {
  //         const newData = data.filter(
  //           (item) => !prevData.some((prevItem) => prevItem.id === item.id)
  //         );
  //         return [...prevData, ...newData];
  //       });
  //     }
  //   }, [data, status]);

  return (
    <div className="mt-4 w-full">
      <Swiper
        ref={swiperRef}
        navigation={true}
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={20}
        loop={false}
        freeMode={true}
        centeredSlides={false}
        initialSlide={0}
        className="w-full"
      >
        <SwiperSlide className="mb-1 !w-[155px] !h-[190px] flex flex-col border border-[#] rounded-lg">
          <Image
            width={1000}
            height={500}
            src="/image/Bg-SearchBox.webp"
            className="w-full h-1/2 rounded-t-lg"
            alt=""
          />

          <div className="p-2 mt-1">
            <ReadingTimeCard time={15} />

            <h4 className="mt-2 text-xs font-bold line-clamp-2">
              شهرک ساحلی زمزم در منطقه نور استان مازندران از سوم شهریور وارد
              بازار مزایده شده است.
            </h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
