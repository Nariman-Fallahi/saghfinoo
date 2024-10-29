import { Title } from "@/constant/Constants";
import Image from "next/image";

type ServicesType = {
  title: string;
  subtitle: string;
  data: {
    id: number;
    icon: string;
    text: string;
  }[];
};

export default function Services({ title, subtitle, data }: ServicesType) {
  return (
    <div className="mt-7 p-3 flex flex-col items-center">
      <Title title={title} />

      <h4 className="text-xs mt-1 md:text-base lg:text-2xl lg:mt-6">
        {subtitle}
      </h4>

      <div className="w-full flex p-3 flex-wrap mt-4 justify-between md:justify-around">
        {data.map((item) => {
          return (
            <div
              className="w-[156px] px-3 py-4 flex flex-col items-center shadow
               rounded-xl bg-white mt-4 md:w-[25%] lg:w-[185px]"
              key={item.id}
            >
              <Image
                width={60}
                height={80}
                src={item.icon}
                alt=""
                className="h-[80px] md:w-16 md:h-16 lg:w-24 lg:h-24"
              />
              <span
                className="text-xs text-center mt-3 text-gray-700
               lg:text-lg lg:mt-4 cursor-default"
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
