import type { KAPLAYCtx } from "kaplay";
import type { OnUpdateFn } from "./shared";

function int(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPos(x: number, y: number) {
  x += int(0, 200);
  y += int(0, 200);
  return { x, y };
}

export function addChaser(k: KAPLAYCtx, onUpdate: OnUpdateFn) {
  const { x, y } = randomPos(100, 100);

  const chaser = k.add([
    k.sprite("cat2"),
    k.pos(x, y),
    k.scale(0.1),
    k.anchor("center"),
    k.body(),
    k.area(),
  ]);
  chaser.onUpdate(onUpdate(chaser));

  return chaser;
}
