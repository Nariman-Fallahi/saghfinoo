import Image from "next/image";
import { Button } from "@nextui-org/button";
import { isMobile, ScoreReasonData } from "@/constant/Constants";
import { useState, ChangeEvent, Fragment } from "react";

export default function ScoreModal() {
  const [scoreValue, setScoreValue] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [scoreReasonValue, setScoreReasonValue] = useState<string | undefined>(
    undefined
  );
  const [commentText, setCommentText] = useState<string | undefined>(undefined);

  const scoreBtn = (number: 1 | 2 | 3 | 4 | 5) => {
    return (
      <Button
        size={isMobile ? "sm" : "md"}
        variant={number <= scoreValue ? "faded" : "bordered"}
        onPress={() => {
          setScoreValue(number);
          setScoreReasonValue(undefined);
        }}
        className="ml-2 border"
      >
        {number}
      </Button>
    );
  };

  const scoreReasonBtn = (value: string) => {
    return (
      <Button
        variant={scoreReasonValue === value ? "flat" : "bordered"}
        size={isMobile ? "sm" : "md"}
        className="w-[48%] mt-3 border"
        radius="sm"
        onPress={() => setScoreReasonValue(value)}
      >
        {value}
      </Button>
    );
  };

  const isDisabled = !commentText || !scoreReasonValue;

  //TODO: Add Api

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <Image
        width={87}
        height={87}
        src="/icons/Banner.png"
        alt=""
        className="rounded-full"
      />

      <h3 className="mt-3 font-bold">علی رضاسیی</h3>

      <p className="mt-6 text-sm">
        با ثبت امتیاز مشاور در بهبود فعالیت سایت به ما کمک کنید.
      </p>

      <div className="flex w-full justify-center mt-3 ltr mr-2">
        {scoreBtn(1)}
        {scoreBtn(2)}
        {scoreBtn(3)}
        {scoreBtn(4)}
        {scoreBtn(5)}
      </div>

      <p className="text-sm mt-4">لطفا دلیل این امتیاز را انتخاب کنید</p>

      <div className="flex w-full justify-between flex-wrap">
        {scoreValue === 1 &&
          ScoreReasonData.reasonsForWeak.map((item, index) => {
            return <Fragment key={index}>{scoreReasonBtn(item)}</Fragment>;
          })}

        {scoreValue === 2 &&
          ScoreReasonData.reasonsForWeak.map((item, index) => {
            return <Fragment key={index}>{scoreReasonBtn(item)}</Fragment>;
          })}

        {scoreValue === 3 &&
          ScoreReasonData.reasonsForAverage.map((item, index) => {
            return <Fragment key={index}>{scoreReasonBtn(item)}</Fragment>;
          })}

        {scoreValue === 4 &&
          ScoreReasonData.reasonsForExcellent.map((item, index) => {
            return <Fragment key={index}>{scoreReasonBtn(item)}</Fragment>;
          })}

        {scoreValue === 5 &&
          ScoreReasonData.reasonsForExcellent.map((item, index) => {
            return <Fragment key={index}>{scoreReasonBtn(item)}</Fragment>;
          })}
      </div>

      <textarea
        className="w-full p-3 text-sm resize-none h-28 border border-[#E1E1E1] mt-3
           outline-none rounded md:text-base"
        placeholder="لطفا نظر خود را درباره این مشاور بنویسید."
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>

      <Button
        className="mt-3 bg-[#CB1B1B] text-white px-3 w-1/2"
        size={isMobile ? "sm" : "md"}
        isDisabled={isDisabled}
      >
        ثبت امتیاز
      </Button>
    </div>
  );
}
