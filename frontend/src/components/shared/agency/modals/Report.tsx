import {
  AgencyActionsModalType,
  AgencyEntityType,
  ReportModaltDataType,
} from "@/types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UserIcon from "../UserIcon";
import { Api, QueryKeys } from "@/services/apiService";
import CustomButton from "@/components/ui/CustomButton";
import { Spinner } from "@heroui/spinner";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import { TextError } from "@/components/ui/TextError";
import { useGetRequest, usePostRequest } from "@/hooks/useRequest";

type Inputs = {
  report_reason: number;
  description: string;
};

interface ReportType {
  data: AgencyActionsModalType;
  realatorId?: string;
  onClose: () => void;
  page: AgencyEntityType;
}

export default function Report({
  data,
  realatorId,
  onClose,
  page,
}: ReportType) {
  const targetId = realatorId || "";
  const isRealEstate = page === "realEstate";

  const fetchReasonsUrl = isRealEstate
    ? `${Api.Reos}/${targetId}/report/reasons`
    : Api.GetAllReportReasonsRealtors;

  const submitReportUrl = isRealEstate
    ? `${Api.CreateReportRealEstate}${targetId}`
    : `${Api.Realtors}/${targetId}/report`;

  const { data: reportReasonsData, isPending: reportReasonsPending } =
    useGetRequest<{ data: ReportModaltDataType[] }>({
      url: fetchReasonsUrl,
      key: [QueryKeys.GET_REPORT_DATA, page, targetId],
    });

  const { mutate, isPending: isSubmitPending } = usePostRequest({
    url: submitReportUrl,
    key: QueryKeys.CREATE_REPORT,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const selectedReason = watch("report_reason");

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        if (res.msg === "done") {
          Success("گزارش شما با موفقیت ارسال شد");
          onClose();
        } else {
          ErrorNotification("در ارسال گزارش مشکلی پیش آمد");
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center mt-3"
    >
      <UserIcon
        src={data.profileIcon || "/icons/ui/profile-circle.svg"}
        userName={data.name}
      />

      <p className="text-sm mt-4">لطفا دلیل گزارش خود را انتخاب کنید</p>

      <Controller
        name="report_reason"
        control={control}
        rules={{ required: "لطفا دلیل گزارش خود را انتخاب کنید" }}
        render={({ field: { onChange } }) => (
          <div className="flex w-full justify-between flex-wrap mt-4">
            {reportReasonsPending && (
              <div className="mt-3 w-full flex justify-center">
                <Spinner size="sm" color="danger" />
              </div>
            )}

            {reportReasonsData?.data?.map((item) => (
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

      <TextError text={errors.report_reason?.message} />

      <div className="w-full mt-3">
        <textarea
          className="w-full p-3 text-sm resize-none h-28 border border-[#E1E1E1] mt-3 outline-hidden rounded-sm md:text-base"
          placeholder="لطفا گزارش خود را به صورت کامل بنویسید."
          {...register("description", {
            required: "وارد کردن توضیحات گزارش ضرروری میباشد",
            maxLength: {
              value: 220,
              message: "وارد کردن بیشتر از 220 کاراکتر مجاز نمیباشد.",
            },
          })}
        />
      </div>

      <TextError text={errors.description?.message} />

      <CustomButton
        className="mt-5 bg-primary text-white px-3 w-1/2"
        type="submit"
        isLoading={isSubmitPending}
        spinner={<Spinner color="white" size="sm" />}
      >
        {isSubmitPending ? "" : "ثبت امتیاز"}
      </CustomButton>
    </form>
  );
}
