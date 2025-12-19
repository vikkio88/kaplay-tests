import type { GameObj, KAPLAYCtx, PosComp } from "kaplay";

export function makeBall(g: KAPLAYCtx, pos?: PosComp) {
  return [
    g.circle(5),
    g.body({ mass: 0.05 }),
    g.area(),
    g.anchor("center"),
    pos ?? g.pos(g.width() / 2, g.height() / 2),
    "ball",
  ];
}
export function addBounce(g: KAPLAYCtx, ball: GameObj) {
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
    ball.vel = ball.vel.scale(ball.vel > 2 ? 0.9999 : 0.99);

    if (ball.vel.len() < 2) {
      ball.vel = g.Vec2.ZERO;
    }

    if (
      ball.pos.x > g.width() ||
      ball.pos.y > g.height() ||
      ball.pos.y < 10 ||
      ball.pos.x < 10
    ) {
      ball.pos = g.vec2(g.width() / 2, g.height() / 2);
      ball.vel = g.Vec2.ZERO;
    }
  });
}
