class Disc extends Body {
    constructor(centerX, centerY, radius, mass, restitution, damping, color) {
        super(centerX, centerY, restitution);
        this.startX = centerX;
        this.startY = centerY;
        this.radius = radius;
        this.mass = mass;
        this.invMass = 1 / this.mass;
        this.color = color;
        this.damping = damping;
        this.hollow = false;
        this.outerColor = Color.black;
    }

    makeHollow() {
        this.hollow = true;
        return this;
    }


    applyForce(forceVec) {
        let accelerationDelta = Vector.div(forceVec, this.mass);
        this.acceleration.add(accelerationDelta);
    }

    applyImpulse(impulseVec) {
        let velocityDelta = Vector.div(impulseVec, this.mass);
        this.velocity.add(velocityDelta);
    }

    update() {
        this.center.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.mult(this.damping);
        this.acceleration.mult(0);
    }

    resetPosition() {
        this.center.x = this.startX;
        this.center.y = this.startY;
    }

    draw() {
        if (this.hollow == false) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.strokeStyle = this.outerColor;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}