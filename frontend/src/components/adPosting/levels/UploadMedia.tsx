import { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import BtnSubmit from "../BtnSubmit";

type UploadMediaType = {
  files: (File | null)[];
  setFiles: (files: (File | null)[]) => void;
  submitAllFiles: () => void;
  isLoading: boolean;
};

export default function UploadMedia({
  files,
  setFiles,
  submitAllFiles,
  isLoading,
}: UploadMediaType) {
  const { handleSubmit } = useForm();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const onSubmit = () => {
    submitAllFiles();
  };

  const fileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = [...files];
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        newFiles[index] = file;
        setFiles(newFiles);
      }
    };

  const removeFile = (index: number) => () => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);
  };

  const openSelectFile = (index: number) => () => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-xs md:text-sm text-[#909090]">
        اضافه کردن عکس و ویدیو باعث افزایش بازدید آگهی شما میشود.
        <br />
        فرمت عکس ها باید jpeg, jpg, webp, یا png باشد.
      </p>

      <div className="w-full flex justify-between flex-wrap">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            onClick={openSelectFile(index)}
            className={`w-[48%] md:w-[30%] h-40 flex items-center justify-center
               relative cursor-pointer border-dashed border rounded ${
                 files[index] ? "p-0" : "p-5"
               } mt-5`}
          >
            {!files[index] && (
              <>
                <Image
                  width={50}
                  height={50}
                  src="/icons/gallery-add.svg"
                  alt=""
                />
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp, .mp4"
                  onChange={fileChange(index)}
                  className="size-full hidden absolute"
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                />
              </>
            )}

            {files[index] && (
              <>
                <div
                  className="size-full items-start justify-end flex
                  absolute p-3 z-20"
                >
                  <i
                    onClick={removeFile(index)}
                    className="bg-gray-500 p-1 rounded opacity-70 hover:bg-gray-600"
                  >
                    <Image
                      width={26}
                      height={26}
                      src="/icons/trash.svg"
                      alt="Icon trash"
                    />
                  </i>
                </div>
                <div>
                  {files[index].type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(files[index])}
                      alt="Image preview"
                      width={500}
                      height={250}
                      className="w-full h-40 rounded"
                    />
                  ) : files[index].type.startsWith("video/") ? (
                    <video
                      src={URL.createObjectURL(files[index])}
                      controls
                      className="w-full h-40"
                    />
                  ) : null}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <BtnSubmit label="ارسال اطلاعات" isLoading={isLoading} />
    </form>
  );
}
