import type { Vec2 } from "kaplay";
import mitt, { type Emitter } from "mitt";

export type Events = {
  speed: [number, Vec2];
};
export type EventBus = Emitter<Events>;

const eb: EventBus = mitt();

export default eb;
