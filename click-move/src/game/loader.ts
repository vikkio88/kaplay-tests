import type { KAPLAYCtx } from "kaplay";

export function loadAssets(k: KAPLAYCtx) {
  k.loadSprite("cat1", "cat.svg");
  k.loadSprite("cat2", "cat2.svg");
  k.loadSprite("player", "player.png");
}
