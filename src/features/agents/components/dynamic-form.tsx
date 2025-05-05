"use client";

// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DynamicFormConfig,
  FormField,
  ValidationRule,
} from "@/features/agents/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DynamicFormProps = {
  formConfig: DynamicFormConfig;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
};

export function DynamicForm({
  formConfig,
  onSubmit,
  isLoading = false,
}: DynamicFormProps) {
  // const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const generateZodSchema = (fields: FormField[]) => {
    const schemaMap: Record<string, any> = {};

    fields.forEach((field) => {
      let fieldSchema: any = z.any();

      switch (field.type) {
        case "text":
        case "textarea":
        case "password":
          fieldSchema = z.string();
          break;
        case "email":
          fieldSchema = z.string().email({ message: "Invalid email address" });
          break;
        case "number":
          fieldSchema = z.number();
          break;
        case "checkbox":
          fieldSchema = z.boolean();
          break;
        case "select":
        case "radio":
          fieldSchema = z.string();
          break;
        case "file":
          fieldSchema = z.any();
          break;
        case "date":
          fieldSchema = z.string();
          break;
        default:
          fieldSchema = z.string();
      }

      if (field.validation) {
        field.validation.forEach((rule: ValidationRule) => {
          switch (rule.type) {
            case "required":
              fieldSchema = fieldSchema.nonempty({ message: rule.message });
              break;
            case "min":
              if (field.type === "number" && typeof rule.value === "number") {
                fieldSchema = fieldSchema.min(rule.value, {
                  message: rule.message,
                });
              }
              break;
            case "max":
              if (field.type === "number" && typeof rule.value === "number") {
                fieldSchema = fieldSchema.max(rule.value, {
                  message: rule.message,
                });
              }
              break;
            case "minLength":
              if (typeof rule.value === "number") {
                fieldSchema = fieldSchema.min(rule.value, {
                  message: rule.message,
                });
              }
              break;
            case "maxLength":
              if (typeof rule.value === "number") {
                fieldSchema = fieldSchema.max(rule.value, {
                  message: rule.message,
                });
              }
              break;
            case "pattern":
              if (typeof rule.value === "string") {
                fieldSchema = fieldSchema.regex(new RegExp(rule.value), {
                  message: rule.message,
                });
              }
              break;
            case "email":
              fieldSchema = z.string().email({ message: rule.message });
              break;
          }
        });
      }

      schemaMap[field.name] = fieldSchema;
    });

    return z.object(schemaMap);
  };

  const formSchema = generateZodSchema(formConfig.fields);

  const getDefaultValues = () => {
    const defaults: Record<string, any> = {};
    formConfig.fields.forEach((field) => {
      defaults[field.name] =
        field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === "checkbox"
          ? false
          : field.type === "number"
          ? 0
          : "";
    });
    return defaults;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  const handleFileChange = (
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(fieldName, e);
    // const file = e.target.files?.[0] || null;
    // setFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  const renderFormField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <FormFieldUI
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    className={field.className}
                  />
                </FormControl>
                {field.helperText && (
                  <FormDescription>{field.helperText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormFieldUI
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    {...formField}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    className={field.className}
                  />
                </FormControl>
                {field.helperText && (
                  <FormDescription>{field.helperText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormFieldUI
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value as string}
                  disabled={field.disabled}
                >
                  <FormControl>
                    <SelectTrigger className={field.className}>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.helperText && (
                  <FormDescription>{field.helperText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "radio":
        return (
          <FormFieldUI
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="space-y-3">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value as string}
                    className="flex flex-col space-y-1"
                    disabled={field.disabled}
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`${field.name}-${option.value}`}
                        />
                        <Label htmlFor={`${field.name}-${option.value}`}>
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                {field.helperText && (
                  <FormDescription>{field.helperText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormFieldUI
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded">
                <FormControl>
                  <Checkbox
                    checked={formField.value as boolean}
                    onCheckedChange={formField.onChange}
                    disabled={field.disabled}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{field.label}</FormLabel>
                  {field.helperText && (
                    <FormDescription>{field.helperText}</FormDescription>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "file":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type="file"
              onChange={(e) => handleFileChange(field.name, e)}
              disabled={field.disabled}
              className={field.className}
            />
            {field.helperText && (
              <p className="text-sm text-gray-500">{field.helperText}</p>
            )}
          </div>
        );

      case "date":
        return (
          <FormFieldUI
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type="date"
                    disabled={field.disabled}
                    className={field.className}
                  />
                </FormControl>
                {field.helperText && (
                  <FormDescription>{field.helperText}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full glass-card sticky top-24">
      <CardHeader>
        {formConfig.title && (
          <CardTitle className="text-2xl font-semibold mb-6">
            {formConfig.title}
          </CardTitle>
        )}
        {formConfig.description && (
          <CardDescription className="text-sm">
            {formConfig.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {formConfig.fields.map((field) => (
              <div key={field.id} className="space-y-4">
                {renderFormField(field)}
              </div>
            ))}
            <CardFooter className="flex justify-between px-0 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : formConfig.submitLabel || "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
