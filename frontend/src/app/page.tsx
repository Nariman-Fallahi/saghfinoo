"use server";

import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default async function Page() {
  const access = getCookie("access", { cookies });

  if (access) {
    redirect("/proUser");
  } else {
    redirect("/newUser");
  }
  return null;
}
