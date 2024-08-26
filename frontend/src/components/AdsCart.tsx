import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import S_Ads from "@/skeleton/S_Ads";

export default function AdsCart() {
  const [isloading, setIsloading] = useState<boolean>(false);

  return (
    <div className="flex flex-wrap justify-between w-full">
      {isloading ? (
        <S_Ads />
      ) : (
        <div
          className="w-[156px] h-fit flex flex-col border border-[#E1E1E1]
           rounded-lg mt-4 md:w-[350px] md:rounded-2xl"
        >
          <Image
            width={100}
            height={100}
            className="w-full h-[110px] rounded-tl-lg rounded-tr-lg md:h-1/2"
            sizes="(min-width: 768px) 100%, 50%"
            src="/image/Bg-SearchBox.webp"
            alt=""
          />

          <div className="flex flex-col p-2 md:p-3">
            <div className="flex w-full justify-between items-center">
              <p className="text-xs text-[#909090] md:text-base">ggggg</p>
              <Button size="sm" radius="full" isIconOnly variant="light">
                <Image
                  width={16}
                  height={16}
                  src="/icons/save.svg"
                  className="md:w-6 md:h-6"
                  sizes="(min-width: 768px) 24px, 24px"
                  alt=""
                />
              </Button>
            </div>

            <p className="mt-1 text-xs md:text-base truncate">ffffffff</p>
            <p className="mt-1 text-xs font-bold md:text-base truncate">
              fffff
            </p>
            <p className="mt-1 text-xs font-bold md:text-base truncate">fff</p>
          </div>
        </div>
      )}
    </div>
  );
}
