import Image from "next/image";
import { Button } from "@nextui-org/button";
import { isMobile, ScoreReasonData } from "@/constant/Constants";
import { useState, Fragment, useEffect } from "react";
import { usePostRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { getCookie } from "cookies-next";
import { DataModalREA } from "@/types/Type";
import { Spinner } from "@nextui-org/spinner";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import { useCallback } from "react";

type ScoreModalType = {
  data: DataModalREA;
  id: string | string[] | undefined;
  onClose: () => void;
};

type ScoreBtnType = {
  number: 1 | 2 | 3 | 4 | 5;
  scoreValue: number;
  setScoreValue: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5>>;
  setScoreReasonValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function ScoreModal({ data, id, onClose }: ScoreModalType) {
  const [scoreValue, setScoreValue] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [scoreReasonValue, setScoreReasonValue] = useState<string | undefined>(
    undefined
  );
  const [commentText, setCommentText] = useState<string | undefined>(undefined);
  const [textErr, setTextErr] = useState<string | null>(null);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const access = getCookie("access");

  const {
    mutate,
    isPending,
    data: createRealtorsCommentData,
  } = usePostRequest<{
    score: number;
    description: string;
  }>({
    url: `${Api.CreateRealtorsComment}${id}`,
    key: "createRealtorsComment",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const ScoreBtn = useCallback(
    ({
      number,
      scoreValue,
      setScoreValue,
      setScoreReasonValue,
    }: ScoreBtnType) => {
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
    },
    []
  );

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

  // const isDisabled = !commentText || !scoreReasonValue || !commentText;
  useEffect(() => {
    if (!commentText || !scoreReasonValue || textErr) {
      setIsActiveBtn(false);
    } else {
      setIsActiveBtn(true);
    }
  }, [commentText, scoreReasonValue, textErr]);

  const handleCreateScore = () => {
    if (commentText) {
      mutate({
        score: scoreValue,
        description: commentText,
      });
    }
  };

  useEffect(() => {
    if (createRealtorsCommentData && createRealtorsCommentData.msg === "done") {
      Success("امتیاز شما با موفقیت ثبت شد");
      onClose();
    } else if (
      createRealtorsCommentData &&
      createRealtorsCommentData.msg !== "done"
    ) {
      ErrorNotification("در ثبت امتیاز مشکلی پیش آمد");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRealtorsCommentData]);

  useEffect(() => {
    if (commentText && commentText?.length > 220) {
      setTextErr("وارد کردن بیشتر از 220 کاراکتر مجاز نمیباشد.");
    } else {
      setTextErr(null);
    }
  }, [commentText]);

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <Image
        width={87}
        height={87}
        src={data.profileIcon ? data.profileIcon : "/icons/profile-circle.svg"}
        alt=""
        className="rounded-full"
      />

      <h3 className="mt-3 font-bold">{data.name}</h3>

      <p className="mt-6 text-sm text-center">
        با ثبت امتیاز مشاور در بهبود فعالیت سایت به ما کمک کنید.
      </p>

      <div className="flex w-full justify-center mt-3 ltr mr-2">
        <ScoreBtn
          number={1}
          scoreValue={scoreValue}
          setScoreValue={setScoreValue}
          setScoreReasonValue={setScoreReasonValue}
        />
        <ScoreBtn
          number={2}
          scoreValue={scoreValue}
          setScoreValue={setScoreValue}
          setScoreReasonValue={setScoreReasonValue}
        />
        <ScoreBtn
          number={3}
          scoreValue={scoreValue}
          setScoreValue={setScoreValue}
          setScoreReasonValue={setScoreReasonValue}
        />
        <ScoreBtn
          number={4}
          scoreValue={scoreValue}
          setScoreValue={setScoreValue}
          setScoreReasonValue={setScoreReasonValue}
        />
        <ScoreBtn
          number={5}
          scoreValue={scoreValue}
          setScoreValue={setScoreValue}
          setScoreReasonValue={setScoreReasonValue}
        />
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

      <p className="w-full text-red-500 text-xs mt-2">{textErr}</p>

      <Button
        className="mt-3 bg-[#CB1B1B] text-white px-3 w-1/2"
        size={isMobile ? "sm" : "md"}
        isDisabled={!isActiveBtn}
        onClick={handleCreateScore}
        isLoading={isPending}
        spinner={<Spinner color="white" size="sm" />}
      >
        {isPending ? "" : "ثبت امتیاز"}
      </Button>
    </div>
  );
}
