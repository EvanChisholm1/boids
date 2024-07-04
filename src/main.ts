import { Simulator } from "./simulator.ts";
import "./style.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const sim = new Simulator(100, { x: canvas.width, y: canvas.height });

function loop() {
    sim.update();
    sim.render(ctx);
}

setInterval(loop, 1000 / 60);

// function loop() {
//     sim.update();
//     sim.render(ctx);
//     requestAnimationFrame(loop);
// }

// loop();
