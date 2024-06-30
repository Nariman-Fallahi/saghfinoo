import OtpInput from "react-otp-input";
import { OtpType } from "@/types/Type";
import { useUserStatus } from "@/store/Register";

export default function Otp({
  otp,
  setOtp,
  handleFocus,
  handleBlur,
  focusedInput,
}: OtpType) {
  const { userStatus, setUserStatus } = useUserStatus();

  console.log(userStatus);

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      renderInput={(props, index) => (
        <input
          {...props}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          style={{
            borderRadius: "8px",
            width: "50px",
            height: "48px",
            border: `1px solid ${
              focusedInput === index ? "#2F80ED" : "#ADADAD"
            }`,
            boxShadow:
              focusedInput === index
                ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                : "none",
            marginRight: "20px",
            outline: "none",
            textAlign: "center",
            fontSize: "24px",
          }}
        />
      )}
    />
  );
}
