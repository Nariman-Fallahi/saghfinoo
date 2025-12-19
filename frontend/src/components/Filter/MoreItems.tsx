import { Control, Controller, UseFormWatch } from "react-hook-form";
import CustomButton from "../CustomButton";
import { FilterDataType } from "@/Types";
import { SelectTitle } from "../ui/SelectTitle";

type MoreItemsType = {
  control: Control<FilterDataType, any>;
  watch: UseFormWatch<FilterDataType>;
};

const basicServiceOptions = ["هرتعداد", "ندارد", "1", "2", "3", "4", "+5"];
const numberOfToiletOptions = ["هرتعداد", "1", "2", "3", "4", "+5"];
const typeOfToiletOptions = ["مهم نیست", "ایرانی", "فرنگی", "هردو"];
const numberOfFloors = ["مهم نیست", "همکف", "1", "2", "3", "+4"];

type ButtonGroupComponentType = {
  options: string[];
  onChange: (...event: any[]) => void;
  selected: string | undefined;
};

const ButtonGroupComponent = ({
  options,
  onChange,
  selected,
}: ButtonGroupComponentType) => {
  return (
    <div className="border w-full justify-between flex rounded-sm">
      {options.map((item, index) => {
        const lastIndex = options.length - 1;

        return (
          <CustomButton
            key={index}
            className={`!rounded-none w-full border min-w-fit p-[14.5px] ${
              selected === item
                ? "bg-primary text-white"
                : index === 0 && !selected
                ? "bg-primary text-white"
                : ""
            }`}
            onPress={() => onChange(item)}
            variant="bordered"
          >
            {item}
          </CustomButton>
        );
      })}
    </div>
  );
};

export default function MoreItems({ control, watch }: MoreItemsType) {
  return (
    <>
      <div className="w-full flex flex-col">
        <SelectTitle text="اتاق خواب" />
        <Controller
          name="numberOfBedroom"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={basicServiceOptions}
              onChange={onChange}
              selected={watch("numberOfBedroom")}
            />
          )}
        />
      </div>

      <div className="w-full flex flex-col">
        <SelectTitle text="پارکینگ" />
        <Controller
          name="numberOfParking"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={basicServiceOptions}
              onChange={onChange}
              selected={watch("numberOfParking")}
            />
          )}
        />
      </div>

      <div className="w-full flex flex-col">
        <SelectTitle text="انباری" />
        <Controller
          name="numberOfStorageRoom"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={basicServiceOptions}
              onChange={onChange}
              selected={watch("numberOfStorageRoom")}
            />
          )}
        />
      </div>

      <div className="w-full flex flex-col">
        <SelectTitle text="آسانسور" />
        <Controller
          name="numberOfElevators"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={basicServiceOptions}
              onChange={onChange}
              selected={watch("numberOfElevators")}
            />
          )}
        />
      </div>

      <div className="w-full flex flex-col">
        <SelectTitle text="سرویس بهداشتی" />
        <Controller
          name="numberOfRestrooms"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={numberOfToiletOptions}
              onChange={onChange}
              selected={watch("numberOfRestrooms")}
            />
          )}
        />
      </div>

      <div className="w-full flex flex-col">
        <SelectTitle text="نوع سرویس بهداشتی" />
        <Controller
          name="typeOfRestroom"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={typeOfToiletOptions}
              onChange={onChange}
              selected={watch("typeOfRestroom")}
            />
          )}
        />
      </div>

      <div className="w-full flex flex-col">
        <SelectTitle text="طبقه" />
        <Controller
          name="numberOfFloors"
          control={control}
          render={({ field: { onChange } }) => (
            <ButtonGroupComponent
              options={numberOfFloors}
              onChange={onChange}
              selected={watch("numberOfFloors")}
            />
          )}
        />
      </div>
    </>
  );
}
