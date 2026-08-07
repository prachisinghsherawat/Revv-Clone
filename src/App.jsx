import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";

const Cars = lazy(() => import("@/pages/Cars"));
const CarDetail = lazy(() => import("@/pages/CarDetail"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const BookingConfirmed = lazy(() => import("@/pages/BookingConfirmed"));
const Faq = lazy(() => import("@/pages/Faq"));
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return (
    <div className="container-page py-32">
      <div className="mx-auto size-10 animate-spin rounded-full border-3 border-ink-200 border-t-brand-500" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cars" element={<Cars />} />
            <Route path="cars/:carId" element={<CarDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="booking/:reference" element={<BookingConfirmed />} />
            <Route path="faq" element={<Faq />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3200,
          style: {
            background: "#10131f",
            color: "#fff",
            borderRadius: "14px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: 600,
          },
          success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#f92c4b", secondary: "#fff" } },
        }}
      />
    </>
  );
}
