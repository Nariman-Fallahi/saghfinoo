import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { InputPhoneNumberType } from "@/types/Type";

export default function InputPhoneNumber({
  setPhone,
  inputErr,
  isSelected,
  setIsSelected,
  btnSendPhoneNumber,
}: InputPhoneNumberType) {
  return (
    <form className="w-full pb-3" style={{ direction: "rtl" }}>
      <input
        onChange={(e) => setPhone(e.target.value)}
        placeholder="09123456789"
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
        className={
          isSelected
            ? "mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B] text-white md:mt-[50px] md:text-lg"
            : "mt-[64px] w-full rounded-lg p-2 bg-gray-300 text-white md:mt-[50px] md:text-lg"
        }
      >
        ورود
      </Button>
    </form>
  );
}
