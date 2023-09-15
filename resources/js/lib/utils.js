export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
