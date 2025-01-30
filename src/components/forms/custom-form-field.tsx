"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

export enum FormFieldType {
  INPUT = "input",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  type?: "input" | "password" | "email" | "number";
  placeholder?: string;
  required?: boolean;
  fieldType: FormFieldType;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, ...restProps } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border focus-within:border-primary transition">
          {props.icon}
          <FormControl>
            <Input {...field} {...restProps} />
          </FormControl>
        </div>
      );

    default:
      return null;
  }
};

export function CustomFormField(props: CustomProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.label && (
            <FormLabel>
              {props.label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}
