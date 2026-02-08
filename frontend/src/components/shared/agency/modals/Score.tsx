import CustomButton from "@/components/ui/CustomButton";
import { QueryKeys, Api } from "@/services/apiService";
import { AgencyActionsModalType, ScoreReasonsType } from "@/types";
import { Spinner } from "@heroui/spinner";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UserIcon from "../UserIcon";
import { TextError } from "@/components/ui/TextError";
import { useGetRequest, usePostRequest } from "@/hooks/useRequest";

type ScoreType = {
  data: AgencyActionsModalType;
  id: string | string[] | undefined;
  onClose: () => void;
};

type Inputs = {
  score: number;
  score_reason?: number;
  description: string;
};

export default function Score({ data, id, onClose }: ScoreType) {
  const { mutate, isPending } = usePostRequest<Inputs>({
    url: `${Api.Realtors}/${id}/comments`,
    key: "create-realtor-comment",
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

  const score = watch("score");
  const selectedReason = watch("score_reason");

  const { data: scoreReasonsData, isPending: scoreReasonPending } =
    useGetRequest<{ data: ScoreReasonsType[] }>({
      url: `${Api.GetAllScoreReasons}?score=${score}`,
      key: [QueryKeys.GET_ALL_SCORE_REASONS, String(score)],
    });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        if (res.msg === "done") {
          Success("امتیاز شما با موفقیت ثبت شد");
          onClose();
        } else {
          ErrorNotification("در ثبت امتیاز مشکلی پیش آمد");
        }
      },
    });
  };

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
          <CustomButton
            key={number}
            variant={number <= score ? "faded" : "bordered"}
            onPress={() => {
              setValue("score", number);
              setValue("score_reason", undefined);
            }}
            className="ml-2 border"
          >
            {number}
          </CustomButton>
        ))}
      </div>

      <p className="text-sm mt-4">لطفا دلیل این امتیاز را انتخاب کنید</p>

      {scoreReasonPending && (
        <div className="mt-3">
          <Spinner size="sm" color="danger" />
        </div>
      )}

      <Controller
        name="score_reason"
        control={control}
        rules={{ required: "لطفا دلیل امتیاز خود را انتخاب کنید" }}
        render={({ field: { onChange } }) => (
          <div className="flex w-full justify-between flex-wrap">
            {scoreReasonsData?.data?.map((item) => (
              <CustomButton
                key={item.id}
                variant={selectedReason === item.id ? "flat" : "bordered"}
                className="w-[48%] mt-3 border"
                radius="sm"
                onPress={() => onChange(item.id)}
              >
                {item.name}
              </CustomButton>
            ))}
          </div>
        )}
      />

      <TextError text={errors.score_reason?.message} />

      <textarea
        className="w-full p-3 text-sm resize-none h-28 border border-[#E1E1E1] mt-3 outline-none rounded md:text-base"
        placeholder="لطفا نظر خود را درباره این مشاور بنویسید."
        {...register("description", {
          required: "وارد کردن توضیحات ضرروری میباشد",
          maxLength: {
            value: 220,
            message: "وارد کردن بیشتر از 220 کاراکتر مجاز نمیباشد.",
          },
        })}
      />

      <TextError text={errors.description?.message} />

      <CustomButton
        className="mt-3 bg-primary text-white px-3 w-1/2"
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="white" size="sm" />}
      >
        {isPending ? "" : "ثبت امتیاز"}
      </CustomButton>
    </form>
  );
}
