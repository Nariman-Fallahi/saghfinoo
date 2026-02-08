import { Control, Controller, UseFormWatch } from "react-hook-form";
import { FilterDataType } from "@/types";
import { SelectTitle } from "../ui/SelectTitle";
import CustomButton from "../ui/CustomButton";

const OPTIONS = {
  basic: ["هرتعداد", "ندارد", "1", "2", "3", "4", "+5"],
  toiletType: ["مهم نیست", "ایرانی", "فرنگی", "هردو"],
  floors: ["مهم نیست", "همکف", "1", "2", "3", "+4"]
};

const ITEMS: { name: keyof FilterDataType; label: string; opt: keyof typeof OPTIONS }[] = [
  { name: "numberOfBedroom", label: "اتاق خواب", opt: "basic" },
  { name: "numberOfParking", label: "پارکینگ", opt: "basic" },
  { name: "numberOfStorageRoom", label: "انباری", opt: "basic" },
  { name: "numberOfElevators", label: "آسانسور", opt: "basic" },
  { name: "numberOfRestrooms", label: "سرویس بهداشتی", opt: "basic" },
  { name: "typeOfRestroom", label: "نوع سرویس بهداشتی", opt: "toiletType" },
  { name: "numberOfFloors", label: "طبقه", opt: "floors" },
];

export default function MoreItems({ control, watch }: { control: Control<FilterDataType>; watch: UseFormWatch<FilterDataType> }) {
  return (
    <div className="space-y-4">
      {ITEMS.map((item) => (
        <div key={item.name} className="w-full flex flex-col">
          <SelectTitle text={item.label} />
          <Controller
            name={item.name}
            control={control}
            render={({ field: { onChange } }) => (
              <div className="border w-full justify-between flex rounded-sm">
                {OPTIONS[item.opt].map((val) => (
                  <CustomButton
                    key={val}
                    className={`!rounded-none w-full border min-w-fit p-[14.5px] ${
                      watch(item.name) === val || (!watch(item.name) && val === OPTIONS[item.opt][0])
                        ? "bg-primary text-white" : ""
                    }`}
                    onPress={() => onChange(val)}
                    variant="bordered"
                  >
                    {val}
                  </CustomButton>
                ))}
              </div>
            )}
          />
        </div>
      ))}
    </div>
  );
}