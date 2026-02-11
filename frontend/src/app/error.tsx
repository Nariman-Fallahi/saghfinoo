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
    <div className="h-screen w-full flex justify-center items-center">
      <ErrorDisplay
        icon="/icons/errors/submission-error.svg"
        title="ERROR 500"
        description="خطای داخلی سرور رخ داده است. در صورت تداوم، با پشتیبانی تماس بگیرید."
      >
        <div className="grid grid-cols-2 gap-6">
          <BackToHomeButton />
          <CustomButton radius="sm" onPress={() => reset()}>
            تلاش دوباره
          </CustomButton>
        </div>
      </ErrorDisplay>
    </div>
  );
}
