import { Button } from "@nextui-org/button";
import { SetStateAction } from "react";

type ViewMoreBtnType = {
  hasMore: boolean;
  setButtonActive: (value: boolean) => void;
  setPageNumber: (value: SetStateAction<number>) => void;
};

export default function ViewMoreBtn({
  hasMore,
  setButtonActive,
  setPageNumber,
}: ViewMoreBtnType) {
  return (
    <div className="w-full flex justify-center">
      <Button
        onClick={() =>
          hasMore ? setPageNumber((old) => old + 1) : setButtonActive(false)
        }
        className="bg-[#CB1B1B] text-xs font-medium w-[156px] h-[32px] mt-12
           text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
      >
        مشاهده بیشتر
      </Button>
    </div>
  );
}
