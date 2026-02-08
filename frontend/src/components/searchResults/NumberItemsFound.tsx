import { numberToPersian } from "@/utils/numberToPersian";

interface Props {
  number: number;
  isLoading?: boolean;
}

export default function NumberItemsFound({ number, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-[4px] md:h-6 md:w-20" />
    );
  }

  return (
    <p className="text-primary text-sm md:text-base font-medium">
      {numberToPersian(number)} مورد
    </p>
  );
}
