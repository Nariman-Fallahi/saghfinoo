"use client";
import Image from "next/image";

type StepperType = {
  count: number;
  activeStep: number;
};

export default function Stepper({ count, activeStep }: StepperType) {
  return (
    <ol className="flex items-center w-full justify-center">
      {Array.from({ length: count }, (_, i) => (
        <li
          key={i}
          className={`flex w-full items-center ${
            i < activeStep ? "text-[#F66262]" : "text-gray-500"
          } ${
            i < count - 1
              ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-" +
                (i < activeStep - 1 ? "[#F66262]" : "gray-500") +
                " after:border-4 after:inline-block"
              : ""
          }`}
        >
          <span
            className={`flex items-center justify-center w-8 h-8 ${
              i < activeStep ? "bg-[#F66262]" : "bg-gray-200"
            } rounded-full lg:h-12 lg:w-12 shrink-0`}
          >
            {i < activeStep - 1 && (
              <Image width={17} height={17} src="/icons/tick.svg" alt="" />
            )}
            {i === activeStep - 1 && (
              <Image width={18} height={18} src="/icons/Eliipse.svg" alt="" />
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
