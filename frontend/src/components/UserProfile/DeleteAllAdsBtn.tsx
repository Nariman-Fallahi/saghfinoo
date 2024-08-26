import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useSizeBtn } from "@/store/Size";

type DeleteAllAdsBtnType = {
  onPress: () => void;
};

export default function DeleteAllAdsBtn({onPress} : DeleteAllAdsBtnType) {
  const { sizeBtn } = useSizeBtn();
  return (
    <div className="flex w-full justify-start mt-3">
      <Button
        variant="light"
        size={sizeBtn}
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
      </Button>
    </div>
  );
}
