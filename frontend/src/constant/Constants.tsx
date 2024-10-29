export enum RegisterStatusValue {
  status1 = "phoneNumber",
  status2 = "codeSent",
  status3 = "notRegistered",
}

type TitleType = {
  title: string;
};

export function Title({ title }: TitleType) {
  return (
    <h3 className="text-sm font-bold md:text-lg lg:text-[32px]">{title}</h3>
  );
}

export const isMobile: boolean =
  typeof window !== "undefined" && window.innerWidth < 768 ? true : false;

export const isPersian = (text: string) => {
  const persian = /^[\u0600-\u06FF\s]+$/;
  return persian.test(text);
};

export const numberToPersian = (number: number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};

export const TextError = ({ text }: { text: string | undefined }) => {
  return (
    <p className="text-xs lg:text-sm mt-3 text-red-500 text-right w-full">
      {text}
    </p>
  );
};

export const SelectTitle = ({ text }: { text: string | undefined }) => {
  return (
    <label className="text-sm md:text-base lg:text-lg text-[#353535] mt-2 pb-2">
      {text}
    </label>
  );
};

export const LoginErrorText = "ابتدا وارد حساب کاربری خود شوید.";

export const FeaturesDataNewUserHome = {
  title: "سقفینو چطور به خانه‌دار شدن شما کمک می‌کند",
  data: [
    {
      id: 1,
      icon: "/icons/Features1.svg",
      title: "به آسانی یک خانه اجاره کنید",
      description:
        "در میان صدها آگهی که روزانه به وب‌سایت سقفینو افزوده می‌شود، با استفاده از بیش از ۲۸ فیلتر کاربردی تلاش کرده‌ایم خانه‌ای که در جست‌وجوی آن هستید را هر چه سریعتر پیدا و اجاره کنید.",
      btnText: "اجاره خانه",
    },
    {
      id: 2,
      icon: "/icons/Features2.svg",
      title: "خانه مورد علاقه‌تان را بخرید",
      description:
        "بالای ۱ میلیون آگهی فروش در وب‌سایت سقفینو وجود دارد. ما علاوه بر آگهی‌های فراوان با به‌کارگیری املاک و مشاورین متخصص در هر شهر، تلاش می‌کنیم در تجربه لذت یک خرید آسان با شما سهیم باشد.",
      btnText: "خرید خانه",
    },
    {
      id: 3,
      icon: "/icons/Features3.svg",
      title: "مالک هستید؟",
      description:
        "آیا می‌دانید میانگین بازدید از وب‌سایت به‌طور متوسط روزانه بالای هزاران نفر است؟ پس به‌سادگی و با چند کلیک ساده، ملک‌تان را به‌صورت رایگان در سقفینو آگهی و در سریع‌ترین زمان ممکن معامله کنید.",
      btnText: "ثبت آگهی",
    },
  ],
};

export const TypesEstateDataNewUserHome = {
  title: "سقفینو چطور به خانه‌دار شدن شما کمک می‌کند",
  data: [
    {
      id: 1,
      image: "/image/TypesEstate1.png",
      number: 28900,
      title: "خانه مسکونی",
    },
    {
      id: 2,
      image: "/image/TypesEstate2.png",
      number: 309798,
      title: "آپارتمان و برج",
    },
    {
      id: 3,
      image: "/image/TypesEstate3.png",
      number: 946,
      title: "ویلا",
    },
    {
      id: 4,
      image: "/image/TypesEstate4.png",
      number: 2739,
      title: "تجاری و اداری",
    },
  ],
};

export const ServicesDataNewUserHome = [
  {
    id: 1,
    icon: "/icons/Services1.svg",
    text: "امکان خرید و اجاره ملک در اکثر نقاط کشور",
  },
  {
    id: 2,
    icon: "/icons/Services2.svg",
    text: "مقایسه و بررسی صدها ملک براحتی و در کمترین زمان",
  },
  {
    id: 3,
    icon: "/icons/Services3.svg",
    text: "ارتباط آسان با برترین املاک و مشاورین کشور",
  },
];

export const ServicesDataProUserHome = [
  {
    id: 1,
    icon: "/icons/ServicesProHome1.svg",
    text: "مشاورین ما ۲۴ ساعته پاسخگوی سوالات ملکی شما هستند",
  },
  {
    id: 2,
    icon: "/icons/ServicesProHome2.svg",
    text: "اگر در جست‌وجوی یک سقف نو هستید اینجا کلیک کنید",
  },
  {
    id: 3,
    icon: "/icons/ServicesProHome2.svg",
    text: "با ثبت آسان آگهی، ملک خود را برای اجاره یا فروش اعلان کنید",
  },
];
