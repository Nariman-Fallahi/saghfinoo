"use client";
import { useRouter } from "@bprogress/next/app";
import CustomButton from "./ui/CustomButton";

export default function BackToHomeButton() {
  const router = useRouter();

  return (
    <CustomButton
      className="bg-primary text-white md:px-8"
      radius="sm"
      onPress={() => router.push("/")}
    >
      بازگشت به صفحه اصلی
    </CustomButton>
  );
}
