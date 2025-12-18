import type { KAPLAYCtx } from "kaplay";

export function addPitch(g: KAPLAYCtx) {
  const inset = 20;
  const outline = 10;

  const x = inset;
  const y = inset;
  const w = g.width() - inset * 2;
  const h = g.height() - inset * 2;

  g.add([
    g.pos(x, y),
    g.rect(w, h),
    g.color(0, 140, 0),
    g.outline(outline, g.rgb(255, 255, 255)),
  ]);

  const t = outline;
  g.add([
    g.pos(x, y),
    g.rect(w, t),
    g.area(),
    g.body({ isStatic: true }),
    "pitch-wall",
  ]);
  g.add([
    g.pos(x, y + h - t),
    g.rect(w, t),
    g.area(),
    g.body({ isStatic: true }),
    "pitch-wall",
  ]);
  g.add([
    g.pos(x, y),
    g.rect(t, h),
    g.area(),
    g.body({ isStatic: true }),
    "pitch-wall",
  ]);
  g.add([
    g.pos(x + w - t, y),
    g.rect(t, h),
    g.area(),
    g.body({ isStatic: true }),
    "pitch-wall",
  ]);
}
