import ErrorPage from "@/components/ErrorPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسترسی غیر مجاز - 403",
  description: "شما دسترسی کافی برای مشاهده این صفحه را ندارید",
};

export default function Error403() {
  return (
    <ErrorPage
      icon="/icons/403-error.svg"
      title="ERROR 403"
      description="شما دسترسی کافی برای مشاهده این صفحه را ندارید."
    />
  );
}
