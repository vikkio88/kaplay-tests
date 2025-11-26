import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import eb from "./bus/bus";
import { gameInit } from "./game";
const app = mount(App, {
  target: document.getElementById("app")!,
});

const c = document.getElementById("canvas") as HTMLCanvasElement;
gameInit(eb, c);

export default app;
