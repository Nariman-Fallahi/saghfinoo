import Image from "next/image";
import { Select, SelectItem } from "@heroui/select";

export default function DateRangeSelector() {
  const options = [
    { key: "newest", label: "جدید ترین" },
    { key: "oldest", label: "قدیمی ترین" },
  ];

  return (
    <Select
      defaultSelectedKeys={new Set(["newest"])}
      radius="sm"
      size="sm"
      className="w-full md:w-36"
      aria-label="filter-search"
      classNames={{ innerWrapper: "text-sm md:text-base" }}
      startContent={
        <Image
          width={16}
          height={16}
          src="/icons/filter-search.svg"
          alt="filter-search icon"
        />
      }
    >
      {options.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
  );
}
