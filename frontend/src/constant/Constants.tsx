import { SignUpInputType } from "@/types/Type";

export enum RegisterStatusValue {
  status1 = "phoneNumber",
  status2 = "codeSent",
  status3 = "notRegistered",
}

export const SignUpItem: SignUpInputType = [
  {
    id: 0,
    title: "",
    placeholder: "نام خود را وارد کنید",
    icon: "/icons/user.svg",
  },
  {
    id: 1,
    title: "",
    placeholder: "نام خانوادگی خود را وارد کنید",
    icon: "/icons/user.svg",
  },
  {
    id: 2,
    title: "",
    placeholder: "رمز دلخواه خود را وارد کنید",
    icon: "/icons/key.svg",
  },
];

type TitleType = {
  title: string;
};

export default function Title({ title }: TitleType) {
  return (
    <h3 className="text-sm font-bold md:text-lg lg:text-[32px]">{title}</h3>
  );
}
