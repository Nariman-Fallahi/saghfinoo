"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { MutableRefObject, useEffect, useRef } from "react";
import { isMobile } from "@/constant/Constants";
import SliderBox from "../SliderBox";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { NewsDataType } from "@/types/Type";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar, Mousewheel } from "swiper/modules";

type SliderType = {
  pageName: string;
  data: NewsDataType[];
  totalPages: number;
};

export default function Slider({ pageName, data, totalPages }: SliderType) {
  const swiperRef: MutableRefObject<any> = useRef(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      let PageNumber = 1;

      swiperInstance.on("reachEnd", () => {
        const currentQuery = new URLSearchParams(window.location.search);

        if (PageNumber < totalPages) {
          currentQuery.set(
            `${pageName}PageNumber`,
            JSON.stringify(PageNumber + 1)
          );

          router.push(`${pathName}?${currentQuery.toString()}`, {
            scroll: false,
          });
        }
      });

      return () => {
        swiperInstance.off("reachEnd");
      };
    }
  }, []);

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
    <Swiper
      ref={swiperRef}
      modules={[Scrollbar, Mousewheel]}
      slidesPerView={"auto"}
      spaceBetween={20}
      loop={false}
      freeMode={true}
      centeredSlides={false}
      initialSlide={0}
      mousewheel={!isMobile}
      scrollbar={{ draggable: !isMobile, enabled: !isMobile }}
      className="w-full h-full mt-4 md:mt-0 md:w-[30%] md:rounded-lg"
      direction={isMobile ? "horizontal" : "vertical"}
    >
      {data.map((item) => {
        return (
          <SwiperSlide
            key={item.slug}
            className="!w-[155px] md:!h-fit md:!w-full"
          >
            <SliderBox
              image={item.imageFullPath}
              title={item.title}
              readTime={item.readTime}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
