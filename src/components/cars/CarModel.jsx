import { useId } from "react";
import { cn } from "@/lib/utils";
import { paintRamp } from "@/lib/color";

/**
 * Four side profiles, all sharing one ground line at y=250 so cars sit level
 * with each other. Proportions follow the real thing: a hatchback gets a short
 * chopped tail, a sedan a separate boot, an SUV an upright glasshouse over big
 * wheels, an MUV a long one-box cabin.
 */
const bodies = {
  Hatchback: {
    front: 174,
    rear: 460,
    wheelR: 40,
    wheelY: 210,
    shell:
      "M100 226 C88 224 84 210 84 194 C84 180 90 168 104 162 C148 150 200 140 258 130 C282 108 302 86 332 70 C368 60 424 58 472 64 C500 70 520 88 528 110 C534 124 538 140 538 158 L538 196 C538 214 532 224 522 226 Z",
    glass: [
      "M272 124 L346 74 L392 72 L392 124 Z",
      "M404 72 L452 71 L478 124 L404 124 Z",
    ],
    pillars: ["M398 70 L398 126"],
    belt: "M264 128 L520 124",
    sill: "M120 220 L520 220",
    crease: "M124 178 C220 170 340 168 476 174",
    shutlines: ["M266 130 L266 216", "M398 128 L398 218", "M482 132 L482 214"],
    handles: [300, 414],
    handleY: 134,
    mirror: { x: 272, y: 124 },
    fuel: { cx: 502, cy: 150 },
    tail: { x: 506, y: 106, w: 14, h: 38 },
    head: { x: 88, y: 164, w: 36, h: 15 },
    grille: { x: 86, y: 190, w: 30, h: 13 },
  },
  Sedan: {
    front: 182,
    rear: 470,
    wheelR: 40,
    wheelY: 210,
    shell:
      "M92 228 C82 226 78 214 78 200 C78 186 84 174 98 168 C140 154 200 140 262 130 C286 110 308 86 342 70 C380 60 432 60 466 66 C488 80 500 96 510 112 C530 117 556 119 568 121 C578 126 582 140 582 158 L582 198 C582 218 576 226 566 228 Z",
    glass: [
      "M278 124 L350 74 L396 72 L396 124 Z",
      "M404 72 L452 70 L488 124 L404 124 Z",
    ],
    pillars: ["M400 70 L400 126"],
    belt: "M270 128 L560 126",
    sill: "M112 222 L558 222",
    crease: "M116 180 C230 172 380 170 520 176",
    shutlines: ["M272 130 L272 218", "M400 128 L400 220", "M492 132 L492 216"],
    handles: [306, 420],
    handleY: 134,
    mirror: { x: 278, y: 124 },
    fuel: { cx: 524, cy: 150 },
    tail: { x: 540, y: 130, w: 34, h: 14 },
    head: { x: 80, y: 168, w: 36, h: 15 },
    grille: { x: 78, y: 192, w: 30, h: 13 },
  },
  SUV: {
    front: 184,
    rear: 452,
    wheelR: 46,
    wheelY: 204,
    shell:
      "M110 224 C98 222 88 202 88 178 C88 156 96 140 112 134 C152 130 198 129 244 128 C262 108 278 78 302 60 C334 50 424 48 496 52 C518 58 528 74 532 96 C536 114 538 130 538 146 L538 194 C538 214 532 222 520 224 Z",
    glass: [
      "M256 116 L312 64 L366 62 L366 116 Z",
      "M378 62 L440 61 L450 116 L378 116 Z",
      "M462 62 L492 64 L500 116 L462 116 Z",
    ],
    pillars: ["M372 60 L372 118", "M456 60 L456 118"],
    belt: "M250 120 L522 118",
    sill: "M120 216 L520 216",
    crease: "M128 168 C230 160 372 158 508 164",
    shutlines: ["M252 122 L252 210", "M372 120 L372 212", "M456 122 L456 210"],
    cladding: true,
    rails: "M318 54 L476 55",
    handles: [288, 396],
    handleY: 126,
    mirror: { x: 256, y: 116 },
    fuel: { cx: 512, cy: 142 },
    tail: { x: 502, y: 82, w: 15, h: 42 },
    head: { x: 92, y: 140, w: 40, h: 17 },
    grille: { x: 90, y: 170, w: 34, h: 15 },
  },
  MUV: {
    front: 186,
    rear: 464,
    wheelR: 44,
    wheelY: 206,
    shell:
      "M108 226 C96 224 86 204 86 180 C86 158 94 144 110 138 C134 136 158 135 186 132 C212 116 246 84 286 62 C340 52 440 50 508 56 C532 60 546 76 550 100 C554 118 556 134 556 150 L556 196 C556 216 550 224 540 226 Z",
    glass: [
      "M210 118 L296 64 L348 62 L348 118 Z",
      "M356 62 L424 61 L424 118 L356 118 Z",
      "M432 61 L500 63 L512 118 L432 118 Z",
    ],
    pillars: ["M352 60 L352 120", "M428 60 L428 120"],
    belt: "M204 122 L538 120",
    sill: "M114 220 L540 220",
    crease: "M120 172 C240 164 400 162 530 168",
    shutlines: ["M206 124 L206 214", "M352 122 L352 216", "M428 122 L428 216"],
    rails: "M318 54 L500 57",
    handles: [258, 374, 452],
    handleY: 128,
    mirror: { x: 210, y: 118 },
    fuel: { cx: 534, cy: 146 },
    tail: { x: 520, y: 88, w: 15, h: 44 },
    head: { x: 90, y: 144, w: 40, h: 17 },
    grille: { x: 88, y: 174, w: 34, h: 15 },
  },
};

