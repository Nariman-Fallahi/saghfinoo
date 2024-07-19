import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { InputPhoneNumberType } from "@/types/Type";
import { Spinner } from "@nextui-org/spinner";

export default function PhoneNumber({
  phoneNumber,
  inputErr,
  isSelected,
  setPhoneNumber,
  setIsSelected,
  btnSendPhoneNumber,
  isPendingVerifyNumber,
}: InputPhoneNumberType) {
  return (
    <form className="w-full" style={{ direction: "rtl" }}>
      <input
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="09123456789"
        value={phoneNumber}
        type="number"
        className="mt-[40px] p-2 rounded-lg w-full border-[#2F80ED] border
     outline-none text-sm md:p-3 md:mt-[24px]"
        style={{
          boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
        }}
      />
      {inputErr && (
        <p className="text-xs text-red-500 mt-3 md:text-[13.2px]">
          شماره تلفن وارد شده معتبر نمیباشد.
        </p>
      )}
      {/* CheckBox */}
      <div className="mt-[16px] w-full flex items-center">
        <Checkbox
          isSelected={isSelected}
          onValueChange={setIsSelected}
          radius="sm"
        ></Checkbox>
        <p className="text-xs text-[#909090] md:text-sm">
          با
          <span className="text-[#CB1B1B]"> قوانین سقفینو </span>
          موافق هستم.
        </p>
      </div>
      {/* END CheckBox */}
      <Button
        disabled={!isSelected}
        onPress={btnSendPhoneNumber}
        isLoading={isPendingVerifyNumber}
        spinner={<Spinner color="white" size="sm" />}
        className={
          isSelected
            ? "mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B] text-white md:mt-[50px] md:text-lg"
            : "mt-[64px] w-full rounded-lg p-2 bg-gray-300 text-white md:mt-[50px] md:text-lg"
        }
      >
        {isPendingVerifyNumber ? "" : "ورود"}
      </Button>
    </form>
  );
}
