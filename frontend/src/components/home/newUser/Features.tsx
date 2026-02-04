"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Title } from "@/components/ui/Title";
import { FeaturesDataNewUserHome } from "@/constant/featuresData";

export default function Features() {
  return (
    <div className="mt-7 p-3 flex flex-col lg:mt-10">
      <Title title={FeaturesDataNewUserHome.title} />

      <div
        className="w-full flex flex-wrap p-3 justify-center md:justify-around
       lg:mt-6"
      >
        {FeaturesDataNewUserHome.data.map((item) => {
          return (
            <div
              className="w-[328px] h-[334px] bg-slate-100 p-4 mt-4 flex flex-col items-center
               border border-gray-200 rounded-xl md:w-[48%] lg:h-[511px]
               lg:rounded-2xl lg:w-[392px]"
              key={item.id}
            >
              <Image
                width={135}
                height={135}
                className="lg:w-[280px] lg:h-[145px]"
                src={item.icon}
                alt=""
              />
              <h3 className="mt-4 text-sm font-bold lg:mt-6 lg:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 lg:mt-3 text-sm text-center lg:text-base">
                {item.description}
              </p>
              <Button
                className="bg-primary text-xs font-medium w-[156px] h-[32px] mt-12
               text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
              >
                {item.btnText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
