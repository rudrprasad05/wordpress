import DropDownNav from "@/components/navbar/DropDownNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-full relative">
      <DropDownNav />
      <div className="mx-auto h-full relative w-4/5">{children}</div>
    </main>
  );
}
