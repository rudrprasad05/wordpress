"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/useDesigner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BsImage, BsTextParagraph } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MdOutlineCheck } from "react-icons/md";
import Image from "next/image";

const type: ElementsType = "ImageField";

const extraAttributes = {
  text: "No image Selected",
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export const ImageFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsImage,
    label: "Image Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  return (
    <div className="flex gap-2 w-full">
      <Label className="text-muted-foreground">Image field</Label>
      <Image
        width={100}
        height={100}
        alt={text}
        src={`https://mctechfiji.s3.amazonaws.com/mctechuploads/${text}`}
      />
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return (
    <Image
      width={100}
      height={100}
      alt={text}
      src={`https://mctechfiji.s3.amazonaws.com/mctechuploads/${text}`}
    />
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const [loadingImage, setLoadingImage] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: element.extraAttributes.text,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  async function applyChanges(values: propertiesFormSchemaType) {
    let filename = "";
    await handleImageUpload().then(
      () =>
        (filename =
          `https://mctechfiji.s3.amazonaws.com/mctechuploads/${file?.name}` as string)
    );

    // const { text } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text: filename,
      },
    });
  }

  const handleImageUpload = async () => {
    // setloadingImage(true);
    console.log("fired", file?.name);
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          // setloadingImage(false);
          // setFormReadyToUpload(true);
          // toast.success("Image Uploaded to Cloud");
        })
        .catch((e) => {
          console.log(e);
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=""
      >
        <div className="flex flex-col">
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <Button
            className="flex items-center"
            type="button"
            onClick={() => handleImageUpload()}
          >
            {/* {loadingImage && <FaSpinner className={"animate-spin mr-3"} />} */}
            {/* {!formReadyToUpload && "Upload"} */}
            {/* {formReadyToUpload && ( */}
            <>
              <MdOutlineCheck className={"mr-3"} />
              Uploaded
            </>
            {/* )} */}
          </Button>
        </div>
      </form>
    </Form>
  );
}
