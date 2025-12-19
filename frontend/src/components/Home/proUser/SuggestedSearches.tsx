import { Title } from "@/components/ui/Title";
import { SuggestedSearchesDataType } from "@/Types";
import Link from "next/link";

type SuggestedSearchesType = {
  data: SuggestedSearchesDataType[];
};

export default function SuggestedSearches({ data }: SuggestedSearchesType) {
  return (
    <div className="mt-7 p-3 flex flex-col lg:mt-10">
      <Title title="جستجو های پیشنهادی" />

      <div
        className="mt-6 flex-wrap flex w-full text-xs text-[#505050]
       md:text-xl lg:text-2xl md:gap-5 lg:gap-7"
      >
        {data.map((item) => {
          return (
            <Link
              className="w-1/2 md:w-fit truncate cursor-pointer"
              key={item.id}
              href={"/"}
            >
              املاک در {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
