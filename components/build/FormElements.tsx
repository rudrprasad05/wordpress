import { CheckboxFieldFormElement } from "@/components/build/fields/CheckboxField";
import { DateFieldFormElement } from "@/components/build/fields/DateField";
import { NumberFieldFormElement } from "@/components/build/fields/NumberField";
import { ParagprahFieldFormElement } from "@/components/build/fields/ParagraphField";
import { SelectFieldFormElement } from "@/components/build/fields/SelectField";
import { SeparatorFieldFormElement } from "@/components/build/fields/SeparatorField";
import { SpacerFieldFormElement } from "@/components/build/fields/SpacerField";
import { SubTitleFieldFormElement } from "@/components/build/fields/SubTitleField";
import { TextAreaFormElement } from "@/components/build/fields/TextAreaField";
import { TextFieldFormElement } from "@/components/build/fields/TextField";
import { TitleFieldFormElement } from "@/components/build/fields/TitleField";
import { ImageFieldFormElement } from "@/components/build/fields/ImageField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"
  | "ImageField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagprahFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
  ImageField: ImageFieldFormElement,
};
