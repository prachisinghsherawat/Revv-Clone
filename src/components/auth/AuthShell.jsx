import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

const points = [
  { icon: Zap, text: "Book in under two minutes" },
  { icon: ShieldCheck, text: "Documents verified once, reused forever" },
  { icon: Sparkles, text: "Member-only prices on every car" },
];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink-950 lg:block">
        <img
          src="/images/firstimage.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-600 font-display text-lg font-extrabold text-white">
              R
            </span>
            <span className="font-display text-2xl font-extrabold text-white">revv</span>
          </Link>

          <div>
            <h2 className="max-w-md font-display text-4xl font-extrabold leading-tight text-white">
              4,000 cars. 20 cities. One account.
            </h2>
            <ul className="mt-8 space-y-4">
              {points.map(({ icon: Icon, text }, index) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                  className="flex items-center gap-3 text-ink-200"
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-brand-400">
                    <Icon size={17} />
                  </span>
                  <span className="text-sm font-semibold">{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-ink-500">
            A React learning project. Not affiliated with Revv.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold text-ink-950">{title}</h1>
          <p className="mt-2 text-sm text-ink-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 text-center text-sm text-ink-500">{footer}</div>
        </motion.div>
      </div>
    </div>
  );
}
