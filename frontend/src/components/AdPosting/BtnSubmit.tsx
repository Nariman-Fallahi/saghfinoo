import { Button } from "@nextui-org/button";
import { isMobile } from "@/constant/Constants";

type BtnSubmitType = {
  label?: string;
};

export default function BtnSubmit({ label }: BtnSubmitType) {
  return (
    <div className="w-full flex justify-center mt-8">
      <Button
        type="submit"
        size={isMobile ? "sm" : "md"}
        radius="sm"
        className="bg-[#CB1B1B] text-white"
      >
        {label ? label : "ادامه"}
      </Button>
    </div>
  );
}
