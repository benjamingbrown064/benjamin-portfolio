import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format section number with leading zeros
export function sectionNum(n: number): string {
  return n.toString().padStart(3, "0");
}
