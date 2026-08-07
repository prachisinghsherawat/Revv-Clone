import clsx from "clsx";

export const cn = (...inputs) => clsx(inputs);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (value) => inr.format(Math.round(value || 0));

export const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

export const toISODate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const parseISODate = (iso) => {
  if (!iso) return null;
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const today = () => toISODate(new Date());

export const addDays = (isoDate, days) => {
  const date = parseISODate(isoDate) ?? new Date();
  date.setDate(date.getDate() + days);
  return toISODate(date);
};

export const daysBetween = (start, end) => {
  const from = parseISODate(start);
  const to = parseISODate(end);
  if (!from || !to) return 1;
  return Math.max(1, Math.round((to.getTime() - from.getTime()) / 86400000));
};

export const formatDate = (iso) => {
  const date = parseISODate(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDateShort = (iso) => {
  const date = parseISODate(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export const formatDateLong = (iso) => {
  const date = parseISODate(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export const slugToTitle = (value) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const bookingReference = () =>
  `RV${Math.random().toString(36).slice(2, 7).toUpperCase()}${Date.now().toString().slice(-4)}`;
