"use server";

import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default async function Page() {
  const access = getCookie("access", { cookies });
  const refresh = getCookie("refresh", { cookies });

  if (access && refresh) {
    redirect("/proUser");
  } else {
    redirect("/newUser");
  }
  return null;
}
