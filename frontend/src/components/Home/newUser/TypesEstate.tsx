import Image from "next/image";
import { TypesEstateDataNewUserHome } from "@/constant/Constants";
import { Title } from "@/constant/Constants";
import { numberToPersian } from "@/constant/Constants";

export default function TypesEstate() {
  return (
    <div className="mt-7 p-3 flex flex-col">
      <Title title={TypesEstateDataNewUserHome.title} />

      <div className="flex w-full flex-wrap p-3 justify-between lg:mt-6">
        {TypesEstateDataNewUserHome.data.map((item) => {
          return (
            <div
              className="flex flex-col items-center w-[48%] bg-slate-50
               rounded-lg border border-gray-200 pb-2 mt-4 md:w-[24%]"
              key={item.id}
            >
              <Image
                className="w-full rounded-t-lg"
                width={100}
                height={100}
                src={item.image}
                alt=""
                sizes="(min-width: 1024px) 100%"
              />
              <h2 className="mt-3 font-bold text-base lg:text-xl">
                {numberToPersian(item.number)}
              </h2>
              <span className="mt-1 font-normal text-sm lg:text-base">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
