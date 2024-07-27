import Image from "next/image";
import { contactInfoDataType } from "@/types/Type";

type ContactInfoModalType = {
  contactInfoData: contactInfoDataType;
};

type contactType = {
  tel: string | undefined;
  alt: string;
};

export default function ContactInfoModal({
  contactInfoData,
}: ContactInfoModalType) {
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
        />
      </a>
    );
  };

  return (
    <div className="w-full flex flex-col mt-10 items-center">
      <Image
        width={84}
        height={84}
        src={
          contactInfoData.profileIcon
            ? contactInfoData.profileIcon
            : "/icons/noneImage.svg"
        }
        alt=""
        className="md:w-[120px] md:h-[120px]"
      />
      <p className="mt-4 font-bold md:mt-8 md:text-2xl">
        {contactInfoData.name}
      </p>

      <div className="mt-8 flex flex-col w-full items-center">
        {contact({
          tel: contactInfoData.number?.phoneNumber,
          alt: "Phone number",
        })}
        {contact({
          tel: contactInfoData.number?.landlineNumber,
          alt: "Landline number",
        })}
      </div>
    </div>
  );
}
