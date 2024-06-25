import Image from "next/image";

export default function RealEstate() {
  return (
    <div className="mt-7 p-3 flex flex-col items-center">
      {/* Title */}
      <h3 className="font-bold text-sm md:text-lg lg:text-[32px]">
        همه به شما مشاوره میدهند!
      </h3>
      <h4 className="text-xs mt-1 md:text-base lg:text-2xl lg:mt-4">
        اما در سقفینو مشاورین املاک کنار شما میمانند
      </h4>
      {/* END Title */}

      <div className="w-full flex p-3 flex-wrap mt-4 justify-between md:justify-around">
        {/* box */}
        <div
          className="w-[156px] px-3 py-4 flex flex-col items-center shadow
           rounded-xl bg-white mt-4 md:w-[25%] lg:w-[185px]"
        >
          <Image width={50} height={50} src="/test/Character.svg" alt="" />
          <span className="text-xs text-center mt-3 text-gray-700 lg:text-lg lg:mt-4">
            امکان خرید و اجاره ملک در اکثر نقاط کشور
          </span>
        </div>
        {/* END Box */}
      </div>
    </div>
  );
}
