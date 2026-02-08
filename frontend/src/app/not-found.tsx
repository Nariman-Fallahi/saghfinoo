import BackToHomeButton from "@/components/BackToHomeButton";
import ErrorDisplay from "@/components/ErrorDisplay";

export default function Not_found() {
  return (
    <ErrorDisplay
      icon="/icons/errors/not-found.svg"
      title="صفحه مورد نظر گم شده !"
      description="املاک به سرعت در حال خرید و فروش و اجاره اند، از صفحه اصلی گزینه مورد نظر را جست و جو کنید."
    >
      <BackToHomeButton />
    </ErrorDisplay>
  );
}
