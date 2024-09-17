"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Title } from "@/constant/Constants";
import { NewsDataType } from "@/types/Type";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

type LatestNewsType = {
  data: NewsDataType[];
  totalPages: number;
  status: number;
};

export default function LatestNews({
  data,
  totalPages,
  status,
}: LatestNewsType) {
  const swiperRef: MutableRefObject<any> = useRef(null);
  const router = useRouter();
  const pathName = usePathname();

  const [completeData, setCompleteData] = useState<NewsDataType[]>([]);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      let PageNumber = 1;

      swiperInstance.on("reachEnd", () => {
        if (PageNumber < totalPages) {
          router.push(`${pathName}?pageNumber${PageNumber}`, { scroll: false });
        }
      });

      return () => {
        swiperInstance.off("reachEnd");
      };
    }
  }, []);

  useEffect(() => {
    if (status === 200 && data) {
      setCompleteData((prevData) => {
        const newData = data.filter(
          (item) => !prevData.some((prevItem) => prevItem.slug === item.slug)
        );
        return [...prevData, ...newData];
      });
    }
  }, [data, status]);

  return (
    <>
      <div className="mt-7 flex flex-col pr-3">
        <Title title="آخرین اخبار املاک را از سقفینو دنبال کنید" />

        <div className="w-full pr-3 mt-4 lg:mt-10">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={"auto"}
            spaceBetween={20}
            loop={false}
            freeMode={true}
            className="mySwiper w-full"
          >
            {completeData.map((item) => {
              return (
                <SwiperSlide
                  className="!w-[242px] !h-[213px] flex flex-col border border-gray-200
                  rounded-xl md:!w-[30%] lg:!w-[288px] lg:!h-[358px]"
                  key={item.slug}
                >
                  <Image
                    className="w-[242px] h-[145px] rounded-t-lg lg:w-[288px] lg:h-[238px]"
                    width={100}
                    height={100}
                    src={item.imageFullPath}
                    sizes="(min-width: 1024px) 288px, 238px"
                    alt=""
                  />
                  <div
                    className="h-[66px] pt-3 pb-6 px-6 text-sm bg-slate-50
                     lg:h-[118px] rounded-l-xl"
                  >
                    <h3 className="truncate text-sm lg:text-lg font-bold">
                      {item.title}
                    </h3>
                    <h4 className="mt-1 line-clamp-2 text-xs lg:text-base">
                      {item.shortDescription}
                    </h4>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
