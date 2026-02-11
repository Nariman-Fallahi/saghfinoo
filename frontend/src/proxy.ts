import { type NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();
  const pathname = url.pathname;

  const accessToken = await getCookie("accessToken", { req, res });
  const refreshToken = await getCookie("refreshToken", { req, res });

  const isProtectedPath = (path: string) => {
    const protectedPatterns = [
      /^\/home\/pro-user/,
      /^\/create-ad/,
      /^\/user-profile/,
    ];

    return protectedPatterns.some((pattern) => pattern.test(path));
  };

  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/token/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.access) {
          setCookie("accessToken", data.access, {
            req,
            res,
            maxAge: data.expire,
            secure: process.env.NODE_ENV === "production",
            path: "/",
          });
        }
      } else {
        return NextResponse.redirect(new URL("/home/new-user", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/home/new-user", req.url));
    }
  }

  if (pathname === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/home/pro-user", req.url));
    }
    return NextResponse.redirect(new URL("/home/new-user", req.url));
  }

  if (pathname === "/home/new-user" && accessToken) {
    return NextResponse.redirect(new URL("/home/pro-user", req.url));
  }

  if (isProtectedPath(pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return res;
}
