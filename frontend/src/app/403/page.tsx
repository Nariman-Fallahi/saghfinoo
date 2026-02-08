import BackToHomeButton from "@/components/BackToHomeButton";
import ErrorDisplay from "@/components/ErrorDisplay";
import { SITE_METADATA } from "@/constant/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_METADATA.forbidden.title,
  description: SITE_METADATA.forbidden.description,
};

export default function Error403() {
  return (
    <ErrorDisplay
      icon="/icons/errors/403-error.svg"
      title="ERROR 403"
      description="شما دسترسی کافی برای مشاهده این صفحه را ندارید."
    >
      <BackToHomeButton />
    </ErrorDisplay>
  );
}
