var anim = anim || {};

(function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // the particles moving around
    var atoms = []
    var nAtoms = 30;
    var energyMinDist = 150;
    /**
     * Must be called to init the animation library
     */
    function init() {
        if (document.readyState == "complete" || document.readyState == "loaded") {
            app.main()
        } else {
            document.addEventListener('DOMContentLoaded', main);
        }
    }

    /**
     * Called when DOMContentLoaded fires
     */
    function main() {
        var i;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (i = 0; i < nAtoms; i++) {
            atoms.push(new anim.Atom(canvas));
        }

        draw();
    }


    /**
     * Draws a line between two atoms based on the distance
     * {args atomA} : Object of class {Atom}
     * {args atomB} : Object of class {Atom}
     */
    function energyLine(atomA, atomB) {
        if (atomA.id === atomB.id)
            return;

        var dx = atomB.x - atomA.x;
        var dy = atomB.y - atomA.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < energyMinDist) {
            var alpha = (1 - dist / energyMinDist) * 0.2;
            context.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
            context.beginPath();
            context.moveTo(atomA.x, atomA.y);
            context.lineTo(atomB.x, atomB.y);
            context.stroke();
        }
    }

    /**
     * The main draw loop
     */
    function draw() {
        window.requestAnimationFrame(draw);
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw energy lines
        atoms.forEach(function(atom) {
            atoms.forEach(function(atomB) {
                energyLine(atom, atomB);
            });
        });

        // draw atoms
        atoms.forEach(function(atom) {
            atom.update(context);
        });
    }

    // set external interface
    anim.init = init;
    anim.canvas = canvas;
    anim.context = context;
})();
