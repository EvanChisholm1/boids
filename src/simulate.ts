import Boid from "./boid";
import { Vec2d, getAvgVec } from "./vec";

function createBoids(n: number): Boid[] {
    const boidArr = new Array(n);

    for (let i = 0; i < n; i++) {
        boidArr[n] = new Boid();
    }

    return boidArr;
}

function getAvgLoc(boids: Boid[]): Vec2d {
    return getAvgVec(boids.map((b) => ({ x: b.x, y: b.y })));
}

function getAvgVel(boids: Boid[]): Vec2d {
    return getAvgVec(boids.map((b) => ({ x: b.xVel, y: b.yVel })));
}
