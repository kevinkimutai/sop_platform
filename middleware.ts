// import { getSession } from "next-auth/react";
// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// export async function middleware(request: NextRequest, _next: NextFetchEvent) {
//   const { pathname } = request.nextUrl;
//   const protectedPaths = ["/admin"];
//   const matchesProtectedPath = protectedPaths.some((path) =>
//     pathname.startsWith(path)
//   );
//   if (matchesProtectedPath) {
//     const session = await getSession();
//     console.log("SESSION", session);
//     if (!session) {
//       const url = new URL(`/signin`, request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     // if (session.role !== "admin") {
//     //   const url = new URL(`/403`, request.url);
//     //   return NextResponse.rewrite(url);
//     // }
//   }
//   return NextResponse.next();
// }
export default function () {}
