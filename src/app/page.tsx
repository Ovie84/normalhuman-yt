import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import type { styleText } from "util";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import LinkAccountButton from "@/components/link-account-button";
import ThemeToggle from "@/components/ui/theme-toggle";
import dynamic from "next/dynamic";

// const Mail = dynamic(
//   () => {
//     return import("./mail");
//   },
//   {
//     ssr: false,
//   },
// );

// const MailDashboard = () => {
//   return (
//     <>
//       <div className="absolute bottom-4 left-4">
//         <ThemeToggle />
//       </div>
//       <div className="text-red-900" style={{ textAlign: "center" }}>
//         <Button>Hello, World!</Button>
//         <Mail>
//           <Button>
//             <LoginLink>Sign in</LoginLink>
//           </Button>
//           <Button>
//             <RegisterLink>Sign up</RegisterLink>
//           </Button>
//           <LinkAccountButton />
//         </Mail>
//       </div>
//     </>
//   );
// };

//export default MailDashboard;

export default async function Home() {
  return (
    <>
      <div className="absolute bottom-4 left-4">
        <ThemeToggle />
      </div>
      <div className="text-red-900" style={{ textAlign: "center" }}>
        <Button>Hello, World!</Button>
        <Button>
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button>
          <RegisterLink>Sign up</RegisterLink>
        </Button>
        <LinkAccountButton />
      </div>
    </>
  );
}