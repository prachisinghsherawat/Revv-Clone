import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { cities, footerLinks } from "@/data/content";
import Button from "@/components/ui/Button";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success("You are on the list. Offers land in your inbox every Friday.");
    setEmail("");
  };

  return (
    <footer className="mt-24 bg-ink-950 text-ink-300">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-500 font-display text-lg font-extrabold text-white">
                R
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                revv
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              India&apos;s largest company-owned self drive fleet. Book by the hour, the day or the
              month, and drive away without a single form to sign.
            </p>

            <form onSubmit={subscribe} className="mt-8 max-w-sm">
              <label htmlFor="newsletter" className="field-label text-ink-400">
                Get weekly offers
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-ink-800 bg-ink-900 px-4 py-3 text-sm font-medium text-white transition placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
                />
                <Button type="submit" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm transition hover:text-brand-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-ink-800 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Car rental across India
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {cities.map((name) => (
              <li key={name}>
                <Link
                  to="/cars"
                  className="text-sm text-ink-400 transition hover:text-brand-400"
                >
                  Self drive cars in {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-ink-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Revv clone. Built as a React learning project, not
            affiliated with Revv.
          </p>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-xl border border-ink-800 text-ink-400 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
