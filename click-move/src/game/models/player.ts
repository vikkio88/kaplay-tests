import type { KAPLAYCtx } from "kaplay";

export const PLAYER_ACCELERATION = 400;
export const PLAYER_FRICTION = 0.95;

export function addPlayer(k: KAPLAYCtx) {
  const player = k.add([
    k.sprite("player"),
    k.pos(100, 100),
    k.scale(2),
    k.anchor("center"),
    k.body(),
    k.area(),
  ]);

  player.onUpdate(() => {
    const friction = PLAYER_FRICTION;

    player.vel = player.vel.scale(friction);

    if (player.vel.len() < 10) {
      player.vel = k.Vec2.ZERO;
    }
  });

  return player;
}
