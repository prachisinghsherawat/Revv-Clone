const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));

export const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
};

export const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("")}`;

export const mix = (hex, target, amount) => {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
};

export const lighten = (hex, amount) => mix(hex, "#ffffff", amount);
export const darken = (hex, amount) => mix(hex, "#000000", amount);

export const luminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

export const paintRamp = (hex) => {
  const dark = luminance(hex) < 0.25;
  return {
    sky: lighten(hex, dark ? 0.5 : 0.62),
    upper: lighten(hex, dark ? 0.26 : 0.3),
    body: hex,
    horizon: lighten(hex, dark ? 0.34 : 0.42),
    lower: darken(hex, 0.32),
    ground: darken(hex, 0.52),
    bounce: dark ? lighten(hex, 0.16) : darken(hex, 0.34),
    trim: darken(hex, 0.55),
  };
};
