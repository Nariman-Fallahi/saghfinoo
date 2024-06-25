"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function LatestNews() {
  return (
    <>
      <div className="mt-7 flex flex-col pr-3">
        {/* Title */}
        <h3 className="text-sm font-bold px-3 md:text-lg lg:text-[32px]">
          آخرین اخبار املاک را از سقفینو دنبال کنید
        </h3>
        {/* END Title */}
        <div className="w-full pr-3 mt-4 lg:mt-10">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={"auto"}
            spaceBetween={10}
            loop={false}
            freeMode={true}
            className="mySwiper w-full"
          >
            {/* Box */}
            <SwiperSlide
              className="!w-[242px] !h-[213px] flex flex-col border border-gray-200
             rounded-xl md:!w-[30%] lg:!w-[288px] lg:!h-[358px]"
            >
              <Image
                className="w-[242px] h-[145px] rounded-t-lg lg:w-[288px] lg:h-[238px]"
                width={100}
                height={100}
                src="/test/Photo.png"
                alt=""
              />
              <div
                className="h-[66px] pt-3 pb-6 px-6 text-xs font-bold bg-slate-50 lg:text-lg
               lg:h-[118px] rounded-l-xl"
              >
                <h4>رکورد مسکن</h4>
                <h4 className="mt-1">فروشندگان در انتظار خریداران و...</h4>
              </div>
            </SwiperSlide>
            {/* END Box */}
          </Swiper>
        </div>
      </div>
    </>
  );
}
