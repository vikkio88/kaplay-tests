import k, { type Vec2 } from "kaplay";
import type { EventBus } from "../bus/bus";
import { loadAssets } from "./loader";
import { addPitch } from "./models/pitch";
import { addPlayer, PLAYER_ACCELERATION } from "./models/player";
const MAX_CHASERS = 5;

export function gameInit(eb: EventBus, canvas: HTMLCanvasElement) {
  const g = k({
    canvas,
    height: 800,
    width: 1024,
    scale: 1,
    letterbox: true,
    debug: true,
    background: "#7681B3",
    buttons: {
      action: {
        keyboard: ["up"],
        gamepad: "south",
      },
    },
  });
  loadAssets(g);
  addPitch(g);

  // g.debug.inspect = true;

  let targetPos: Vec2 | undefined = undefined;

  // const chaserLogic = (chaser: GameObj) => () => {
  //   if (!targetPos || chaser.pos.dist(targetPos) < 5) return;
  //   chaser.moveTo(targetPos, 400);
  // };
  // let chasers: GameObj[] = [];
  // chasers.push(addChaser(g, chaserLogic));

  let player = addPlayer(g);

  g.onMouseRelease((m) => {
    targetPos = g.mousePos();
    if (m === "left") {
      move();
      return;
    }
  });

  function move() {
    if (!targetPos) return;

    const c = g.add([g.circle(5), g.pos(targetPos), g.timer()]);

    const direction = targetPos.sub(player.pos).unit();
    const strenght = PLAYER_ACCELERATION;
    const impulse = direction.scale(strenght);
    player.applyImpulse(impulse);

    player.flipX = targetPos.x < player.pos.x;

    c.wait(1, () => {
      c.destroy();
    });
  }

  // g.loop(5, () => {
  //   const nChaser = addChaser(g, chaserLogic);
  //   if (chasers.length >= MAX_CHASERS) {
  //     const toKill = chasers.shift();
  //     toKill?.destroy();
  //   }

  //   chasers.push(nChaser);
  // });
}
