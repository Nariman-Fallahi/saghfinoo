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

export const ScoreReasonData = {
  reasonsForWeak: [
    "دریافت کمیسیون اضافی",
    "عدم پاسخگویی",
    "برخورد نامناسب",
    "عدم شناخت بازار",
  ],
  reasonsForAverage: [
    "متعد و پیگیر بودن",
    "عدم پاسخگویی",
    "داشتن تخصص و مهارت کافی",
    "عدم شناخت بازار",
    "وقت شناس",
    "دریافت کمیسیون اضافی",
    "برخورد و رفتار محترمانه",
    "برخورد نامناسب",
  ],
  reasonsForExcellent: [
    "وقت شناس",
    "دریافت کمیسیون اضافی",
    "برخورد و رفتار محترمانه",
    "برخورد مناسب",
  ],
};

export const isPersian = (text: string) => {
  const persian = /^[\u0600-\u06FF\s]+$/;
  return persian.test(text);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const numberToPersian = (number: number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};

export const numberWithCommas = (
  number: number | string | undefined
): string => {
  const str = (number ?? "").toString().replace(/[^\d]/g, "");

  if (str === "") {
    return "";
  }

  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const removeCommas = (input: string): string => {
  return input.replace(/,/g, "");
};

export const TextError = ({ text }: { text: string | undefined }) => {
  return <p className="text-xs lg:text-sm mt-3 text-red-500 text-right w-full">{text}</p>;
};
