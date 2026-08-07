import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-200",
        isOpen ? "border-brand-200 bg-brand-50/40" : "border-ink-100 bg-white hover:border-ink-200",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-base font-bold text-ink-900 sm:text-lg">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
            isOpen ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-600",
          )}
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 sm:px-6 sm:pb-6 sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false, className }) {
  const [open, setOpen] = useState([]);

  const toggle = (key) => {
    setOpen((current) => {
      if (current.includes(key)) return current.filter((k) => k !== key);
      return allowMultiple ? [...current, key] : [key];
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const key = item.question ?? index;
        return (
          <AccordionItem
            key={key}
            question={item.question}
            answer={item.answer}
            isOpen={open.includes(key)}
            onToggle={() => toggle(key)}
          />
        );
      })}
    </div>
  );
}
