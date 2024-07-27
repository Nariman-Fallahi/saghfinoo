import Image from "next/image";

export default function Stepper() {
  return (
    <ol className="flex items-center w-full justify-center">
      <li className="flex w-full items-center text-[#F66262] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F66262] after:border-4 after:inline-block">
        <span className="flex items-center justify-center w-10 h-10 bg-[#F66262] rounded-full lg:h-12 lg:w-12 shrink-0">
          <Image width={17} height={17} src="/icons/tick.svg" alt="" />
        </span>
      </li>

      <li className="flex w-full items-center text-[#F66262] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F66262] after:border-4 after:inline-block">
        <span className="flex items-center justify-center w-10 h-10 bg-[#F66262] rounded-full lg:h-12 lg:w-12 shrink-0">
          <Image width={17} height={17} src="/icons/tick.svg" alt="" />
        </span>
      </li>

      <li className="flex w-full items-center text-[#F66262] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F66262] after:border-4 after:inline-block">
        <span className="flex items-center justify-center w-10 h-10 bg-[#F66262] rounded-full lg:h-12 lg:w-12 shrink-0">
          <Image width={17} height={17} src="/icons/tick.svg" alt="" />
        </span>
      </li>

      <li className="flex w-full items-center text-[#F66262] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F66262] after:border-4 after:inline-block">
        <span className="flex items-center justify-center w-10 h-10 bg-[#F66262] rounded-full lg:h-12 lg:w-12 shrink-0">
          <Image width={17} height={17} src="/icons/tick.svg" alt="" />
        </span>
      </li>

      <li className="flex w-full items-center text-[#F66262] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#F66262] after:border-4 after:inline-block">
        <span className="flex items-center justify-center w-10 h-10 bg-[#F66262] rounded-full lg:h-12 lg:w-12 shrink-0">
          <Image width={17} height={17} src="/icons/tick.svg" alt="" />
        </span>
      </li>
      <li className="flex items-center">
        <span className="flex items-center justify-center w-10 h-10 bg-[#F66262] rounded-full lg:h-12 lg:w-12 shrink-0">
          <Image width={17} height={17} src="/icons/tick.svg" alt="" />
        </span>
      </li>
    </ol>
  );
}
