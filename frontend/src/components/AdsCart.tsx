import Image from "next/image";
import { Button } from "@nextui-org/button";
import "react-loading-skeleton/dist/skeleton.css";
import S_Ads from "@/skeleton/S_Ads";
import { AdsDataType } from "@/types/Type";

type AdsCartType = {
  isloading: boolean;
  data: AdsDataType[] | undefined;
};

export default function AdsCart({ data, isloading }: AdsCartType) {
  return (
    <div className="flex flex-wrap justify-between w-full gap-2">
      {isloading ? (
        <S_Ads />
      ) : (
        data?.map((item) => {
          return (
            <div
              key={item.id}
              className="w-[48%] h-fit flex flex-col border border-[#E1E1E1]
             rounded-lg mt-6 lg:mt-8 md:w-[30%] md:rounded-2xl"
            >
              <Image
                width={100}
                height={100}
                className="w-full h-[100px] rounded-tl-lg rounded-tr-lg md:h-1/2"
                sizes="(min-width: 768px) 100%, 50%"
                src={item.imageFullPath || "/icons/noneImage.svg"}
                alt="Ads Image"
              />

              <div className="flex flex-col p-2 md:p-3">
                <div className="flex w-full justify-between items-center">
                  <p className="text-xs text-[#909090] md:text-base">
                    {`${item.typeOfTransaction} ${item.propertyType}`}
                  </p>
                  <Button size="sm" radius="full" isIconOnly variant="light">
                    <i>
                      <Image
                        width={16}
                        height={16}
                        src="/icons/save.svg"
                        className="md:w-6 md:h-6"
                        sizes="(min-width: 768px) 24px, 24px"
                        alt=""
                      />
                    </i>
                  </Button>
                </div>

                <p className="mt-1 text-xs md:text-base truncate">
                  {`${item.city} ${item.mainStreet}`}
                </p>
                <p className="mt-1 text-xs font-bold md:text-base truncate">
                  {item.rent !== 0 ? `${item.rent} تومان رهن` : "رهن ندارد"}
                </p>
                <p className="mt-1 text-xs font-bold md:text-base truncate">
                  {item.deposit !== 0
                    ? `${item.deposit} تومان اجاره`
                    : "اجاره ندارد"}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
