"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@prisma/client";

import React, { useContext } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import { signOut, useSession } from "next-auth/react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface props {
  children?: React.ReactNode;
}

const MobileNav: React.FC<props> = ({ children }) => {
  const user = useSession();
  const handleClick = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>McTech Computers</SheetTitle>
          <SheetDescription className="relative h-full"></SheetDescription>
        </SheetHeader>
        <div>
          <ul>
            <li>
              <Link href="/" legacyBehavior passHref>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" legacyBehavior passHref>
                Products
              </Link>
            </li>
          </ul>
        </div>
        <SheetFooter className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex justify-between w-full">
            <ThemeSwitcher />
            {user.status == "authenticated" && (
              <Button onClick={() => handleClick()}>Signout</Button>
            )}
            {user.status == "unauthenticated" && (
              <Link
                className={buttonVariants({ variant: "default" })}
                href={"/login"}
              >
                Login
              </Link>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
