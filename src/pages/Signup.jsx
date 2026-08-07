import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AuthShell from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

const strengthOf = (value = "") => {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
};

const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
const colors = ["bg-ink-200", "bg-brand-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

export default function Signup() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { password: "" } });

  const password = useWatch({ control, name: "password" });
  const score = strengthOf(password);

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const result = signup(values);
    if (!result.ok) {
      setError("email", { message: result.error });
      return;
    }
    toast.success(`Account created. Welcome, ${values.name.split(" ")[0]}.`);
    navigate("/cars", { replace: true });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="One account for rentals, subscriptions and everything in between."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-brand-600 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="field-label">
            Full name
          </label>
          <input
            id="name"
            autoComplete="name"
            className="field-input"
            placeholder="Your name"
            {...register("name", {
              required: "Enter your name",
              minLength: { value: 2, message: "That name looks too short" },
            })}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-semibold text-brand-600">{errors.name.message}</p>
          )}
        </div>

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
          <label htmlFor="phone" className="field-label">
            Mobile number
          </label>
          <input
            id="phone"
            inputMode="numeric"
            autoComplete="tel"
            className="field-input"
            placeholder="10 digit number"
            {...register("phone", {
              required: "Enter your mobile number",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid Indian mobile number" },
            })}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-semibold text-brand-600">{errors.phone.message}</p>
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
              autoComplete="new-password"
              className="field-input pr-12"
              placeholder="At least 8 characters"
              {...register("password", {
                required: "Choose a password",
                minLength: { value: 8, message: "Use at least 8 characters" },
              })}
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

          {password.length > 0 && (
            <div className="mt-2.5">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      index < score ? colors[score] : "bg-ink-200",
                    )}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-xs font-semibold text-ink-500">{labels[score]}</p>
            </div>
          )}

          {errors.password && (
            <p className="mt-1.5 text-xs font-semibold text-brand-600">{errors.password.message}</p>
          )}
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-600">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-brand-500"
            {...register("terms", { required: "Accept the terms to continue" })}
          />
          <span>
            I agree to the terms of service and confirm I hold a valid driving licence.
          </span>
        </label>
        {errors.terms && (
          <p className="-mt-3 text-xs font-semibold text-brand-600">{errors.terms.message}</p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
