"use server";

import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default async function Page() {
  const accessToken = getCookie("accessToken", { cookies });

  if (accessToken) {
    redirect("/home/pro-user");
  } else {
    redirect("/home/new-user");
  }
}
