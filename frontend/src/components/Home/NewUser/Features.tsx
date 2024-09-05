"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";

export default function Features() {
  return (
    <div className="mt-7 p-3 flex flex-col lg:mt-10">
      {/* Title */}
      <h3 className="text-sm font-bold px-3 md:text-base lg:text-[32px]">
        سقفینو چطور به خانه دار شدن شما کمک میکند
      </h3>
      {/* END Title */}

      <div
        className="w-full flex flex-wrap p-3 justify-center md:justify-around
       lg:mt-6"
      >
        {/* Box */}
        <div
          className="w-[328px] h-[334px] bg-slate-100 p-4 mt-4 flex flex-col items-center
         border border-gray-200 rounded-xl md:w-[48%] lg:h-[511px]
          lg:rounded-2xl lg:w-[392px]"
        >
          <Image
            width={135}
            height={135}
            className="lg:w-[280px] lg:h-[145px]"
            src="/test/Illustration.svg"
            alt=""
          />
          <h3 className="mt-4 text-sm font-bold lg:mt-6 lg:text-xl">
            به آسانی یک خانه اجاره کنید
          </h3>
          <p className="mt-2 lg:mt-3 text-sm text-center lg:text-base">
            در میان صدها آگهی که روزانه به وبسایت سقفینو افزوده میشود، با
            استفاده از بیش از ۲۸ فیلتر کاربردی تلاش کرده ایم خانه ای که در
            جستجوی آن هستید را هر چه سریعتر پیدا و اجاره کنید.
          </p>
          {/* TODO Edit */}
          <Button
            className="bg-primary text-xs font-medium w-[156px] h-[32px] mt-12
             text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
          >
            اجاره خانه
          </Button>
        </div>
        {/* END Box */}
      </div>
    </div>
  );
}
