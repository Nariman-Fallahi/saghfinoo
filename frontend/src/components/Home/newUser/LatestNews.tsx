"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { NewsDataType } from "@/Types";
import { useEffect, useState } from "react";
import CustomSwiper from "@/components/CustomSwiper";
import { Title } from "@/components/ui/Title";

type LatestNewsType = {
  data: NewsDataType[];
  status: number;
};

export default function LatestNews({ data, status }: LatestNewsType) {
  const [completeData, setCompleteData] = useState<NewsDataType[]>([]);

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
          <CustomSwiper
            dataLength={data?.length}
            isPending={false}
            navigation={true}
            modules={[Navigation]}
            slidesPerView={"auto"}
            spaceBetween={20}
            loop={false}
            freeMode={true}
            className="w-full"
          >
            {completeData.map((item) => {
              return (
                <SwiperSlide
                  className="!w-[242px] flex flex-col border border-gray-200
                  rounded-xl md:!w-[30%] lg:!w-[288px]"
                  key={item.slug}
                >
                  <Image
                    className="w-full h-32 lg:h-48 rounded-t-lg"
                    width={100}
                    height={100}
                    src={item.imageFullPath}
                    sizes="(min-width: 1024px) 288px, 238px"
                    alt=""
                  />
                  <div
                    className="pt-3 pb-6 px-6 text-sm bg-slate-50
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
          </CustomSwiper>
        </div>
      </div>
    </>
  );
}
