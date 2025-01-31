"use client";

import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Eye, EyeOff, LucideProps } from "lucide-react";

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
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  disabled?: boolean;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, type, ...restProps } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [hasText, setHasText] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex rounded-md border focus-within:border-primary transition items-center px-2">
      {props.icon && <props.icon size={20} className="bg-dark-400 text-zinc-300 h-11 ml-2"  />}
      <FormControl>
        <Input
          {...field}
          {...restProps}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="flex-1 border-none focus:ring-0"
          onChange={(e) => {
            field.onChange(e); // Mantém a integração com react-hook-form
            setHasText(e.target.value.length > 0); // Verifica se o input tem texto
          }}
        />
      </FormControl>
      {type === "password" && hasText && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="mr-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
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
