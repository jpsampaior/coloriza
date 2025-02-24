import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseISO, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateByString(date: string) {
  return format(parseISO(date), "dd/MM/yyyy")
}

export function getLabelByFluidAmount(amount: number) {
  return amount > 1 || amount < 1 ? "litros" : "litro";
}
