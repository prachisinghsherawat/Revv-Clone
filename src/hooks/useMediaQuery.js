import { useSyncExternalStore } from "react";

const subscribe = (query) => (callback) => {
  const list = window.matchMedia(query);
  list.addEventListener("change", callback);
  return () => list.removeEventListener("change", callback);
};

export default function useMediaQuery(query) {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
