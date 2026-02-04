"use client";
import CustomButton from "../CustomButton";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import InputRegister from "../InputRegister";
import { changePasswordType, userInfoDataType } from "@/types";
import Title from "./Title";
import { usePostRequest } from "@/services/ApiService";
import { Api } from "@/services/ApiService";
import { getCookie } from "cookies-next";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Spinner } from "@heroui/spinner";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { editUserProfileType } from "@/types";
import { useUserInfo } from "@/hooks/queries/useUserInfo";

type Inputs = {
  iconUser: File;
  fristName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

export default function EditingInformation() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [defaultValues, setDefaultValues] = useState<{
    fristName?: string;
    lastName?: string;
  }>();

  const access = getCookie("access");

  const {
    data: userInfoData,
    refetch,
    isPending: userInfoPending,
  } = useUserInfo();

  const {
    mutate: editUserProfileMutate,
    data: editUserProfileData,
    status: editUserProfileStatus,
  } = usePostRequest<editUserProfileType>({
    url: Api.EditUserProfile,
    key: "editUserProfile",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    method: "PUT",
  });

  const {
    mutate: uploadProfileMutate,
    data: uploadProfileData,
    status: uploadProfileStatus,
  } = usePostRequest({
    url: Api.UploadProfileImage,
    key: "uploadProfileImage",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    mutate: changePasswordMutate,
    data: changePasswordData,
    status: changePasswordStatus,
  } = usePostRequest<changePasswordType>({
    url: Api.ChangePassword,
    key: "changePassword",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  useEffect(() => {
    setDefaultValues({
      fristName: userInfoData?.data.firstName,
      lastName: userInfoData?.data.lastName,
    });
  }, [userInfoData?.data]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.iconUser) {
      const formData = new FormData();
      formData.append("image", data.iconUser);

      uploadProfileMutate(formData);
    }

    if (
      data.fristName !== defaultValues?.fristName ||
      data.lastName !== defaultValues.lastName
    ) {
      editUserProfileMutate({
        first_name: data.fristName,
        last_name: data.lastName,
      });
    }

    if (data.currentPassword && data.newPassword) {
      changePasswordMutate({
        current_password: data.currentPassword,
        new_password: data.newPassword,
      });
    }
  };

  const isLoadingBtn =
    editUserProfileStatus === "pending" ||
    uploadProfileStatus === "pending" ||
    changePasswordStatus === "pending";

  const OpenSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (editUserProfileStatus === "success" && editUserProfileData) {
      if (editUserProfileData.msg === "done") {
        Success("اطلاعات با موفقیت تغییر پیدا کرد");
        refetch();
      } else {
        ErrorNotification("در تغییر عکس پروفایل مشکلی پیش آمد");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUserProfileData, editUserProfileStatus]);

  useEffect(() => {
    if (uploadProfileStatus === "success" && uploadProfileData) {
      if (uploadProfileData.msg === "done") {
        Success("عکس پروفایل با موفقیت تغییر کرد");
        refetch();
      } else {
        ErrorNotification("در تغییر عکس پروفایل مشکلی پیش آمد");
      }
    }
  }, [refetch, uploadProfileData, uploadProfileStatus]);

  useEffect(() => {
    if (changePasswordStatus === "success" && changePasswordData) {
      if (changePasswordData.msg === "done") {
        Success("اطلاعات با موفقیت تغییر پیدا کرد");
        refetch();
      } else if (
        changePasswordData.errors.current_password ===
        "current password is incurrent"
      ) {
        ErrorNotification("رمز عبور قبلی اشتباه میباشد");
      } else {
        ErrorNotification("در تغییر رمز عبور مشکلی پیش آمد");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePasswordData, changePasswordStatus]);

  return (
    <>
      <Title title="ویرایش اطلاعات" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center md:items-start"
      >
        <div
          onClick={OpenSelectImage}
          className="mt-4 cursor-pointer lg:mt-6 w-24 h-24 p-3 rounded-lg border flex justify-center items-center"
        >
          <Controller
            name="iconUser"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                ref={fileInputRef}
                onChange={(e) => {
                  handleImageChange(e);
                  const files = e.target.files;
                  if (files) {
                    field.onChange(files[0]);
                  }
                }}
                className="size-full hidden absolute"
              />
            )}
          />
          <i>
            {userInfoPending ? (
              <Skeleton
                circle
                width={60}
                height={60}
                className="md:!w-[70px] md:!h-[70px]"
              />
            ) : (
              <Image
                width={60}
                height={60}
                className="rounded-full md:w-[70px] md:h-[70px] lg:w-[85px]"
                quality={100}
                sizes="(min-width: 768px) 70px, 70px"
                src={
                  imagePreview
                    ? imagePreview
                    : userInfoData?.data.imageFullPath
                    ? userInfoData?.data.imageFullPath
                    : "/icons/profile-circle.svg"
                }
                alt="Image User"
              />
            )}
          </i>
        </div>

        <div className="w-full mt-2 flex flex-col md:flex-row flex-wrap md:justify-between">
          <div className="w-full md:w-[48%]">
            <InputRegister
              name="fristName"
              placeholder="نام خود را  وارد نمایید"
              alt="Frist Name"
              type="text"
              icon="/icons/user.svg"
              register={register}
              rules={{
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: "لطفا اسم خود را به فارسی وارد کنید",
                },
                maxLength: {
                  value: 18,
                  message: "وارد کردن بیشتر از ۱۸ کاراکتر ممکن نمیباشد",
                },
                minLength: {
                  value: 3,
                  message: "وارد کردن کم تر از ۳ کاراکتر ممکن نمیباشد",
                },
              }}
              error={errors.fristName?.message}
            />
          </div>

          <div className="w-full md:w-[48%]">
            <InputRegister
              name="lastName"
              placeholder="نام خانوادگی خود را  وارد نمایید"
              alt="Last Name"
              type="text"
              icon="/icons/user.svg"
              register={register}
              rules={{
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: "لطفا نام خانوادگی خود را به فارسی وارد کنید",
                },
                maxLength: {
                  value: 18,
                  message: "وارد کردن بیشتر از ۱۸ کاراکتر ممکن نمیباشد",
                },
                minLength: {
                  value: 3,
                  message: "وارد کردن کم تر از ۳ کاراکتر ممکن نمیباشد",
                },
              }}
              error={errors.lastName?.message}
            />
          </div>

          <div className="w-full md:w-[48%]">
            <InputRegister
              name="email"
              placeholder="ایمیل خود را وارد کنید (اختیاری)"
              alt="Email"
              type="email"
              icon="/icons/sms.svg"
              register={register}
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "ایمیل وارد شده معتبر نمیباشد",
                },
              }}
              error={errors.email?.message}
            />
          </div>

          <p className="text-sm font-bold md:text-base w-full text-start mt-5">
            تغییر رمز عبور
          </p>

          <div className="w-full md:w-[48%]">
            <InputRegister
              name="currentPassword"
              placeholder="رمز عبور فعلی خود را وارد کنید"
              alt="Current Password"
              type="password"
              icon="/icons/key.svg"
              register={register}
              rules={{
                pattern: {
                  value: /^[A-Za-z0-9._$#@]+$/,
                  message: "رمز عبور معتبر نمیباشد",
                },
                minLength: {
                  value: 8,
                  message: "رمز عبور نمیتواند کم تر از ۸ رقم باشد",
                },
              }}
              error={errors.currentPassword?.message}
            />
          </div>

          <div className="w-full md:w-[48%]">
            <InputRegister
              name="newPassword"
              placeholder="رمز عبور جدید خود را وارد کنید"
              alt="New Password"
              type="password"
              icon="/icons/key.svg"
              register={register}
              rules={{
                required: watch("currentPassword")
                  ? "لطفا رمز عبور جدید خود را وارد کنید"
                  : false,
                pattern: {
                  value: /^[A-Za-z0-9._$#@]+$/,
                  message: "رمز عبور معتبر نمیباشد",
                },
                minLength: {
                  value: 8,
                  message: "رمز عبور نمیتواند کم تر از ۸ رقم باشد",
                },
              }}
              error={errors.newPassword?.message}
            />
          </div>
        </div>
        <CustomButton
          radius="sm"
          className="bg-primary text-white w-full mt-8 md:w-1/3"
          type="submit"
          isLoading={isLoadingBtn}
          spinner={<Spinner color="white" size="sm" />}
        >
          {isLoadingBtn ? "" : "ذخیره اطلاعات"}
        </CustomButton>
      </form>
    </>
  );
}
