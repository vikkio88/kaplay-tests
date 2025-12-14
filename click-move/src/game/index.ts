import k, { type GameObj, type Vec2 } from "kaplay";
import type { EventBus } from "../bus/bus";
import { addChaser } from "./generators";
const MAX_CHASERS = 5;

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

  g.loadSprite("cat1", "cat.svg");
  g.loadSprite("cat2", "cat2.svg");

  const drifter = g.add([
    g.sprite("cat1"),
    g.pos(100, 100),
    g.scale(0.1),
    g.anchor("center"),
    g.body(),
  ]);

  const chaserLogic = (chaser: GameObj) => () => {
    if (!targetPos || chaser.pos.dist(targetPos) < 5) return;
    chaser.moveTo(targetPos, 400);
  };
  let chasers: GameObj[] = [];
  chasers.push(addChaser(g, chaserLogic));

  g.onMouseRelease(() => {
    targetPos = g.mousePos();
    const c = g.add([
      g.circle(5),
      g.pos(targetPos),
      g.timer(),
      g.color(246, 0, 0),
    ]);
    c.wait(2, () => {
      c.destroy();
    });

    // const direction = targetPos.sub(drifter.pos).unit();
    // const strenght = targetPos.dist(drifter.pos) * 0.2;
    // const impulse = direction.scale(strenght);
    // drifter.applyImpulse(impulse);
  });

  // drifter.onUpdate(() => {
  //   // g.debug.log(b.vel.len(), b.vel.unit());

  //   const friction = 0.999;
  //   if (drifter.vel.len() < 50) {
  //     drifter.vel = drifter.vel.scale(friction);
  //   }
  //   if (drifter.vel.len() < 10) {
  //     drifter.vel = g.Vec2.ZERO;
  //   }
  // });

  // g.loop(0.8, () => {
  //   eb.emit("speed", [
  //     drifter.vel.len(),
  //     drifter.vel.unit(),
  //     targetPos?.dist(drifter.pos) ?? 0,
  //   ]);
  // });

  g.loop(5, () => {
    const nChaser = addChaser(g, chaserLogic);
    if (chasers.length >= MAX_CHASERS) {
      const toKill = chasers.shift();
      toKill?.destroy();
    }

    chasers.push(nChaser);
  });
}
