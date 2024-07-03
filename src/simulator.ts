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
}
