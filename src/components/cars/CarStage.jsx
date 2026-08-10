import CarModel from "./CarModel";
import { cn } from "@/lib/utils";

export default function CarStage({ car, color, className, modelClassName, tone = "light" }) {
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        tone === "light"
          ? "bg-[radial-gradient(120%_90%_at_50%_18%,#ffffff_0%,#eef1f6_58%,#dfe4ec_100%)]"
          : "bg-[radial-gradient(120%_90%_at_50%_18%,#2b3243_0%,#171c27_58%,#0e121b_100%)]",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-1/3",
          tone === "light"
            ? "bg-gradient-to-t from-black/8 to-transparent"
            : "bg-gradient-to-t from-black/40 to-transparent",
        )}
      />
      <CarModel
        segment={car.segment}
        color={color ?? car.color}
        spokes={car.dims?.spokes}
        title={car.name}
        className={cn("relative z-10 px-5", modelClassName)}
      />
    </div>
  );
}
