import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addDays, today } from "@/lib/utils";

const useBookingStore = create(
  persist(
    (set) => ({
      city: "Delhi NCR",
      startDate: today(),
      endDate: addDays(today(), 2),
      startTime: "10:00",
      endTime: "10:00",
      planId: "240",
      carId: null,
      coupon: null,
      addOns: [],
      bookings: [],

      setSearch: (payload) => set((state) => ({ ...state, ...payload })),
      setPlan: (planId) => set({ planId }),
      selectCar: (carId) => set({ carId }),
      applyCoupon: (coupon) => set({ coupon }),
      clearCoupon: () => set({ coupon: null }),
      toggleAddOn: (id) =>
        set((state) => ({
          addOns: state.addOns.includes(id)
            ? state.addOns.filter((a) => a !== id)
            : [...state.addOns, id],
        })),
      confirmBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings], coupon: null, addOns: [] })),
    }),
    {
      name: "revv-booking",
      merge: (persisted, current) => {
        const state = { ...current, ...persisted };
        if (!state.startDate || state.startDate < today()) {
          state.startDate = today();
          state.endDate = addDays(today(), 2);
        } else if (state.endDate < state.startDate) {
          state.endDate = addDays(state.startDate, 1);
        }
        return state;
      },
    },
  ),
);

export default useBookingStore;
