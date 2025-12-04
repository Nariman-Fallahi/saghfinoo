"use client";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

export default function MoreActions({
  isPending,
  handleShareBtn,
  handleRegisterScoreBtn,
  handleViolationReport,
}: {
  isPending: boolean;
  handleShareBtn: () => void;
  handleRegisterScoreBtn: () => void;
  handleViolationReport: () => void;
}) {
  const items = [
    {
      key: "share",
      title: "اشتراک گذاری",
      icon: "/icons/export.svg",
      action: handleShareBtn,
    },
    {
      key: "score",
      title: "امتیاز دهی به مشاور",
      icon: "/icons/like-dislike.svg",
      action: handleRegisterScoreBtn,
    },
    {
      key: "report",
      title: "گزارش",
      icon: "/icons/warning-2.svg",
      action: handleViolationReport,
    },
  ];

  return (
    <div className="flex flex-col items-end md:hidden">
      {isPending ? (
        <Skeleton circle width={18} height={18} />
      ) : (
        <Dropdown className="shadow-none rounded-lg border border-[#E1E1E1]">
          <DropdownTrigger>
            <button>
              <Image width={18} height={18} src="/icons/more.svg" alt="" />
            </button>
          </DropdownTrigger>

          <DropdownMenu
            className="shadow-none rounded p-0"
            aria-label="actions"
            onAction={(key) => {
              const item = items.find((i) => i.key === key);
              item?.action();
            }}
          >
            {items.map((item, index) => (
              <DropdownItem
                key={item.key}
                className={`flex gap-2 py-2 items-center ${
                  index !== items.length - 1 ? "border-b border-[#E1E1E1]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Image src={item.icon} width={16} height={16} alt="" />
                  <span>{item.title}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
