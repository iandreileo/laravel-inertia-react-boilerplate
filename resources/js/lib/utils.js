import clsx from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// format date
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US");
}
