import k, {
  type GameObj,
  type KAPLAYCtx,
  type PosComp,
  type Vec2,
} from "kaplay";
import type { EventBus } from "../bus/bus";
import { loadAssets } from "./loader";
import { addPitch } from "./models/pitch";
import { addPlayer, PLAYER_ACCELERATION } from "./models/player";

const makeBall = (g: KAPLAYCtx, pos?: PosComp) => [
  g.circle(10),
  g.body({ mass: 0.05 }),
  g.area(),
  g.anchor("center"),
  pos ?? g.pos(500, 500),
  "ball",
];
function addBounce(g: KAPLAYCtx, ball: GameObj) {
  if (!ball.onCollide) return;

  ball.onCollide("pitch-wall", (wall: GameObj) => {
    const w = wall.width ?? 0;
    const h = wall.height ?? 0;

    if (w > h) {
      ball.vel.y *= -1;
    } else {
      ball.vel.x *= -1;
    }
  });

  ball.onUpdate(() => {
    ball.vel = ball.vel.scale(0.999);

    if (ball.vel.len() < 10) {
      ball.vel = g.Vec2.ZERO;
    }
  });
}

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
  // g.debug.inspect = true;
  loadAssets(g);
  addPitch(g);

  let targetPos: Vec2 | undefined = undefined;

  let player = addPlayer(g);
  let ball: GameObj | undefined = g.add(makeBall(g));
  let aiming = false;
  let hasBall = false;

  player.onCollide((o) => {
    if (o.is("ball") && ball) {
      ball.destroy();
      ball = undefined;
      player.add([g.circle(5), g.pos(0, 20), g.anchor("center"), "ball_owned"]);
      hasBall = true;
    }
  });

  g.onMousePress((m) => {
    if (m !== "right") return;
    player.vel = g.Vec2.ZERO;
    aiming = true;
  });

  g.onMouseRelease((m) => {
    aiming = false;
    targetPos = g.mousePos();

    if (m === "right" && hasBall) {
      let mx = targetPos.x < player.pos.x ? -1 : 1;
      let my = targetPos.y < player.pos.y ? -1 : 1;
      const t = g.vec2(mx * 40, my * 40);
      ball = g.add(makeBall(g, g.pos(player.pos.add(t))));
      const direction = targetPos.sub(player.pos).unit();
      const strenght = targetPos.dist(player.pos) * 2;
      const impulse = direction.scale(strenght);
      ball.applyImpulse(impulse);
      player.removeAll("ball_owned");
      hasBall = false;
      addBounce(g, ball);
      return;
    }

    if (m === "left") {
      move();
      return;
    }
  });

  function move() {
    if (!targetPos) return;

    const c = g.add([g.circle(5), g.pos(targetPos), g.timer()]);
    c.wait(0.5, () => {
      c.destroy();
    });
    const direction = targetPos.sub(player.pos).unit();
    const strenght = PLAYER_ACCELERATION;
    const impulse = direction.scale(strenght);
    player.applyImpulse(impulse);

    player.flipX = targetPos.x < player.pos.x;
  }

  g.onDraw(() => {
    if (!aiming || !hasBall) return;
    const mousePos = g.mousePos();
    player.flipX = mousePos.x < player.pos.x;
    g.drawLine({
      p1: player.pos.add(0, 40),
      p2: mousePos,
      width: 2,
      color: g.rgb(255, 255, 255),
    });
  });

  // g.loop(5, () => {
  //   const nChaser = addChaser(g, chaserLogic);
  //   if (chasers.length >= MAX_CHASERS) {
  //     const toKill = chasers.shift();
  //     toKill?.destroy();
  //   }

  //   chasers.push(nChaser);
  // });
}
