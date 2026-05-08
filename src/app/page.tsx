import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import type { styleText } from "util";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";



export default async function Home() {
  return (
    <h1 className="text-red-900" style={{ textAlign: "center" }}>
      <Button>Hello, World!</Button>
      <Button>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </h1>
  );
}
