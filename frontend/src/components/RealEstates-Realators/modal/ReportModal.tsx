import { DataModalREA, ReportModaltDataType } from "@/types/Type";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UserIcon from "./UserIcon";
import { Api, dataKey, useGetRequest, usePostRequest } from "@/ApiService";
import CustomButton from "@/components/CustomButton";
import { CookieValueTypes } from "cookies-next";
import { Spinner } from "@heroui/spinner";
import { TextError } from "@/constant/Constants";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import { useEffect } from "react";

type ReportModalType = {
  data: DataModalREA;
  id: string | string[] | undefined;
  onClose: () => void;
  page: "realEstate" | "realator";
  access: CookieValueTypes;
};

type Inputs = {
  report_reason: number;
  description: string;
};

export default function ReportModal({
  data,
  id,
  onClose,
  page,
  access,
}: ReportModalType) {
  const { data: reportReasonsData, isPending: reportReasonsPending } =
    useGetRequest<{
      data: ReportModaltDataType[];
    }>({
      url:
        page === "realEstate"
          ? `${Api.Reos}/${id}/report/reasons`
          : Api.GetAllReportReasonsRealtors,
      key: [dataKey.GET_REPORT_DATA],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  const {
    mutate,
    isPending,
    data: reportRealEstateData,
  } = usePostRequest({
    url:
      page === "realEstate"
        ? `${Api.CreateReportRealEstate}${id}`
        : `${Api.Realtors}/{id}/report`,
    key: dataKey.CREATE_REPORT,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (reportRealEstateData) {
      if (reportRealEstateData.msg === "done") {
        onClose();
        Success("گزارش شما با موفقیت ارسال شد");
      } else {
        ErrorNotification("در ارسال گزارش مشکلی پیش آمد");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportRealEstateData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center mt-3"
    >
      <UserIcon
        src={data.profileIcon || "/icons/profile-circle.svg"}
        userName={data.name}
      />

      <p className="text-sm mt-4">لطفا دلیل گزارش خود را انتخاب کنید</p>

      <div className="flex w-full justify-between flex-wrap mt-4">
        {reportReasonsPending && (
          <div className="mt-3 w-full flex justify-center">
            <Spinner size="sm" color="danger" />
          </div>
        )}

        {reportReasonsData?.data?.map((item) => (
          <Controller
            key={item.id}
            name="report_reason"
            control={control}
            rules={{
              required: "لطفا دلیل گزارش خود را انتخاب کنید",
            }}
            render={({ field: { onChange } }) => (
              <CustomButton
                variant={
                  watch("report_reason") === item.id ? "flat" : "bordered"
                }
                className="w-[48%] mt-3 border"
                radius="sm"
                onPress={() => {
                  onChange(item.id);
                }}
              >
                {item.name}
              </CustomButton>
            )}
          />
        ))}
      </div>

      <TextError text={errors.report_reason?.message} />

      <div className="w-full mt-3">
        <textarea
          className="w-full p-3 text-sm resize-none h-28 border border-[#E1E1E1] mt-3
           outline-none rounded md:text-base"
          placeholder="لطفا گزارش خود را به صورت کامل بنویسید."
          {...register("description", {
            required: "وارد کردن توضیحات گزارش ضرروری میباشد",
            maxLength: {
              value: 220,
              message: "وارد کردن بیشتر از 220 کاراکتر مجاز نمیباشد.",
            },
          })}
        ></textarea>
      </div>

      <TextError text={errors.description?.message} />

      <CustomButton
        className="mt-5 bg-primary text-white px-3 w-1/2"
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="white" size="sm" />}
      >
        {isPending ? "" : "ثبت امتیاز"}
      </CustomButton>
    </form>
  );
}
