import Image from "next/image";
import { DataModalREA } from "@/types/Type";

type ContactInfoModalType = {
  data: DataModalREA;
};

type contactType = {
  tel: string | undefined;
  alt: string;
};

export default function ContactInfoModal({ data }: ContactInfoModalType) {
  const contact = ({ tel, alt }: contactType) => {
    return (
      <a href={"tel:" + tel} className="flex items-center">
        <span className="ml-4 md:text-xl mt-2">{tel}</span>
        <Image
          width={22}
          height={22}
          src="/icons/call-color.svg"
          alt={alt}
          className="md:w-7 md:h-7"
          sizes="(min-width: 768px) 28px, 28px"
        />
      </a>
    );
  };

  return (
    <div className="w-full flex flex-col mt-10 items-center">
      <Image
        width={84}
        height={84}
        src={data?.profileIcon ? data.profileIcon : "/icons/profile-circle.svg"}
        alt=""
        className="md:w-[120px] md:h-[120px]"
        sizes="(min-width: 768px) 120px, 120px"
      />
      <p className="mt-4 font-bold md:mt-8 md:text-2xl">{data.name}</p>

      <div className="mt-8 flex flex-col w-full items-center">
        {contact({
          tel: data.number.phoneNumber,
          alt: "Phone number",
        })}
        {contact({
          tel: data.number.landlineNumber,
          alt: "Landline number",
        })}
      </div>
    </div>
  );
}
