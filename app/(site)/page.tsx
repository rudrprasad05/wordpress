"use client";

import DropDownNav from "@/components/navbar/DropDownNav";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log(session.data?.user);
  return (
    <div className="">
      <DropDownNav />
      <Button onClick={() => signOut({ callbackUrl: "/" })}>signoit</Button>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
    </div>
  );
}
