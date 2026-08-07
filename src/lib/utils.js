import clsx from "clsx";

export const cn = (...inputs) => clsx(inputs);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (value) => inr.format(Math.round(value || 0));

export const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

export const toISODate = (date) => date.toISOString().split("T")[0];

export const today = () => toISODate(new Date());

export const addDays = (isoDate, days) => {
  const date = new Date(isoDate);
  date.setDate(date.getDate() + days);
  return toISODate(date);
};

export const daysBetween = (start, end) => {
  if (!start || !end) return 1;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.round(diff / 86400000));
};

export const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDateShort = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export const slugToTitle = (value) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const bookingReference = () =>
  `RV${Math.random().toString(36).slice(2, 7).toUpperCase()}${Date.now().toString().slice(-4)}`;
