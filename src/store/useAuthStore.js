import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: ({ email, password }) => {
        const accounts = get().accounts ?? {};
        const account = accounts[email.toLowerCase()];
        if (!account || account.password !== password) {
          return { ok: false, error: "We could not match that email and password." };
        }
        set({ user: { name: account.name, email: account.email, phone: account.phone }, isAuthenticated: true });
        return { ok: true };
      },

      signup: ({ name, email, phone, password }) => {
        const accounts = get().accounts ?? {};
        const key = email.toLowerCase();
        if (accounts[key]) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const account = { name, email: key, phone, password };
        set({
          accounts: { ...accounts, [key]: account },
          user: { name, email: key, phone },
          isAuthenticated: true,
        });
        return { ok: true };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      accounts: {},
    }),
    { name: "revv-auth" },
  ),
);

export default useAuthStore;
