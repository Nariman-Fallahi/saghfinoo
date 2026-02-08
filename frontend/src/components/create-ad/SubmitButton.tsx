import { Spinner } from "@heroui/spinner";
import CustomButton from "../ui/CustomButton";

type CreateAdSubmitButtonProps = {
  label?: string;
  isLoading?: boolean;
};

export default function CreateAdSubmitButton({
  label,
  isLoading,
}: CreateAdSubmitButtonProps) {
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
