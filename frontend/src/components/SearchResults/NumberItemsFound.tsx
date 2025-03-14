import { numberToPersian } from "@/constant/Constants";

export default function NumberItemsFound({ number }: { number: number }) {
  return (
    <p className="text-primary text-sm md:text-base">
      {numberToPersian(number)} مورد
    </p>
  );
}
