import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AuthShell from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const result = login(values);
    if (!result.ok) {
      setError("password", { message: result.error });
      return;
    }
    toast.success("Welcome back");
    navigate(location.state?.from ?? "/cars", { replace: true });
  };

  return (
    <AuthShell
      title="Log in"
      subtitle="Pick up where you left off. Your documents stay verified."
      footer={
        <>
          New to Revv?{" "}
          <Link to="/signup" className="font-bold text-brand-600 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@example.com"
            {...register("email", {
              required: "Enter your email",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            })}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-semibold text-brand-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="field-input pr-12"
              placeholder="••••••••"
              {...register("password", { required: "Enter your password" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-400 transition hover:text-ink-700"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs font-semibold text-brand-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-600">
            <input type="checkbox" className="size-4 accent-brand-500" defaultChecked />
            Keep me signed in
          </label>
          <button type="button" className="text-sm font-bold text-brand-600 hover:underline">
            Forgot password?
          </button>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </AuthShell>
  );
}
