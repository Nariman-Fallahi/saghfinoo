import Image from "next/image";
import { AgencyActionsModalType } from "@/types";

const ContactLink = ({
  tel,
  label,
  icon,
}: {
  tel?: string;
  label: string;
  icon: string;
}) => {
  if (!tel) return null;

  return (
    <a
      href={`tel:${tel}`}
      className="group flex items-center justify-between w-full max-w-sm p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl transition-all duration-300 active:scale-[0.98]"
    >
      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-400 font-medium">{label}</span>
        <span className="text-lg md:text-xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors mt-2">
          {tel}
        </span>
      </div>
      <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-all">
        <Image
          src={icon}
          width={24}
          height={24}
          alt={label}
          className="md:w-7 md:h-7"
        />
      </div>
    </a>
  );
};

interface ContactInfoModalProps {
  data: AgencyActionsModalType;
}

export default function ContactInfo({ data }: ContactInfoModalProps) {
  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">
      <div className="relative p-1 border-2 border-blue-100 rounded-full shadow-lg">
        <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px]">
          <Image
            src={data?.profileIcon || "/icons/profile-circle.svg"}
            alt={data.name || "profile"}
            fill
            className="rounded-full object-cover"
            sizes="(min-width: 768px) 130px, 100px"
          />
        </div>
      </div>

      <h2 className="mt-6 font-black text-xl md:text-3xl text-gray-800 tracking-tight">
        {data.name}
      </h2>

      <p className="text-gray-400 text-sm mt-1 mb-8">راه‌های ارتباطی با ما</p>

      <div className="flex flex-col gap-4 w-full items-center">
        <ContactLink
          tel={data.number?.phoneNumber}
          label="شماره موبایل"
          icon="/icons/call-color.svg"
        />
        <ContactLink
          tel={data.number?.landlineNumber}
          label="تلفن ثابت"
          icon="/icons/call-color.svg"
        />
      </div>
    </div>
  );
}
