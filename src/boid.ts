type boidInit = {
    x?: number;
    y?: number;
    xVel?: number;
    yVel?: number;
    width: number;
    height: number;
};

class Boid {
    x: number;
    y: number;
    xVel: number;
    yVel: number;

    constructor(initParams: boidInit = { width: 500, height: 500 }) {
        const defaults = {
            x: Math.random() * initParams.width,
            y: Math.random() * initParams.height,
            yVel: Math.random() * 2 - 1,
            xVel: Math.random() * 2 - 1,
        };

        const { x, y, yVel, xVel } = { ...defaults, ...initParams };
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
    }

    update(averageDir: number, averageLoc: number) {}
}

export default Boid;
