import Image from "next/image";
import { Button } from "@nextui-org/button";
import { isMobile } from "@/constant/Constants";
import { useEffect } from "react";
import { usePostRequest, useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { DataModalREA, ScoreReasonsType } from "@/types/Type";
import { Spinner } from "@nextui-org/spinner";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextError } from "@/constant/Constants";
import UserIcon from "./UserIcon";
import { CookieValueTypes } from "cookies-next";

type ScoreModalType = {
  data: DataModalREA;
  id: string | string[] | undefined;
  onClose: () => void;
  access: CookieValueTypes;
};

type Inputs = {
  score: number;
  score_reason: number | undefined;
  description: CookieValueTypes;
};

export default function ScoreModal({
  data,
  id,
  onClose,
  access,
}: ScoreModalType) {
  const {
    mutate,
    isPending,
    data: createRealtorsCommentData,
  } = usePostRequest<Inputs>({
    url: `${Api.CreateRealtorsComment}${id}`,
    key: "createRealtorsComment",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      score: 1,
      score_reason: undefined,
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  const { data: scoreReasonsData } = useGetRequest<{
    data: ScoreReasonsType[];
  }>({
    url: `${Api.GetAllScoreReasons}score=${watch("score")}`,
    key: ["getAllScoreReasons", JSON.stringify(watch("score"))],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center mt-4"
    >
      <UserIcon
        src={data.profileIcon || "/icons/profile-circle.svg"}
        userName={data.name}
      />

      <p className="mt-6 text-sm text-center">
        با ثبت امتیاز مشاور در بهبود فعالیت سایت به ما کمک کنید.
      </p>

      <div className="flex w-full justify-center mt-3 ltr mr-2">
        {[1, 2, 3, 4, 5].map((number) => (
          <Button
            key={number}
            size={isMobile ? "sm" : "md"}
            variant={number <= watch("score") ? "faded" : "bordered"}
            onPress={() => {
              setValue("score", number);
              setValue("score_reason", undefined);
            }}
            className="ml-2 border"
          >
            {number}
          </Button>
        ))}
      </div>

      <p className="text-sm mt-4">لطفا دلیل این امتیاز را انتخاب کنید</p>

      <div className="flex w-full justify-between flex-wrap">
        {scoreReasonsData?.data?.map((item) => (
          <Controller
            key={item.id}
            name="score_reason"
            control={control}
            rules={{
              required: "لطفا دلیل امتیاز خود را انتخاب کنید",
            }}
            render={({ field: { onChange } }) => (
              <Button
                variant={
                  watch("score_reason") === item.id ? "flat" : "bordered"
                }
                size={isMobile ? "sm" : "md"}
                className="w-[48%] mt-3 border"
                radius="sm"
                onPress={() => {
                  onChange(item.id);
                }}
              >
                {item.name}
              </Button>
            )}
          />
        ))}
      </div>

      <TextError text={errors.score_reason?.message} />

      <textarea
        className="w-full p-3 text-sm resize-none h-28 border border-[#E1E1E1] mt-3
           outline-none rounded md:text-base"
        placeholder="لطفا نظر خود را درباره این مشاور بنویسید."
        {...register("description", {
          required: "وارد کردن توضیحات ضرروری میباشد",
          maxLength: {
            value: 220,
            message: "وارد کردن بیشتر از 220 کاراکتر مجاز نمیباشد.",
          },
        })}
      ></textarea>

      <TextError text={errors.description?.message} />

      <Button
        className="mt-3 bg-[#CB1B1B] text-white px-3 w-1/2"
        size={isMobile ? "sm" : "md"}
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="white" size="sm" />}
      >
        {isPending ? "" : "ثبت امتیاز"}
      </Button>
    </form>
  );
}
