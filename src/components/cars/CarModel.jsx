import { useId } from "react";
import { cn } from "@/lib/utils";
import { paintRamp } from "@/lib/color";

const bodies = {
  Hatchback: {
    front: 152,
    rear: 452,
    wheelR: 44,
    wheelY: 202,
    shell:
      "M30 170 C30 154 38 145 54 143 L186 134 L250 88 C256 83 264 80 274 80 L352 78 C362 78 370 82 375 89 L466 130 L500 140 C516 145 524 154 524 168 L524 192 C524 198 520 202 513 202 L41 202 C34 202 30 198 30 192 Z",
    glass: [
      "M198 130 L256 92 C260 89 264 88 270 88 L308 87 L308 130 Z",
      "M320 87 L352 86 C358 86 362 88 366 92 L418 130 L320 130 Z",
    ],
    pillars: ["M314 87 L314 130"],
    belt: "M194 134 L498 138",
    sill: "M108 196 L494 196",
    handles: [262, 372],
    tail: { x: 508, y: 148, w: 12, h: 30 },
    head: { x: 34, y: 152, w: 30, h: 14 },
  },
  Sedan: {
    front: 156,
    rear: 480,
    wheelR: 45,
    wheelY: 202,
    shell:
      "M28 170 C28 154 36 145 52 143 L196 134 L266 84 C272 79 280 76 290 76 L392 74 C402 74 410 78 415 85 L478 128 L560 136 C578 139 588 149 588 166 L588 192 C588 198 584 202 577 202 L39 202 C32 202 28 198 28 192 Z",
    glass: [
      "M208 130 L272 88 C276 85 280 84 286 84 L336 83 L336 130 Z",
      "M348 83 L392 82 C398 82 402 84 406 88 L458 128 L348 128 Z",
    ],
    pillars: ["M342 83 L342 130"],
    belt: "M204 134 L556 136",
    sill: "M108 196 L554 196",
    handles: [272, 388],
    tail: { x: 572, y: 148, w: 12, h: 28 },
    head: { x: 32, y: 152, w: 30, h: 14 },
  },
  SUV: {
    front: 158,
    rear: 492,
    wheelR: 52,
    wheelY: 196,
    shell:
      "M26 158 C26 138 34 127 52 124 L178 112 L242 58 C249 52 258 49 269 49 L432 46 C444 46 452 51 457 60 L502 112 L572 122 C592 126 602 138 602 158 L602 186 C602 193 597 197 589 197 L38 197 C30 197 26 193 26 186 Z",
    glass: [
      "M190 108 L248 62 C252 58 257 56 263 56 L320 55 L320 108 Z",
      "M332 55 L406 54 C412 54 416 56 420 61 L456 108 L332 108 Z",
      "M470 108 L446 70 C452 74 456 79 459 86 L474 108 Z",
    ],
    pillars: ["M326 55 L326 108"],
    belt: "M186 112 L568 118",
    sill: "M108 190 L566 190",
    cladding: true,
    rails: "M254 46 L440 42",
    handles: [262, 378],
    tail: { x: 586, y: 132, w: 13, h: 34 },
    head: { x: 30, y: 134, w: 32, h: 15 },
  },
  MUV: {
    front: 152,
    rear: 500,
    wheelR: 50,
    wheelY: 198,
    shell:
      "M26 164 C26 144 34 132 52 129 L162 118 L222 62 C229 55 239 52 251 52 L462 48 C478 48 488 54 493 66 L520 118 L588 128 C608 132 618 144 618 164 L618 188 C618 195 613 199 605 199 L38 199 C30 199 26 195 26 188 Z",
    glass: [
      "M174 114 L228 66 C232 62 237 60 244 60 L300 59 L300 114 Z",
      "M312 59 L388 58 L388 114 L312 114 Z",
      "M400 58 L458 57 C466 57 470 60 473 68 L492 114 L400 114 Z",
    ],
    pillars: ["M306 59 L306 114", "M394 58 L394 114"],
    belt: "M170 118 L584 124",
    sill: "M106 192 L582 192",
    rails: "M236 48 L466 44",
    handles: [258, 344, 430],
    tail: { x: 602, y: 138, w: 13, h: 34 },
    head: { x: 30, y: 140, w: 32, h: 15 },
  },
};

