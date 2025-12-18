import type { GameObj } from "kaplay";

export type OnUpdateFn = (self: GameObj) => () => void;
