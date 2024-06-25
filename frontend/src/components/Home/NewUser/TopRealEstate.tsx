"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function TopRealEstate() {
  return (
    <div className="mt-[48px] px-4">
      <h3 className="font-bold text-sm lg:text-[32px]">املاک برتر تهران</h3>

      <div className="mt-4 w-full">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={20}
          loop={false}
          freeMode={true}
          className="mySwiper w-full"
        >
          <SwiperSlide className="p-1 !w-[156px] !h-[208px]">
            <div
              className="w-full h-full flex flex-col items-center shadow
             rounded-[16px] p-4 border border-[#E1E1E1]"
            >
              <Image
                width={46}
                height={32}
                src="/icons/Bg-SearchBox.webp"
                alt=""
              />

              <div className="flex items-center mt-4">
                <p className="font-bold text-xs">مشاور املاک ولیعصر</p>
                <span className="mr-2 text-xs">5</span>
              </div>

              <p className="text-xs mt-2 bg-">ادرس</p>

              <p className="text-xs mt-2 text-[#717171]">ادرس</p>

              <p className="text-xs mt-2 text-[#717171]">ادرس</p>

              <p className="text-xs mt-2 font-medium py-2">مشاهده نظرات</p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="p-1 !w-[156px] !h-[208px]">
            <div
              className="w-full h-full flex flex-col items-center shadow
             rounded-[16px] p-4 border border-[#E1E1E1]"
            >
              <Image
                width={46}
                height={32}
                src="/icons/Bg-SearchBox.webp"
                alt=""
              />

              <div className="flex items-center mt-4">
                <p className="font-bold text-xs">مشاور املاک ولیعصر</p>
                <span className="mr-2 text-xs">5</span>
              </div>

              <p className="text-xs mt-2">ادرس</p>

              <p className="text-xs mt-2 text-[#717171]">ادرس</p>

              <p className="text-xs mt-2 text-[#717171]">ادرس</p>

              <p className="text-xs mt-2 font-medium py-2">مشاهده نظرات</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
