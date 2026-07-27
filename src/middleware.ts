import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function middleware(req: NextRequest) {
//   const auth = await getAuth(req);
const { getUser, isAuthenticated } = /*await*/ getKindeServerSession();

const user = await getUser();
const loggedIn = await isAuthenticated();
//   if (!auth?.user) {
if (!loggedIn) {
    return NextResponse.redirect(new URL("/api/auth/[kindeAuth]", req.url));
  }
  return NextResponse.next();
//   return <div>Welcome {user?.given_name}</div>;
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected/:path*"],
};