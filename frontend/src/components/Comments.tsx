"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Title from "@/constant/Constants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function Comments() {
  return (
    <div className="w-full flex flex-col mt-8 p-4">
      <Title title="نظرات کاربران " />

      <div className="mt-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={15}
          loop={false}
          freeMode={true}
          className="mySwiper w-full"
        >
          <SwiperSlide className="mb-1 !w-fit">
            <div
              className="!w-[242px] p-2 flex flex-col shadow
             rounded-2xl border border-[#EDEDED] pb-3"
            >
              <div className="flex">
                <Image
                  width={38}
                  height={38}
                  className="rounded-full"
                  src="/image/Bg-SearchBox.webp"
                  alt=""
                />
                <div className="flex flex-col mr-3">
                  <p className="text-xs">علی</p>
                  <p className="text-xs mt-2 pb-[2px] border-b border-red-500">
                    5 از 5
                  </p>
                </div>
              </div>

              <p className="mt-2 text-justify text-xs">
                از نحوه برخورد و وقتی که برای مشتری میذارن واقعا راضی هستم. به
                دلیل مشغله زیاد زمان زیادی نداشتم ولی با برنامه‌ریزی درست براحتی
                با کمک مشارین آژانس توسی خونه دلخواهم رو پیدا کردم
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="mb-1 !w-fit">
            <div
              className="!w-[242px] !h-[150px] p-2 flex flex-col shadow
             rounded-2xl border border-[#EDEDED] pb-3"
            >
              <div className="flex">
                <Image
                  width={38}
                  height={38}
                  className="rounded-full"
                  src="/image/Bg-SearchBox.webp"
                  alt=""
                />
                <div className="flex flex-col mr-3">
                  <p className="text-xs">علی</p>
                  <p className="text-xs mt-2 pb-[2px] border-b border-red-500">
                    5 از 5
                  </p>
                </div>
              </div>

              <p className="mt-2 text-justify text-xs">
                از نحوه برخورد و وقتی که برای مشتری میذارن واقعا راضی هستم. به
                
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
