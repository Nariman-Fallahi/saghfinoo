"use client";
import { useRouter } from "next-nprogress-bar";
import CustomButton from "./CustomButton";

export default function BackToHomeButton() {
  const router = useRouter();

  return (
    <CustomButton
      className="bg-primary text-white mt-5 md:px-8"
      radius="sm"
      onPress={() => router.push("/")}
    >
      بازگشت به صفحه اصلی
    </CustomButton>
  );
}
