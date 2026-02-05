import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ----------------- Add this -----------------
export function getRandomInterviewCover() {
  const covers = [
    "https://example.com/cover1.jpg",
    "https://example.com/cover2.jpg",
    "https://example.com/cover3.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * covers.length);
  return covers[randomIndex];
}

