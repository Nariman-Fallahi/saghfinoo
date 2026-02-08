"use client";
import { Select, SelectItem } from "@heroui/select";
import { Controller, Control } from "react-hook-form";
import { FilterDataType } from "@/types";

type Props = {
  control: Control<FilterDataType>;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
};

export default function DateRangeSelector({
  control,
  onChange: externalOnChange,
  onSubmit,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="w-full md:w-40 h-8 md:h-9 bg-gray-200 animate-pulse rounded-[4px]! border border-gray-100" />
    );
  }

  const options = [
    { key: "newest", label: "جدید ترین" },
    { key: "oldest", label: "قدیمی ترین" },
  ];

  return (
    <Controller
      name="sort"
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          size="sm"
          selectedKeys={value ? new Set([String(value)]) : new Set(["newest"])}
          variant="bordered"
          className="w-full md:w-40"
          aria-label="sort-filter"
          onSelectionChange={(keys) => {
            const selectedValue = Array.from(keys)[0] as string;
            onChange(selectedValue);
            if (externalOnChange) externalOnChange(selectedValue);
            if (onSubmit) {
              setTimeout(() => onSubmit(), 100);
            }
          }}
          classNames={{
            trigger: "rounded-[4px]! border border-gray-200 h-8 md:h-9 px-3",
            innerWrapper: "flex items-center justify-start gap-2",
            value:
              "text-[12px] md:text-sm font-medium text-right justify-start! flex",
          }}
        >
          {options.map((item) => (
            <SelectItem key={item.key} className="text-right">
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}
