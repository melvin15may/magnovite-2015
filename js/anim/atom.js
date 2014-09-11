var anim = anim || {};

(function() {

    var id = 1;
    var background = '#1d215c';
    var minRadius = 7;
    var varRadius = 3;
    var maxSpeed = 0.6;
    var weight = 10;

    /**
     * Initializes an atom object with random cordinates,
     * and random velocity
     * {arg canvas} : canvas element DOM node
     * {Constructor}
     */
    function Atom(canvas) {
        this.id = id++;

        this.bounds = {
            left: 0,
            right: canvas.width,
            top: 0,
            bottom: canvas.height
        };

        this.radius = Math.random() * varRadius + minRadius;
        this.mass = this.radius * weight;
        this.color = background;

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * maxSpeed;
        this.vy = Math.random() * maxSpeed;

        if (Math.random() * 10 > 5)
            this.vx *= -1;
        if (Math.random() * 10 > 5)
            this.vy *= -1;
    }

    /**
     * Updates the atoms state at each step.
     * Atoms bounce off the bounds
     *
     * {arg context} : the 2d canvas context object
     */
    Atom.prototype.update = function(context) {
        var rand, dir;

        this.x += this.vx;
        this.y += this.vy;

        // check vertical bounds
        if (this.x + this.radius > this.bounds.right) {
            this.x = this.bounds.right - this.radius;
            this.vx *= -1;
        } else if (this.x - this.radius < this.bounds.left) {
            this.x = this.bounds.left + this.radius;
            this.vx *= -1;
        }

        // check horizontal bounds
        if (this.y + this.radius > this.bounds.bottom) {
            this.y = this.bounds.bottom - this.radius;
            this.vy *= -1;
        } else if (this.y - this.radius < this.bounds.top) {
            this.y = this.bounds.top + this.radius;
            this.vy *= -1;
        }

        this.draw(context);
    }

    /**
     * Draws this object on the screen
     * {arg context} : 2d canvas context object
     */
    Atom.prototype.draw = function(context) {
        context.save();

        context.translate(this.x, this.y);

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        context.closePath();

        context.fillStyle = this.color;
        context.fill();

        context.restore();
    }

    /**
     * Rotates the cordinate system
     */
    function rotate (x, y, sin, cos, reverse) {
        return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
        };
    }

    /**
     * Checks if {this} atom collides with {arg atomB}
     * and take appropriate actions
     *
     * {arg atomB} : instance of class {Atom} to check against
     */
    Atom.prototype.collide = function(atomB) {
        var vx, vy;
        var absorption = -0.01;

        var dx = atomB.x - this.x;
        var dy = atomB.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist && dist < atomB.radius + this.radius) {
            var angle = Math.atan2(dy, dx);
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);

            // find rotated position and velocities
            var pos0 = {x: 0, y: 0}
            var pos1 = rotate(dx, dy, sin, cos, true);
            var vel0 = rotate(this.vx, this.vy, sin, cos, true);
            var vel1 = rotate(atomB.vx, atomB.vy, sin, cos, true);

            //collision reaction
            vxTotal = vel0.x - vel1.x;
            vel0.x = ((this.mass - atomB.mass) * vel0.x + 2 * atomB.mass * vel1.x) /
                        (this.mass + atomB.mass);
            vel1.x = vxTotal + vel0.x;

            //update position
            pos0.x += vel0.x;
            pos1.x += vel1.x;

            //rotate positions back
            var pos0F = rotate(pos0.x, pos0.y, sin, cos, false);
            var pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

            //adjust positions to actual screen positions
            atomB.x = this.x + pos1F.x;
            atomB.y = this.y + pos1F.y;
            this.x = this.x + pos0F.x;
            this.y = this.y + pos0F.y;

            //rotate velocities back
            var vel0F = rotate(vel0.x, vel0.y, sin, cos, false);
            var vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

            // update velocities
            this.vx = vel0F.x;
            this.vy = vel0F.y;
            atomB.vx = vel1F.x;
            atomB.vy = vel1F.y;
        }

        this.clamp();
        atomB.clamp();
    }

    /**
     * Clamps the atoms speed to maxSpeed
     */
    Atom.prototype.clamp = function() {
        if (this.vx > maxSpeed)
            this.vx = maxSpeed;

        if (this.vy > maxSpeed)
            this.vy = maxSpeed;
    }

    // external interface
    anim.Atom = Atom;

})();
