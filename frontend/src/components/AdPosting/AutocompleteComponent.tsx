import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { isMobile, SelectTitle, TextError } from "@/constant/Constants";
import { Key } from "react";

type AutocompleteItemProps = {
  placeholder: string;
  isLoading: boolean;
  title: string;
  data:
    | {
        value: number | string;
        label: string;
      }[]
    | undefined;
  onSelectionChange: (key: Key | null) => void;
  errorMessage: boolean;
};

export default function AutocompleteComponent({
  placeholder,
  isLoading,
  title,
  data,
  errorMessage,
  onSelectionChange,
}: AutocompleteItemProps) {
  return (
    <div className="flex flex-col">
      <SelectTitle text={title} />
      <Autocomplete
        placeholder={placeholder}
        isLoading={isLoading}
        variant="bordered"
        radius="sm"
        defaultItems={data || []}
        size={isMobile ? "sm" : "md"}
        onSelectionChange={onSelectionChange}
        inputProps={{
          classNames: {
            inputWrapper: "!border !rounded !border-[#ADADAD] !p-2",
            input: "!text-[13px] md:!text-sm",
          },
        }}
        isDisabled={!data}
      >
        {(item) => (
          <AutocompleteItem key={item.label}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>

      {errorMessage && <TextError text="لطفا این فیلد را خالی نگزارید" />}
    </div>
  );
}
