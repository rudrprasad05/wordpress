import { GetSiteByName } from "@/actions/site";
import SitePage from "@/components/preview/SitePage";
import { Suspense } from "react";

async function page({ params }: { params: { name: string } }) {
  const { name } = params;
  const site = await GetSiteByName(name);

  if (!site) {
    return <>No forms</>;
  }

  return (
    <div className="w-full">
      <SitePage data={site} />
    </div>
  );
}

export default page;
