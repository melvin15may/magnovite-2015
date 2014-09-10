var anim = anim || {};

(function() {
    var background = '#1d215c';
    var radius = 10;
    var maxSpeed = 0.7;
    var id = 1;

    /**
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

        this.radius = radius;
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

        // check bounds
        if (this.x + this.radius > this.bounds.right) {
            this.x = this.bounds.right - this.radius;
            this.vx *= -1;
        } else if (this.x - this.radius < this.bounds.left) {
            this.x = this.bounds.left + this.radius;
            this.vx *= -1;
        }

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

    // external interface
    anim.Atom = Atom;
})();
