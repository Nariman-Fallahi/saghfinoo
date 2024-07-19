export enum RegisterStatusValue {
  status1 = "phoneNumber",
  status2 = "codeSent",
  status3 = "notRegistered",
}

type TitleType = {
  title: string;
};

export default function Title({ title }: TitleType) {
  return (
    <h3 className="text-sm font-bold md:text-lg lg:text-[32px]">{title}</h3>
  );
}

export enum nameActiveModalValue {
  ContactInfo = "ContactInfo",
  Share = "Share",
}
