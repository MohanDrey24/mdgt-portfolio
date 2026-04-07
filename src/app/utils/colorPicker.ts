type Rgb = { r: number; g: number; b: number };

type Hsl = { h: number; s: number; l: number };

export type CardColors = {
  fg: string;
  muted: string;
  divider: string;
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const hexToRgb = (hex: string): Rgb | null => {
  const raw = hex.trim().replace(/^#/, "");
  if (raw.length === 3) {
    const r = parseInt(raw[0] + raw[0], 16);
    const g = parseInt(raw[1] + raw[1], 16);
    const b = parseInt(raw[2] + raw[2], 16);
    if ([r, g, b].some(Number.isNaN)) return null;
    return { r, g, b };
  }

  if (raw.length !== 6) return null;

  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b };
};

const rgbToHsl = ({ r, g, b }: Rgb): Hsl => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
};

const hslToRgb = ({ h, s, l }: Hsl): Rgb => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (h >= 0 && h < 60) {
    rp = c;
    gp = x;
  } else if (h >= 60 && h < 120) {
    rp = x;
    gp = c;
  } else if (h >= 120 && h < 180) {
    gp = c;
    bp = x;
  } else if (h >= 180 && h < 240) {
    gp = x;
    bp = c;
  } else if (h >= 240 && h < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
};

const srgbToLinear = (c: number) => {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
};

const relativeLuminance = (rgb: Rgb) => {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a: Rgb, b: Rgb) => {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
};

const rgba = (rgb: Rgb, alpha: number) =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp01(alpha)})`;

/**
 * Picks complementary, readable text colors from a background hex.
 * Prefers a complementary hue, but falls back to high-contrast neutral.
 */
export const getCardColors = (backgroundHex: string): CardColors => {
  const bgRgb = hexToRgb(backgroundHex) ?? { r: 255, g: 255, b: 255 };
  const bgLum = relativeLuminance(bgRgb);

  const bgHsl = rgbToHsl(bgRgb);
  const complementHue = (bgHsl.h + 180) % 360;

  // Pastels are usually high luminance; bias towards dark readable text.
  const targetLightness = bgLum > 0.55 ? 0.18 : 0.9;
  const targetSaturation = clamp01(Math.max(0.35, Math.min(0.85, bgHsl.s * 1.1)));

  const complementRgb = hslToRgb({
    h: complementHue,
    s: targetSaturation,
    l: targetLightness,
  });

  const minContrast = 4.5;
  const fallbackDark = { r: 17, g: 24, b: 39 };
  const fallbackLight = { r: 255, g: 255, b: 255 };
  const bestFallback =
    contrastRatio(fallbackDark, bgRgb) >= contrastRatio(fallbackLight, bgRgb)
      ? fallbackDark
      : fallbackLight;

  const fgRgb =
    contrastRatio(complementRgb, bgRgb) >= minContrast ? complementRgb : bestFallback;

  return {
    fg: rgba(fgRgb, 0.98),
    muted: rgba(fgRgb, 0.78),
    divider: rgba(fgRgb, 0.55),
  };
};