const segmentToBody = (segment) => (bodies[segment] ? segment : "Hatchback");

function Wheel({ cx, cy, r, id }) {
  const rim = r * 0.6;
  const spokes = 10;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0a0c11" />
      <circle cx={cx} cy={cy} r={r - 1} fill={`url(#${id}-tyre)`} />
      <circle
        cx={cx}
        cy={cy}
        r={r - 5}
        fill="none"
        stroke="#000"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r={r * 0.74} fill="#12151b" />
      <circle cx={cx} cy={cy} r={rim} fill={`url(#${id}-disc)`} />
      {Array.from({ length: spokes }).map((_, index) => (
        <path
          key={index}
          d={`M${cx - 3} ${cy - rim * 0.2} L${cx - 4.6} ${cy - rim * 0.84} A${rim * 0.86} ${rim * 0.86} 0 0 1 ${cx + 4.6} ${cy - rim * 0.84} L${cx + 3} ${cy - rim * 0.2} Z`}
          fill={`url(#${id}-spoke)`}
          transform={`rotate(${(index * 360) / spokes} ${cx} ${cy})`}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={rim * 0.92}
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth={rim * 0.17}
      />
      <circle cx={cx} cy={cy} r={rim * 0.27} fill={`url(#${id}-hub)`} />
      <circle cx={cx} cy={cy} r={rim * 0.1} fill="#5b6577" />
      <path
        d={`M${cx - r} ${cy} a${r} ${r} 0 0 1 ${r * 0.5} ${-r * 0.86}`}
        stroke="#fff"
        strokeOpacity="0.18"
        strokeWidth="3"
        fill="none"
      />
    </g>
  );
}

function Shell({ body, id, ramp }) {
  const { wheelR: r, wheelY: cy, front, rear } = body;
  const wheels = [front, rear];

  return (
    <g>
      <path d={body.shell} fill={`url(#${id}-paint)`} />

      <g clipPath={`url(#${id}-clip)`}>
        <path
          d={body.belt}
          stroke={`url(#${id}-spec)`}
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d={body.sill}
          stroke={ramp.ground}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d={body.sill}
          stroke="#fff"
          strokeOpacity="0.12"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          transform="translate(0,-9)"
        />
        {body.cladding &&
          wheels.map((cx) => (
            <path
              key={cx}
              d={`M${cx - r - 11} ${cy} a${r + 11} ${r + 11} 0 0 1 ${(r + 11) * 2} 0`}
              stroke="#171b23"
              strokeOpacity="0.92"
              strokeWidth="15"
              fill="none"
            />
          ))}
        {wheels.map((cx) => (
          <path
            key={`ao-${cx}`}
            d={`M${cx - r - 8} ${cy} a${r + 8} ${r + 8} 0 0 1 ${(r + 8) * 2} 0`}
            stroke="#000"
            strokeOpacity="0.42"
            strokeWidth="9"
            fill="none"
          />
        ))}
        <path
          d={body.belt}
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <path
        d={body.shell}
        fill="none"
        stroke={ramp.trim}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      {body.glass.map((d, index) => (
        <g key={index}>
          <path d={d} fill={`url(#${id}-glass)`} />
          <path d={d} fill={`url(#${id}-glassStreak)`} />
          <path d={d} fill="none" stroke="#cfd8e4" strokeOpacity="0.55" strokeWidth="2.5" />
        </g>
      ))}

      {body.pillars.map((d, index) => (
        <path key={index} d={d} stroke={ramp.lower} strokeWidth="8" fill="none" />
      ))}

      {body.rails && (
        <path
          d={body.rails}
          stroke="#1c2029"
          strokeOpacity="0.85"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {body.handles.map((x) => (
        <g key={x}>
          <rect
            x={x}
            y={body.wheelR > 48 ? 124 : 140}
            width="26"
            height="8"
            rx="4"
            fill={ramp.ground}
          />
          <rect
            x={x + 2}
            y={body.wheelR > 48 ? 125 : 141}
            width="22"
            height="3"
            rx="1.5"
            fill="#fff"
            fillOpacity="0.35"
          />
        </g>
      ))}

      <g>
        <rect
          x={body.head.x}
          y={body.head.y}
          width={body.head.w}
          height={body.head.h}
          rx={body.head.h / 2}
          fill={`url(#${id}-lamp)`}
        />
        <rect
          x={body.head.x + 2}
          y={body.head.y + 2}
          width={body.head.w - 6}
          height={body.head.h - 4}
          rx={(body.head.h - 4) / 2}
          fill="#eaf5ff"
          opacity="0.9"
        />
        <circle cx={body.head.x + 9} cy={body.head.y + body.head.h / 2} r="3.4" fill="#fff" />
      </g>

      <g>
        <rect
          x={body.tail.x}
          y={body.tail.y}
          width={body.tail.w}
          height={body.tail.h}
          rx="5"
          fill="#8e1710"
        />
        <rect
          x={body.tail.x + 1.5}
          y={body.tail.y + 1.5}
          width={body.tail.w - 3}
          height={body.tail.h - 3}
          rx="4"
          fill={`url(#${id}-tail)`}
        />
      </g>

      {wheels.map((cx) => (
        <Wheel key={cx} cx={cx} cy={cy} r={r} id={id} />
      ))}
    </g>
  );
}

export default function CarModel({ segment = "Hatchback", color = "#d92037", className, title }) {
  const id = useId().replace(/:/g, "");
  const body = bodies[segmentToBody(segment)];
  const ramp = paintRamp(color);
  const { wheelR: r, wheelY: cy, front, rear } = body;
  const ground = cy + r;

  return (
    <svg
      viewBox="0 0 660 300"
      role="img"
      aria-label={title ? `${title} side profile` : "Car side profile"}
      className={cn("w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0.06" y2="1">
          <stop offset="0%" stopColor={ramp.sky} />
          <stop offset="16%" stopColor={ramp.upper} />
          <stop offset="45%" stopColor={ramp.body} />
          <stop offset="53%" stopColor={ramp.horizon} />
          <stop offset="58%" stopColor={ramp.body} />
          <stop offset="84%" stopColor={ramp.lower} />
          <stop offset="96%" stopColor={ramp.ground} />
          <stop offset="100%" stopColor={ramp.bounce} />
        </linearGradient>

        <linearGradient id={`${id}-spec`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="22%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="46%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="74%" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-glass`} x1="0.15" y1="0" x2="0.55" y2="1">
          <stop offset="0%" stopColor="#b9cfe6" />
          <stop offset="30%" stopColor="#5f7391" />
          <stop offset="72%" stopColor="#2c3950" />
          <stop offset="100%" stopColor="#1b2434" />
        </linearGradient>

        <linearGradient id={`${id}-glassStreak`} x1="0" y1="1" x2="0.9" y2="0">
          <stop offset="18%" stopColor="#fff" stopOpacity="0" />
          <stop offset="34%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="44%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="76%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-tyre`} x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#575e6c" />
          <stop offset="30%" stopColor="#2c313c" />
          <stop offset="70%" stopColor="#191d25" />
          <stop offset="100%" stopColor="#0d1015" />
        </linearGradient>

        <radialGradient id={`${id}-rim`} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#d8dfe9" />
          <stop offset="100%" stopColor="#8994a6" />
        </radialGradient>

        <linearGradient id={`${id}-spoke`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#d3dae4" />
          <stop offset="100%" stopColor="#9aa5b6" />
        </linearGradient>

        <radialGradient id={`${id}-disc`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#6d7684" />
          <stop offset="70%" stopColor="#3c434f" />
          <stop offset="100%" stopColor="#23272f" />
        </radialGradient>

        <radialGradient id={`${id}-hub`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor="#98a3b3" />
        </radialGradient>

        <linearGradient id={`${id}-lamp`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#cfe6ff" />
          <stop offset="100%" stopColor="#7fa8cc" />
        </linearGradient>

        <linearGradient id={`${id}-tail`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ff8177" />
          <stop offset="45%" stopColor="#e4342a" />
          <stop offset="100%" stopColor="#a51b13" />
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
          <Shell body={body} id={`${id}m`} ramp={ramp} />
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

      <Shell body={body} id={id} ramp={ramp} />
    </svg>
  );
}
