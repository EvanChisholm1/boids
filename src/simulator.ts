import Boid from "./boid";
import { Vec2d } from "./vec";

export class Simulator {
    bounds: Vec2d;
    boids: Boid[];

    constructor(n: number, bounds: Vec2d) {
        this.boids = Array.from({ length: n }, () => new Boid());
        this.bounds = bounds;
    }

    update() {
        for (const boid of this.boids) {
            boid.update(this.boids);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.bounds.x, this.bounds.y);
        for (const boid of this.boids) {
            // render the boid
            ctx.beginPath();
            ctx.arc(boid.pos.x, boid.pos.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }
    }
}
