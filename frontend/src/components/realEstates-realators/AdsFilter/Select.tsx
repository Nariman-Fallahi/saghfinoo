"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useEffect, RefObject, useRef, useState } from "react";

type SelectType = {
  ButtonText: string;
  isOpen: boolean;
  onPress: () => void;
  component: JSX.Element;
  className?: string;
  label?: string;
};

// Custom hook to handle clicks outside of a specific element
function useOutsideClickHandler(
  ref: RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default function Select({
  ButtonText,
  isOpen,
  onPress,
  component,
  className,
  label,
}: SelectType) {
  const [activeSelect, setActiveSelect] = useState<boolean>(isOpen);
  const selectRef = useRef<HTMLDivElement>(null);

  // Sync activeSelect with isOpen prop
  useEffect(() => {
    setActiveSelect(isOpen);
  }, [isOpen]);

  // Use custom hook to handle outside clicks
  useOutsideClickHandler(selectRef, () => {
    if (activeSelect) {
      setActiveSelect(false);
      onPress(); // Notify parent component of state change
    }
  });

  const handleButtonClick = () => {
    setActiveSelect((prev) => !prev);
    onPress(); // Notify parent component of state change
  };

  return (
    <div
      className={
        className ? className : "flex-col mt-11 relative hidden md:flex"
      }
    >
      {label && (
        <span className="text-[#353535] text-sm mr-1 pb-2">{label}</span>
      )}
      <Button
        radius="sm"
        variant="bordered"
        onPress={handleButtonClick}
        className="ml-4 w-full md:w-auto"
        style={{
          boxShadow: activeSelect
            ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
            : "",
          border: activeSelect ? "1px solid #2F80ED" : "1px solid #d4d4d8",
        }}
      >
        <div className="flex items-center">
          <span className="text-[#505050] ml-2">{ButtonText}</span>
          <Image
            width={20}
            height={20}
            src={activeSelect ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
            alt={activeSelect ? "Collapse" : "Expand"}
          />
        </div>
      </Button>

      {activeSelect && (
        <div
          ref={selectRef}
          className="w-[160px] h-[170px] bg-white absolute mt-20 z-20 rounded-lg
          border-[#2F80ED] border flex flex-col overflow-y-auto selectBtn md:w-[190px]
          md:h-[200px] md:mt-12"
          style={{
            boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
          }}
        >
          {component}
        </div>
      )}
    </div>
  );
}
