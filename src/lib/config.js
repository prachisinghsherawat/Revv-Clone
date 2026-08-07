const env = import.meta.env;

export const config = {
  appName: env.VITE_APP_NAME ?? "Revv",
  supportPhone: env.VITE_SUPPORT_PHONE ?? "1800 000 000",
  supportEmail: env.VITE_SUPPORT_EMAIL ?? "support@revv.example",
  apiBaseUrl: env.VITE_API_BASE_URL ?? "",
  defaultCity: env.VITE_DEFAULT_CITY ?? "Delhi NCR",
  mockPayments: env.VITE_ENABLE_MOCK_PAYMENTS !== "false",
};

export default config;
