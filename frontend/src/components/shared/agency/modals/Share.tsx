import Image from "next/image";

type SocialNetworkItem = {
  key: string;
  name: string;
  icon: string;
  alt: string;
  href?: string;
};

const SocialNetwork = ({ name, alt, href, icon }: SocialNetworkItem) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center mt-5 md:mt-7"
    >
      <Image
        width={24}
        height={24}
        src={icon}
        alt={alt}
        className="md:w-[30px] md:h-[30px]"
        sizes="(min-width: 768px) 30px, 24px"
      />
      <span className="mr-2 md:text-xl">{name}</span>
    </a>
  );
};

type ShareType = {
  data: {
    twitter?: string;
    whatsapp?: string;
    facebook?: string;
    telegram?: string;
    email?: string;
  };
};

export default function Share({ data }: ShareType) {
  const socialNetworks: SocialNetworkItem[] = [
    {
      key: "telegram",
      name: "تلگرام",
      alt: "Telegram Link",
      icon: "/icons/Telegram-blue.svg",
      href: data.telegram,
    },
    {
      key: "whatsapp",
      name: "واتساپ",
      alt: "Whatsapp Link",
      icon: "/icons/whatsapp.svg",
      href: data.whatsapp,
    },
    {
      key: "twitter",
      name: "ایکس",
      alt: "X | Twitter Link",
      icon: "/icons/x.svg",
      href: data.twitter,
    },
    {
      key: "facebook",
      name: "فیسبوک",
      alt: "Facebook Link",
      icon: "/icons/facebook.svg",
      href: data.facebook,
    },
    {
      key: "email",
      name: "ایمیل",
      alt: "Email Link",
      icon: "/icons/formkit_email.svg",
      href: data.email,
    },
  ];

  return (
    <div className="flex flex-col mt-10 w-full items-center pb-3">
      <p className="font-bold md:mt-8 md:text-2xl">اشتراک گذاری</p>

      <p className="mt-6 text-sm text-[#505050] md:text-lg md:text-center">
        این پروفایل را با دیگران به اشتراک بگذارید.
      </p>

      <div className="w-full mt-4 md:mt-6 flex flex-wrap justify-around gap-5 md:gap-2">
        {socialNetworks.map((item) => (
          <SocialNetwork
            key={item.key}
            name={item.name}
            icon={item.icon}
            alt={item.alt}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
}
