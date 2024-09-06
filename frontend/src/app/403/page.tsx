import ErrorPage from "@/components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      icon="/icons/403-error.svg"
      title="ERROR 403"
      description="شما دسترسی کافی برای مشاهده این صفحه را ندارید."
    />
  );
}
