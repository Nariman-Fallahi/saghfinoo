import Image from "next/image";
import { Title } from "@/constant/Constants";
import { useState } from "react";

type SearchBoxType = {
  title: string;
  setSearchCity: (value: string) => void;
};

export default function SearchBox({ title, setSearchCity }: SearchBoxType) {
  const [localValue, setLocalValue] = useState("");
  const [textErr, setTextErr] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (/^\d/.test(localValue)) {
        setTextErr("نام شهر نمیتواند با عدد شروع شود.");
      } else {
        setSearchCity(localValue);
      }
    }
  };

  return (
    <div className="mt-[82px] flex flex-col p-3 relative md:mt-[180px] md:px-8">
      <Title title={title} />

      <div
        className="flex items-center mt-4 border border-[#353535] p-2 rounded
       md:w-5/12 md:mt-8 md:border-[#ADADAD] justify-between"
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
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={localValue}
        />
        {localValue && (
          <i
            className="cursor-pointer"
            onClick={() => {
              setSearchCity("");
              setLocalValue("");
            }}
          >
            <Image
              width={18}
              height={18}
              className="md:w-5 md:h-5 lg:w-6 lg:h-6"
              src="/icons/close-circle.svg"
              alt=""
            />
          </i>
        )}
      </div>

      <p className="mt-2 text-xs text-red-500">{textErr}</p>
    </div>
  );
}
