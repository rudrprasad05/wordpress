import React from "react";
import useDesigner from "@/hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className="sticky top-10 w-[400px] max-w-[400px] grid grid-cols-1 gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
