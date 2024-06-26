import Image from "next/image";

export default function SearchBox() {
  return (
    <div
      className="mt-[57px] md:mt-0 bg-search flex flex-col items-center p-5
     bg-center bg-cover pb-10 lg:h-screen"
    >
      <h2
        className="text-white font-bold text-base md:mt-32 md:text-xl lg:text-[56px]
       lg:mt-52"
      >
        سقفینو سقفی برای همه
      </h2>
      <h4
        className="font-bold text-xs text-white text-center mt-1 md:mt-3
       md:text-base lg:text-[32px] lg:mt-9"
      >
        آسانی و سرعت در پیدا کردن یک سقف تازه را در سقفینو تجربه کنید.
      </h4>

      <div
        className="w-full bg-white shadow rounded-lg flex flex-col p-3 mt-8
       md:w-[70%] lg:mt-16"
      >
        <div className="flex items-center">
          <div
            className="w-1/2 border-b border-b-gray-300 text-center pb-1
            text-sm font-normal md:text-base cursor-pointer hover:text-red-500
             lg:text-2xl lg:font-medium"
          >
            اجاره
          </div>
          <div
            className="w-1/2 border-b border-b-gray-300 text-center pb-1
            text-sm font-normal md:text-base cursor-pointer hover:text-red-500
             lg:text-2xl lg:font-medium"
          >
            خرید
          </div>
        </div>

        <div className="flex items-center mt-2 md:mt-3">
          <Image
            width={16}
            height={16}
            src="/icons/search-normal.svg"
            alt=""
            className="lg:w-6 lg:h-6"
          />
          <input
            className="mr-2 text-sm font-normal md:text-base outline-none w-full
             lg:text-lg"
            type="text"
            placeholder="شهر مورد نظر را جستجو کنید."
          />
        </div>
      </div>
    </div>
  );
}
