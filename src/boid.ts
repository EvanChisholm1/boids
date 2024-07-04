import {
    Vec2d,
    getDistance,
    normalizeVec,
    scaleVec,
    subVecs,
    addVecs,
    sumVecs,
} from "./vec";

type boidInit = {
    pos?: Vec2d;
    vel?: Vec2d;
    width: number;
    height: number;
};

const minDist = 25;

function getCloseBoids(boid: Boid, boids: Boid[], distance: number): Boid[] {
    return boids.filter(
        (x) => getDistance(boid.pos, x.pos) <= distance && x !== boid
    );
}

function separation(boid: Boid, boids: Boid[], minDist: number): Vec2d {
    const steering = getCloseBoids(boid, boids, minDist).reduce(
        (acc, x) =>
            addVecs(
                acc,
                scaleVec(
                    normalizeVec(subVecs(boid.pos, x.pos)),
                    1 / getDistance(boid.pos, x.pos)
                )
            ),
        { x: 0, y: 0 }
    );

    return steering;
}

function alignment(boid: Boid, boids: Boid[], perceptionRadius: number): Vec2d {
    const closeBoids = getCloseBoids(boid, boids, perceptionRadius);

    const steering = subVecs(
        scaleVec(
            closeBoids.reduce((acc, x) => addVecs(acc, x.vel), { x: 0, y: 0 }),
            1 / Math.max(closeBoids.length, 1)
        ),
        boid.vel
    );

    return steering;
}

function cohesion(boid: Boid, boids: Boid[], perceptionRadius: number): Vec2d {
    const closeBoids = getCloseBoids(boid, boids, perceptionRadius);

    const steering = subVecs(
        scaleVec(
            closeBoids.reduce((acc, x) => addVecs(acc, x.pos), { x: 0, y: 0 }),
            1 / Math.max(closeBoids.length, 1)
        ),
        boid.pos
    );

    return steering;
}

// const SEPARTATION_WEIGHT = 10;
// const ALIGNMENT_WEIGHT = 3;
// const COHESION_WEIGHT = 0.3;
const SEPARTATION_WEIGHT = 1.5;
const ALIGNMENT_WEIGHT = 1;
const COHESION_WEIGHT = 0.7;

const SPEED = 1;

class Boid {
    pos: Vec2d;
    vel: Vec2d;
    // accel: Vec2d;

    constructor(initParams: boidInit = { width: 500, height: 500 }) {
        const defaults = {
            pos: {
                x: Math.random() * initParams.width,
                y: Math.random() * initParams.height,
            },
            vel: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
        };

        const { pos, vel } = { ...defaults, ...initParams };
        this.pos = pos;
        this.vel = vel;
    }

    update(others: Boid[]) {
        const minDist = 25;
        const perceptionRadius = 50;

        const separationForce = separation(this, others, minDist);
        const alignmentForce = alignment(this, others, perceptionRadius);
        const cohesionForce = cohesion(this, others, perceptionRadius);

        const acceleration = scaleVec(
            normalizeVec(
                sumVecs([
                    scaleVec(separationForce, SEPARTATION_WEIGHT),
                    scaleVec(alignmentForce, ALIGNMENT_WEIGHT),
                    scaleVec(cohesionForce, COHESION_WEIGHT),
                ])
            ),
            0.1
        );

        // add random noise so boids don't get stuck
        const noise: Vec2d = scaleVec(
            {
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1,
            },
            0.1
        );

        this.vel = normalizeVec(sumVecs([this.vel, acceleration, noise]));
        this.pos = addVecs(this.pos, scaleVec(this.vel, SPEED));
    }
}

export default Boid;
