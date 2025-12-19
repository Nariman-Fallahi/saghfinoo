import Image from "next/image";

type SocialNetworkType = {
  name: string;
  icon: string;
  alt: string;
  href: string | undefined;
};

const SocialNetwork = ({ name, alt, href, icon }: SocialNetworkType) => {
  return (
    <a href={href} className="flex items-center mt-5 md:mt-7">
      <Image
        width={24}
        height={24}
        src={icon}
        alt={alt}
        className="md:w-[30px] md:h-[30px]"
        sizes="(min-width: 768px) 40px, 40px"
      />
      <span className="mr-2 md:text-xl">{name}</span>
    </a>
  );
};

type ShareModalType = {
  data: {
    twitter: string | undefined;
    whatsapp: string | undefined;
    facebook: string | undefined;
    telegram: string | undefined;
    email: string | undefined;
  };
};

export default function ShareModal({ data }: ShareModalType) {
  return (
    <div className="flex flex-col mt-10 w-full items-center pb-3">
      <p className="font-bold md:mt-8 md:text-2xl">اشتراک گذاری</p>

      <p className="mt-6 text-sm text-[#505050] md:text-lg md:text-center">
        این پروفایل را با دیگران به اشتراک بگذارید.
      </p>

      <div className="w-full mt-4 md:mt-6 flex flex-wrap justify-around gap-5 md:gap-2">
        {data.telegram && (
          <SocialNetwork
            name="تلگرام"
            alt="Telegram Link"
            icon="/icons/Telegram-blue.svg"
            href={data.telegram}
          />
        )}

        {data.whatsapp && (
          <SocialNetwork
            name="واتساپ"
            alt="Whatsapp Link"
            icon="/icons/whatsapp.svg"
            href={data.whatsapp}
          />
        )}

        {data.twitter && (
          <SocialNetwork
            name="ایکس"
            alt="X | Twitter Link"
            icon="/icons/x.svg"
            href={data.twitter}
          />
        )}

        {data.facebook && (
          <SocialNetwork
            name="فیسبوک"
            alt="Facebook Link"
            icon="/icons/facebook.svg"
            href={data.facebook}
          />
        )}

        {data.email && (
          <SocialNetwork
            name="ایمیل"
            alt="Email Link"
            icon="/icons/formkit_email.svg"
            href={data.email}
          />
        )}
      </div>
    </div>
  );
}
