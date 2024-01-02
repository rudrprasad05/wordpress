"use client";

import DropDownNav from "@/components/navbar/DropDownNav";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log(session.data?.user);
  return (
    <div className="">
      <CreateNew />
      <Button onClick={() => signOut({ callbackUrl: "/" })}>signoit</Button>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
    </div>
  );
}

function CreateNew() {
  return (
    <div className="flex justify-between">
      <div>Dashboard</div>
      <div>
        <Link className={buttonVariants({ variant: "secondary" })} href={"new"}>
          New
        </Link>
      </div>
    </div>
  );
}
