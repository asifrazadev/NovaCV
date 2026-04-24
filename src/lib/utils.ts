import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEmptyHtml(html: string | undefined | null) {
  if (!html) return true
  const text = html.replace(/<[^>]*>/g, "").trim()
  return text === ""
}
