"use client";

import React from "react";
import Image from "next/image";
import AuthButton from "./authButton";
import { NavigationMenuDemo } from "./NavigationMenu";
import MobileNav from "./MobileNav";
import { IoMenuOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Badge } from "../ui/badge";
import { FaSpinner } from "react-icons/fa";

const DropDownNav = () => {
  return (
    <nav className="z-50 w-screen bg-card">
      <main className="hidden md:flex z-50 items-center justify-between h-[15vh]  mx-auto w-4/5">
        <div className="">
          <Image src={"/logo.png"} alt="MC Tech" height={50} width={50} />
        </div>
        <div className="flex gap-10">
          <NavigationMenuDemo />
        </div>

        <div>
          <AuthButton />
        </div>
      </main>

      <main className="flex items-center justify-between w-4/5 mx-auto pt-10 md:hidden">
        <div>McTech</div>
        <div className="flex gap-5">
          <MobileNav>
            <IoMenuOutline className="h-8 w-8" />
          </MobileNav>
        </div>
      </main>
    </nav>
  );
};

export default DropDownNav;