const segmentToBody = (segment) => (bodies[segment] ? segment : "Hatchback");

function Wheel({ cx, cy, r, id, spokes = 5 }) {
  const rim = r * 0.62;
  const count = Math.max(5, spokes);

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0a0c11" />
      <circle cx={cx} cy={cy} r={r - 1} fill={`url(#${id}-tyre)`} />
      {/* tread shoulder */}
      <circle cx={cx} cy={cy} r={r - 3.5} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={r * 0.8} fill="#0f1218" />
      {/* brake disc behind the spokes */}
      <circle cx={cx} cy={cy} r={r * 0.66} fill={`url(#${id}-disc)`} />
      <path
        d={`M${cx + r * 0.32} ${cy - r * 0.46} a${r * 0.56} ${r * 0.56} 0 0 1 0 ${r * 0.92} l${-r * 0.1} ${-r * 0.06} a${r * 0.46} ${r * 0.46} 0 0 0 0 ${-r * 0.8} Z`}
        fill="#c4342c"
        opacity="0.85"
      />
      <circle cx={cx} cy={cy} r={rim} fill={`url(#${id}-face)`} />
      {Array.from({ length: count }).map((_, index) => (
        <path
          key={index}
          d={`M${cx - rim * 0.14} ${cy - rim * 0.22} L${cx - rim * 0.3} ${cy - rim * 0.85} A${rim * 0.87} ${rim * 0.87} 0 0 1 ${cx + rim * 0.3} ${cy - rim * 0.85} L${cx + rim * 0.14} ${cy - rim * 0.22} Z`}
          fill={`url(#${id}-spoke)`}
          stroke="#7e889a"
          strokeOpacity="0.5"
          strokeWidth="0.5"
          transform={`rotate(${(index * 360) / count} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={rim * 0.95} fill="none" stroke={`url(#${id}-rim)`} strokeWidth={rim * 0.16} />
      <circle cx={cx} cy={cy} r={rim * 0.3} fill={`url(#${id}-hub)`} />
      <circle cx={cx} cy={cy} r={rim * 0.11} fill="#5b6577" />
      {/* glancing light across the tyre */}
      <path
        d={`M${cx - r} ${cy} a${r} ${r} 0 0 1 ${r * 0.52} ${-r * 0.85}`}
        stroke="#fff"
        strokeOpacity="0.16"
        strokeWidth="2.6"
        fill="none"
      />
    </g>
  );
}

function Shell({ body, id, ramp, spokes }) {
  const { wheelR: r, wheelY: cy, front, rear } = body;
  const wheels = [front, rear];

  return (
    <g>
      <path d={body.shell} fill={`url(#${id}-paint)`} />

      <g clipPath={`url(#${id}-clip)`}>
        {/* sky reflected in the upper panels */}
        <path d={body.belt} stroke={`url(#${id}-sheen)`} strokeWidth="30" fill="none" opacity="0.5" />

        {/* dark ground reflected in the lower panels */}
        <path
          d={body.sill}
          stroke={ramp.ground}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d={body.sill}
          stroke="#fff"
          strokeOpacity="0.07"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          transform="translate(0,-10)"
        />

        {body.cladding &&
          wheels.map((cx) => (
            <path
              key={cx}
              d={`M${cx - r - 8} ${cy} a${r + 8} ${r + 8} 0 0 1 ${(r + 8) * 2} 0`}
              stroke="#171b23"
              strokeOpacity="0.9"
              strokeWidth="12"
              fill="none"
            />
          ))}

        {/* wheel arch shadow */}
        {wheels.map((cx) => (
          <path
            key={`ao-${cx}`}
            d={`M${cx - r - 5} ${cy} a${r + 5} ${r + 5} 0 0 1 ${(r + 5) * 2} 0`}
            stroke="#000"
            strokeOpacity="0.34"
            strokeWidth="6"
            fill="none"
          />
        ))}

        {/* pressed character line down the flank */}
        <path d={body.crease} stroke="#fff" strokeOpacity="0.26" strokeWidth="1.2" fill="none" />
        <path
          d={body.crease}
          stroke="#000"
          strokeOpacity="0.12"
          strokeWidth="1.4"
          fill="none"
          transform="translate(0,2)"
        />

        {/* door shut lines, kept below the glass so they read as panel gaps */}
        {body.shutlines.map((d, index) => (
          <path key={index} d={d} stroke="#000" strokeOpacity="0.2" strokeWidth="1.2" fill="none" />
        ))}

        <path
          d={body.belt}
          stroke="#fff"
          strokeOpacity="0.4"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={body.belt}
          stroke="#000"
          strokeOpacity="0.16"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          transform="translate(0,2.2)"
        />
      </g>

      <path d={body.shell} fill="none" stroke={ramp.trim} strokeOpacity="0.5" strokeWidth="1.4" />

      {body.rails && (
        <path d={body.rails} stroke="#1c2029" strokeOpacity="0.85" strokeWidth="7" strokeLinecap="round" fill="none" />
      )}

      {/* glasshouse: dark frame, tinted glass, one clean reflection streak */}
      {body.glass.map((d, index) => (
        <g key={index}>
          <path d={d} fill="#0e131c" />
          <path d={d} fill={`url(#${id}-glass)`} transform="translate(0,1.5) scale(1)" />
          <path d={d} fill={`url(#${id}-glassStreak)`} />
          <path d={d} fill="none" stroke="#0d1117" strokeOpacity="0.5" strokeWidth="2" />
          <path d={d} fill="none" stroke="#cfd8e4" strokeOpacity="0.4" strokeWidth="1" />
        </g>
      ))}

      {body.pillars.map((d, index) => (
        <path key={index} d={d} stroke={ramp.lower} strokeWidth="8" fill="none" />
      ))}

      {/* wing mirror, hung off the base of the A pillar */}
      <g>
        <path
          d={`M${body.mirror.x} ${body.mirror.y - 1} L${body.mirror.x - 6} ${body.mirror.y - 3}`}
          stroke={ramp.lower}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d={`M${body.mirror.x - 4} ${body.mirror.y - 1} C${body.mirror.x - 9} ${body.mirror.y - 3} ${body.mirror.x - 16} ${body.mirror.y - 4} ${body.mirror.x - 17} ${body.mirror.y - 8} C${body.mirror.x - 17} ${body.mirror.y - 11} ${body.mirror.x - 10} ${body.mirror.y - 11} ${body.mirror.x - 4} ${body.mirror.y - 7} Z`}
          fill={`url(#${id}-paint)`}
          stroke={ramp.trim}
          strokeOpacity="0.5"
          strokeWidth="0.9"
        />
      </g>

      {/* door handles */}
      {body.handles.map((x) => (
        <g key={x}>
          <rect x={x} y={body.handleY} width="24" height="7" rx="3.5" fill={ramp.ground} />
          <rect
            x={x + 2}
            y={body.handleY + 1}
            width="20"
            height="2.6"
            rx="1.3"
            fill="#fff"
            fillOpacity="0.35"
          />
        </g>
      ))}

      <circle
        cx={body.fuel.cx}
        cy={body.fuel.cy}
        r="7"
        fill="none"
        stroke="#000"
        strokeOpacity="0.22"
        strokeWidth="1.3"
      />

      {/* headlamp and lower grille */}
      <g>
        <path
          d={`M${body.head.x} ${body.head.y + 2} C${body.head.x + body.head.w * 0.3} ${body.head.y - 2} ${body.head.x + body.head.w * 0.72} ${body.head.y + 1} ${body.head.x + body.head.w} ${body.head.y + body.head.h * 0.42} L${body.head.x + body.head.w * 0.86} ${body.head.y + body.head.h} L${body.head.x + 2} ${body.head.y + body.head.h * 0.9} Z`}
          fill={`url(#${id}-lamp)`}
          stroke="#1d2634"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <circle cx={body.head.x + 9} cy={body.head.y + body.head.h * 0.55} r="3.2" fill="#fff" />
        <rect
          x={body.grille.x}
          y={body.grille.y}
          width={body.grille.w}
          height={body.grille.h}
          rx="4"
          fill="#12161e"
          opacity="0.85"
        />
      </g>

      {/* tail lamp */}
      <g>
        <rect x={body.tail.x} y={body.tail.y} width={body.tail.w} height={body.tail.h} rx="5" fill="#7d130d" />
        <rect
          x={body.tail.x + 1.5}
          y={body.tail.y + 1.5}
          width={body.tail.w - 3}
          height={body.tail.h - 3}
          rx="4"
          fill={`url(#${id}-tail)`}
        />
        <rect
          x={body.tail.x + 3}
          y={body.tail.y + 4}
          width={body.tail.w - 6}
          height={body.tail.h * 0.28}
          rx="2"
          fill="#fff"
          fillOpacity="0.35"
        />
      </g>

      {wheels.map((cx) => (
        <Wheel key={cx} cx={cx} cy={cy} r={r} id={id} spokes={spokes} />
      ))}
    </g>
  );
}

export default function CarModel({
  segment = "Hatchback",
  color = "#d92037",
  spokes = 5,
  className,
  title,
}) {
  const id = useId().replace(/:/g, "");
  const body = bodies[segmentToBody(segment)];
  const ramp = paintRamp(color);
  const { wheelR: r, wheelY: cy, front, rear } = body;
  const ground = cy + r;

  return (
    <svg
      viewBox="56 22 550 280"
      role="img"
      aria-label={title ? `${title} side profile` : "Car side profile"}
      className={cn("w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0.05" y2="1">
          <stop offset="0%" stopColor={ramp.sky} />
          <stop offset="13%" stopColor={ramp.upper} />
          <stop offset="41%" stopColor={ramp.body} />
          <stop offset="49%" stopColor={ramp.horizon} />
          <stop offset="56%" stopColor={ramp.body} />
          <stop offset="82%" stopColor={ramp.lower} />
          <stop offset="95%" stopColor={ramp.ground} />
          <stop offset="100%" stopColor={ramp.bounce} />
        </linearGradient>

        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="18%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-glass`} x1="0.12" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#a9c3dc" />
          <stop offset="28%" stopColor="#576b88" />
          <stop offset="70%" stopColor="#263246" />
          <stop offset="100%" stopColor="#161e2c" />
        </linearGradient>

        <linearGradient id={`${id}-glassStreak`} x1="0" y1="1" x2="0.9" y2="0">
          <stop offset="18%" stopColor="#fff" stopOpacity="0" />
          <stop offset="33%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="44%" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="76%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-tyre`} x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#4d545f" />
          <stop offset="30%" stopColor="#282d37" />
          <stop offset="70%" stopColor="#171b22" />
          <stop offset="100%" stopColor="#0b0e13" />
        </linearGradient>

        <radialGradient id={`${id}-rim`} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#d8dfe9" />
          <stop offset="100%" stopColor="#8994a6" />
        </radialGradient>

        <linearGradient id={`${id}-spoke`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#cfd7e2" />
          <stop offset="100%" stopColor="#929db0" />
        </linearGradient>

        <radialGradient id={`${id}-face`} cx="0.4" cy="0.34" r="0.75">
          <stop offset="0%" stopColor="#3a414d" />
          <stop offset="100%" stopColor="#1b1f27" />
        </radialGradient>

        <radialGradient id={`${id}-disc`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#78818f" />
          <stop offset="70%" stopColor="#434a56" />
          <stop offset="100%" stopColor="#262a33" />
        </radialGradient>

        <radialGradient id={`${id}-hub`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor="#98a3b3" />
        </radialGradient>

        <linearGradient id={`${id}-lamp`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cde4ff" />
          <stop offset="100%" stopColor="#7ba4c9" />
        </linearGradient>

        <linearGradient id={`${id}-tail`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ff8a80" />
          <stop offset="45%" stopColor="#e02f25" />
          <stop offset="100%" stopColor="#9c1810" />
        </linearGradient>

        <radialGradient id={`${id}-contact`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#080c16" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#080c16" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#080c16" stopOpacity="0" />
        </radialGradient>

        <clipPath id={`${id}-clip`}>
          <path d={body.shell} />
        </clipPath>

        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="26%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="52%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mirror`} maskUnits="userSpaceOnUse" x="0" y={ground} width="660" height="120">
          <rect x="0" y={ground} width="660" height="120" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>

      <g mask={`url(#${id}-mirror)`}>
        <g transform={`translate(0 ${ground * 2 + 6}) scale(1 -1)`}>
          <Shell body={body} id={`${id}m`} ramp={ramp} spokes={spokes} />
        </g>
      </g>

      <ellipse
        cx={(front + rear) / 2}
        cy={ground + 5}
        rx={(rear - front) / 2 + 105}
        ry="13"
        fill={`url(#${id}-contact)`}
      />
      <ellipse cx={front} cy={ground + 3} rx={r * 0.8} ry="7" fill="#080c16" opacity="0.4" />
      <ellipse cx={rear} cy={ground + 3} rx={r * 0.8} ry="7" fill="#080c16" opacity="0.4" />

      <Shell body={body} id={id} ramp={ramp} spokes={spokes} />
    </svg>
  );
}
