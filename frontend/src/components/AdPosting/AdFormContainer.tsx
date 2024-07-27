import Stepper from "./Stepper";

export default function AdFormContainer() {
  return (
    <div className="w-full flex mt-[60px] justify-center items-center">
      <div
        className="w-full h-screen bg-center"
        style={{ backgroundImage: "url(/icons/BgForm.svg)" }}
      ></div>

      <div className="w-full absolute p-4">
        <div
          className="w-full bg-wgite z-10 flex flex-col items-center
          bg-white rounded-2xl p-3 justify-center"
        >
          <Stepper />
        </div>
      </div>
    </div>
  );
}
