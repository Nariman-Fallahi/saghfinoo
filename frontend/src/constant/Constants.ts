import { SignUpInputType } from "@/types/Type";

export enum UserStatusValue {
  status1 = "phoneNumber",
  status2 = "codeSent",
  status3 = "notRegistered",
}

export const SignUpItem: SignUpInputType = [
  { id: 0, title: "", placeholder: "نام خود را وارد کنید", icon: "" },
  {
    id: 1,
    title: "",
    placeholder: "نام خانوادگی خود را وارد کنید",
    icon: "",
  },
  {
    id: 2,
    title: "",
    placeholder: "رمز دلخواه خود را وارد کنید",
    icon: "",
  },
];
