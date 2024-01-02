import { getCurrentUser } from "@/actions/user";
import DashRedirect from "@/components/DashRedirect";
import React from "react";

export default async function page() {
  const user = await getCurrentUser();

  return <div>{user && <DashRedirect user={user} />}</div>;
}
