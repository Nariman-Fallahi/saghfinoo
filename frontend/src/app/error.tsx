"use client";

import BackToHomeButton from "@/components/BackToHomeButton";
import ErrorDisplay from "@/components/ErrorDisplay";
import CustomButton from "@/components/ui/CustomButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorDisplay
      icon="/icons/403-error.svg"
      title="ERROR 403"
      description="شما دسترسی کافی برای مشاهده این صفحه را ندارید."
    >
      <div className="grid grid-cols-2 gap-6">
        <BackToHomeButton />
        <CustomButton radius="sm" onPress={() => reset()}>
          تلاش دوباره
        </CustomButton>
      </div>
    </ErrorDisplay>
  );
}
