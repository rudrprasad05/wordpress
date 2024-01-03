import { GetSites } from "@/actions/site";
import { CreateNewSiteBtn } from "@/components/dash/CreateNewSiteBtn";
import DisplaySites from "@/components/dash/DisplaySites";

export default async function Home() {
  const sites = await GetSites();
  return (
    <div className="">
      <div className="py-10">
        <h1 className="text-xl">Dashboard</h1>
      </div>
      <div>
        <DisplaySites sites={sites} />
      </div>
      <div className="grid grid-cols-3 gap-10">
        <CreateNewSiteBtn />
      </div>
      {/* <Button onClick={() => signOut({ callbackUrl: "/" })}>signoit</Button>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link> */}
    </div>
  );
}
