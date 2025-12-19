import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { isMobile } from "@/utils/isMobile";
import { Key } from "react";
import { TextError } from "../ui/TextError";
import { SelectTitle } from "../ui/SelectTitle";

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
        aria-label={title}
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
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>

      {errorMessage && <TextError text="لطفا این فیلد را خالی نگزارید" />}
    </div>
  );
}
