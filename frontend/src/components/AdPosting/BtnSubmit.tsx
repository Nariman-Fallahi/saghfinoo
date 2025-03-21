import CustomButton from "../CustomButton";

type BtnSubmitType = {
  label?: string;
};

export default function BtnSubmit({ label }: BtnSubmitType) {
  return (
    <div className="w-full grid md:col-span-2 justify-center mt-8">
      <CustomButton type="submit" radius="sm" className="bg-primary text-white">
        {label || "ادامه"}
      </CustomButton>
    </div>
  );
}
