import { SiteType } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { buttonVariants } from "../ui/button";

interface DisplaySitesProps {
  sites: SiteType[];
}
interface SiteCardProps {
  site: SiteType;
}

const DisplaySites: React.FC<DisplaySitesProps> = ({ sites }) => {
  if (!sites) return null;
  return (
    <div>
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
};

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
  if (!site) return null;
  const date = getDate(site.createdAt.toString());
  return (
    <Card>
      <CardHeader>
        <CardTitle>{site.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href={`/dashboard/build/${site.id}`}
          className={buttonVariants({ variant: "outline" })}
        >
          <div>
            <MdOutlineEdit />
          </div>
        </Link>
      </CardContent>
      <CardFooter>
        <CardDescription>{date.month}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export const getDate = (data: string) => {
  const MONTHS = [
    "Jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const date = new Date(data);
  const dayOfMonth = date.getDate();
  const month =
    MONTHS[date.getMonth()].charAt(0).toUpperCase() +
    MONTHS[date.getMonth()].slice(1);
  const year = date.getFullYear();

  const tempDate = { dayOfMonth, month, year };
  return tempDate;
};

export default DisplaySites;
