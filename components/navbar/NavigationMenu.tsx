"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
import { AiOutlineShop } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import {
  MdDashboard,
  MdHeadset,
  MdOutlineLabel,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";

export function NavigationMenuDemo() {
  const user = useSession();

  return (
    <NavigationMenu className="">
      <NavigationMenuList className="gap-10 text-card-foreground">
        <NavigationMenuItem className="text-card-foreground">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="text-sm">Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className="text-sm">
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* ADMIN PANEL */}
        {/* {user?.data?.user?.role == "admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className={``}>Admin</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col gap-3 p-6 w-[500px]">
                <Link
                  href={"/admin/dashboard"}
                  className={
                    " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  }
                >
                  <div>
                    <div className="text-base font-medium leading-none">
                      Dashboard
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      All your controls at your fingertips
                    </p>
                  </div>
                  <div className="ml-auto">
                    <MdDashboard className={"w-8 h-8"} />
                  </div>
                </Link>
                <Link
                  href={"/admin/orders"}
                  className={
                    " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  }
                >
                  <div>
                    <div className="text-base font-medium leading-none">
                      Order
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View orders placed by your customers
                    </p>
                  </div>
                  <div className="ml-auto">
                    <AiOutlineShop className={"w-8 h-8"} />
                  </div>
                </Link>

                <Link
                  href={"/admin/products"}
                  className={
                    " flex items-center gap-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  }
                >
                  <div>
                    <div className="text-base font-medium leading-none">
                      Products
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Create or edit your online products
                    </p>
                  </div>
                  <div className="ml-auto">
                    <MdHeadset className={"w-8 h-8"} />
                  </div>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )} */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
