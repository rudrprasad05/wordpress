"use client";

import { UserType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

function DashRedirect({ user }: { user: UserType }) {
  const router = useRouter();
  useEffect(() => {
    router.push(`/dashboard/${user.name}`);
  });
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <FaSpinner className={"animate-spin h-16 w-16"} />
        <div className="text-xl">Redirecting</div>
      </div>
    </div>
  );
}

export default DashRedirect;
