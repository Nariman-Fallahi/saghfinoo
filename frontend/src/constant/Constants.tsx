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
