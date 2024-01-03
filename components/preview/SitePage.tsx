"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { GiSpiderWeb } from "react-icons/gi";
import { useSession } from "next-auth/react";
import {
  FormElementInstance,
  FormElements,
} from "@/components/build/FormElements";
import { formatDistance } from "date-fns";
import { SiteType } from "@/types";

interface props {
  data: SiteType;
}

const SitePage: React.FC<props> = ({ data }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);

  const session = useSession();
  const user = session.data?.user;

  const postContent = JSON.parse(data.content) as FormElementInstance[];

  return (
    <>
      {domLoaded && (
        <main className="">
          <FormSubmitComponent content={postContent} />
          <h1 className="py-10 text-2xl">About the Author</h1>
        </main>
      )}
    </>
  );
};

function FormSubmitComponent({ content }: { content: FormElementInstance[] }) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  console.log("fire");

  return (
    <div className="flex justify-center w-full h-full items-center text-justify">
      <div className="flex flex-col gap-4 flex-grow bg-background overflow-y-auto ">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SitePage;
