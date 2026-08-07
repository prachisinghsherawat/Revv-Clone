import { priceForPlan } from "@/data/cars";
import { coupons } from "@/data/content";
import { daysBetween } from "./utils";

export const addOnCatalog = [
  { id: "gps", label: "GPS navigation unit", price: 149, unit: "day" },
  { id: "child-seat", label: "Child safety seat", price: 199, unit: "day" },
  { id: "second-driver", label: "Additional driver", price: 0, unit: "trip" },
  { id: "delivery", label: "Doorstep delivery & pickup", price: 499, unit: "trip" },
  { id: "fuel-pass", label: "Prepaid fuel pass", price: 999, unit: "trip" },
];

export const quote = ({ car, planId, startDate, endDate, addOns = [], couponCode }) => {
  const days = daysBetween(startDate, endDate);
  const perDay = priceForPlan(car, planId);
  const subtotal = perDay * days;

  const addOnLines = addOnCatalog
    .filter((item) => addOns.includes(item.id))
    .map((item) => ({
      ...item,
      total: item.unit === "day" ? item.price * days : item.price,
    }));

  const addOnTotal = addOnLines.reduce((sum, line) => sum + line.total, 0);

  const coupon = couponCode ? coupons[couponCode] : null;
  const discount = coupon
    ? coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : Math.min(coupon.value, subtotal)
    : 0;

  const taxable = Math.max(0, subtotal + addOnTotal - discount);
  const tax = Math.round(taxable * 0.18);
  const total = taxable + tax;

  return {
    days,
    perDay,
    subtotal,
    addOnLines,
    addOnTotal,
    coupon: coupon ? { code: couponCode, ...coupon } : null,
    discount,
    tax,
    total,
    deposit: car.deposit,
    payNow: total,
  };
};
