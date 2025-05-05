export type FormFieldType =
  | "text"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "file"
  | "number"
  | "email"
  | "password"
  | "date";

export type SelectOption = {
  value: string;
  label: string;
};

export type ValidationRule = {
  type:
    | "required"
    | "min"
    | "max"
    | "pattern"
    | "minLength"
    | "maxLength"
    | "email";
  value?: number | string;
  message: string;
};

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  defaultValue?: string | string[] | boolean | number;
  options?: SelectOption[];
  validation?: ValidationRule[];
  helperText?: string;
  disabled?: boolean;
  className?: string;
};

export type DynamicFormConfig = {
  id: string;
  title?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
};
