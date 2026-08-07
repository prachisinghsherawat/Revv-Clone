import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, Phone, User, X } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import useBookingStore from "@/store/useBookingStore";
import { cities } from "@/data/content";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Self drive cars", to: "/cars" },
  { label: "Subscriptions", to: "/cars?sort=price-desc" },
  { label: "About", to: "/about" },
  { label: "FAQs", to: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const { pathname } = useLocation();
  const [lastPath, setLastPath] = useState(pathname);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { city, setSearch } = useBookingStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setCityOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Signed out. See you on the next trip.");
    navigate("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-100 bg-white/90 backdrop-blur-xl"
          : "border-b border-transparent bg-white",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Revv home">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-500 font-display text-lg font-extrabold text-white shadow-glow">
              R
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight text-ink-950">
              revv
            </span>
          </Link>

          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setCityOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
            >
              {city}
              <ChevronDown size={15} className={cn("transition", cityOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {cityOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCityOpen(false)} />
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 z-20 mt-2 grid w-64 grid-cols-2 gap-1 rounded-2xl border border-ink-100 bg-white p-2 shadow-lift"
                  >
                    {cities.map((name) => (
                      <li key={name}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch({ city: name });
                            setCityOpen(false);
                            toast.success(`Showing cars in ${name}`);
                          }}
                          className={cn(
                            "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition",
                            name === city
                              ? "bg-brand-50 text-brand-700"
                              : "text-ink-600 hover:bg-ink-100",
                          )}
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3.5 py-2 text-sm font-semibold transition",
                  isActive && link.to === pathname
                    ? "text-brand-600"
                    : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+911800000000"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-100 xl:flex"
          >
            <Phone size={15} />
            1800 000 000
          </a>

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex items-center gap-2 rounded-xl bg-ink-100 px-3 py-2 text-sm font-bold text-ink-800">
                <User size={15} />
                {user.name.split(" ")[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Sign out">
                <LogOut size={15} />
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" to="/login">
                Log in
              </Button>
              <Button size="sm" to="/signup">
                Sign up
              </Button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid size-10 place-items-center rounded-xl border border-ink-200 text-ink-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-white p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-extrabold">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-10 place-items-center rounded-xl border border-ink-200"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="rounded-xl px-4 py-3.5 text-lg font-bold text-ink-800 transition hover:bg-ink-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 rounded-2xl bg-ink-50 p-4">
                <p className="field-label">Your city</p>
                <select
                  value={city}
                  onChange={(event) => setSearch({ city: event.target.value })}
                  className="field-input"
                >
                  {cities.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                {isAuthenticated ? (
                  <>
                    <p className="text-sm font-semibold text-ink-500">Signed in as {user.email}</p>
                    <Button variant="outline" size="lg" onClick={handleLogout}>
                      <LogOut size={16} /> Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" to="/signup">
                      Create an account
                    </Button>
                    <Button variant="outline" size="lg" to="/login">
                      Log in
                    </Button>
                  </>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
