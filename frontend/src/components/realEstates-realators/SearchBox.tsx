import Image from "next/image";
import {Title} from "@/constant/Constants";

type SearchBoxType = {
  title: string;
};

export default function SearchBox({ title }: SearchBoxType) {
  return (
    <div className="mt-[82px] flex flex-col p-3 relative md:mt-[180px] md:px-8">
      {/* <h3 className="text-sm font-bold md:text-lg lg:text-[32px]">{title}</h3> */}
      <Title title={title} />

      <div
        className="flex items-center mt-4 border border-[#353535] p-2 rounded
     md:w-5/12 md:mt-8 md:border-[#ADADAD]"
      >
        <Image
          width={16}
          height={16}
          src="/icons/search-normal.svg"
          alt=""
          className="lg:w-6 lg:h-6"
        />
        <input
          className="mr-2 text-xs font-normal md:text-base outline-none w-full"
          type="text"
          placeholder="شهر مورد نظر را جستجو کنید."
        />
      </div>
    </div>
  );
}
