import { Spinner } from "@heroui/spinner";
import CustomButton from "../CustomButton";

type BtnSubmitType = {
  label?: string;
  isLoading?: boolean;
};

export default function BtnSubmit({ label, isLoading }: BtnSubmitType) {
  return (
    <div className="w-full grid md:col-span-2 justify-center mt-8">
      <CustomButton
        type="submit"
        radius="sm"
        className="bg-primary text-white"
        isLoading={isLoading}
        spinner={<Spinner color="danger" size="sm" />}
      >
        {label || "ادامه"}
      </CustomButton>
    </div>
  );
}
