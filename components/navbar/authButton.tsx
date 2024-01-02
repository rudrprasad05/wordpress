"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import EditProfileSheet from "./EditProfileSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarComponentProps {
  fallback: string;
  src: string | null | undefined;
}

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <>
      {!session?.user ? (
        <Link
          className={clsx(
            "rounded-full",
            buttonVariants({ variant: "secondary" })
          )}
          href={"/login"}
        >
          Login
        </Link>
      ) : (
        <div className="mt-auto flex items-end">
          <EditProfileSheet user={session?.user}>
            <AvatarComponent
              fallback={session.user.name?.slice(0, 2).toUpperCase() || "AD"}
              src={session?.user?.image}
            />
          </EditProfileSheet>
        </div>
      )}
    </>
  );
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({ fallback, src }) => {
  return (
    <Avatar>
      <AvatarImage src={src || ""} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
