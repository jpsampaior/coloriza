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
  INPUTMASK = "inputmask",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  type?: "input" | "password" | "email" | "number" | "date" | "colorHex";
  placeholder?: string;
  required?: boolean;
  fieldType: FormFieldType;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
  mask?: string;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, type, ...restProps } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [hasText, setHasText] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border focus-within:border-primary transition items-center px-2">
          {props.icon && (
            <props.icon
              size={20}
              className="bg-dark-400 text-zinc-300 h-11 ml-2"
              style={type === "colorHex" ? { color: field.value } : undefined}
            />
          )}
          <FormControl>
            <Input
              {...field}
              {...restProps}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              className="flex-1 border-none focus:ring-0"
              onChange={(e) => {
                let value = e.target.value;
                type === "number"
                  ? field.onChange(parseFloat(value))
                  : field.onChange(value);
                setHasText(!!value);
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

      {
        /*TODO: Implement InputMask*/
      }

    // case FormFieldType.INPUTMASK:
    //   return (
    //     <div className="flex rounded-md border focus-within:border-primary transition items-center px-2">
    //       {props.icon && (
    //         <props.icon
    //           size={20}
    //           className="bg-dark-400 text-zinc-300 h-11 ml-2"
    //           style={type === "colorHex" ? { color: field.value } : undefined}
    //         />
    //       )}
    //       <FormControl>
    //         <InputMask
    //           {...field}
    //           {...restProps}
    //           type={type}
    //           className="flex-1 border-none focus:ring-0"
    //           onChange={(e) => field.onChange(e.target.value)}
    //         >
    //           <Input />
    //         </InputMask>
    //       </FormControl>
    //     </div>
    //   );
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
          <div className="flex items-center justify-between">
            {props.label && (
              <FormLabel className="text-neutral-950">
                {props.label}
                {/* {props.required && <span className="text-red-500 ml-1">*</span>} */}
              </FormLabel>
            )}
            <FormMessage className="text-red-400" />
          </div>
          <RenderField field={field} props={props} />
        </FormItem>
      )}
    />
  );
}
