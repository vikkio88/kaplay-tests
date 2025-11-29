import k, { type Vec2 } from "kaplay";
import type { EventBus } from "../bus/bus";
export function gameInit(eb: EventBus, canvas: HTMLCanvasElement) {
  const g = k({
    canvas,
    height: 800,
    width: 1024,
    scale: 1,
    background: "#7681B3",
    buttons: {
      action: {
        keyboard: ["up"],
        gamepad: "south",
      },
    },
  });

  let targetPos: Vec2 | undefined = undefined;

  g.loadBean();

  const b = g.add([
    g.sprite("bean"),
    g.pos(100, 100),
    g.scale(0.8),
    g.anchor("center"),
    g.body(),
  ]);
  // b.onUpdate(() => {
  //   if (!targetPos || b.pos.dist(targetPos) < 5) return;
  //   b.moveTo(targetPos, 400);
  // });

  g.onMouseRelease(() => {
    targetPos = g.mousePos();
    const c = g.add([g.circle(5), g.pos(targetPos), g.timer()]);
    c.wait(1, () => {
      c.destroy();
    });

    const direction = targetPos.sub(b.pos).unit();
    const strenght = targetPos.dist(b.pos) * 0.2;
    const impulse = direction.scale(strenght);
    b.applyImpulse(impulse);
  });

  b.onUpdate(() => {
    // g.debug.log(b.vel.len(), b.vel.unit());

    const friction = 0.999;
    if (b.vel.len() < 50) {
      b.vel = b.vel.scale(friction);
    }
    if (b.vel.len() < 10) {
      b.vel = g.Vec2.ZERO;
    }
  });

  g.loop(0.8, () => {
    eb.emit("speed", [b.vel.len(), b.vel.unit(), targetPos?.dist(b.pos) ?? 0]);
  });
}
