import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 16 }}
        className="font-display text-[7rem] font-extrabold leading-none text-brand-500 sm:text-[10rem]"
      >
        404
      </motion.p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink-950 sm:text-4xl">
        This road does not go anywhere
      </h1>
      <p className="mt-3 max-w-md text-base text-ink-500">
        The page you were looking for has moved, or never existed. Let us get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" to="/">
          <Home size={17} />
          Back home
        </Button>
        <Button variant="outline" size="lg" to="/cars">
          <Search size={17} />
          Browse cars
        </Button>
      </div>
    </div>
  );
}
