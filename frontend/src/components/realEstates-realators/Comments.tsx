"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import {Title} from "@/constant/Constants";
import { useState } from "react";
import S_Comments from "@/skeleton/S_Comments";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function Comments() {
  const [isloading, setIsloading] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col mt-8 p-4 md:mt-14 md:p-8">
      <Title title="نظرات کاربران " />

      <div className="mt-4 md:mt-8">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={20}
          loop={false}
          freeMode={true}
          className="mySwiper w-full"
        >
          {isloading ? (
           <div className="flex justify-between"><S_Comments /></div>
          ) : (
            <SwiperSlide className="mb-1 !w-fit">
              <div
                className="!w-[242px] p-2 flex flex-col shadow
             rounded-2xl border border-[#EDEDED] pb-3 md:items-center md:p-7"
              >
                <div className="flex md:flex-col">
                  <Image
                    width={38}
                    height={38}
                    className="rounded-full md:w-[60px] md:h-[60px]"
                    src="/image/Bg-SearchBox.webp"
                    alt=""
                  />
                  <div className="flex flex-col mr-3 md:mr-0 md:items-center">
                    <p className="text-xs md:text-sm md:mt-3">علی</p>
                    <p
                      className="text-xs mt-2 pb-[2px] border-b border-red-500 md:text-sm md:mt-3
                  md:w-fit"
                    >
                      5 از 5
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-justify text-xs md:text-sm">
                  از نحوه برخورد و وقتی که برای مشتری میذارن واقعا راضی هستم. به
                  دلیل مشغله زیاد زمان زیادی نداشتم ولی با برنامه‌ریزی درست
                  براحتی با کمک مشارین آژانس توسی خونه دلخواهم رو پیدا کردم
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
