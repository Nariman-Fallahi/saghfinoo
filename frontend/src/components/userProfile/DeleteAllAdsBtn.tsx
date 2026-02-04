import Image from "next/image";
import CustomButton from "../CustomButton";

type DeleteAllAdsBtnType = {
  onPress: () => void;
};

export default function DeleteAllAdsBtn({ onPress }: DeleteAllAdsBtnType) {
  return (
    <div className="flex w-full justify-start mt-3">
      <CustomButton
        variant="light"
        radius="sm"
        className="flex items-center"
        onPress={onPress}
      >
        <i>
          <Image
            width={20}
            height={20}
            src="/icons/trash-black.svg"
            alt="Trash All"
          />
        </i>
        <span className="mr-1 text-xs md:text-sm lg:text-base cursor-pointer">
          پاک کردن تمام آگهی ها
        </span>
      </CustomButton>
    </div>
  );
}
