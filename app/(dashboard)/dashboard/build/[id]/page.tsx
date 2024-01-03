import { GetSiteById, GetSites } from "@/actions/site";
import FormBuilder from "@/components/build/FormBuilder";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetSiteById(id);
  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
