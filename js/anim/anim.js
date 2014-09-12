var anim = anim || {};

(function() {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // the particles moving around
    var atoms = []
    var nAtoms = 30;
    var energyMinDist = 150;

    // the letters
    var letters = [];

    // array of {Line}s of all external facing edges
    var externalLetterEdges = [];

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
     * Essentially the entry point for the app
     * Called after DOM load
     */
    function main() {
        var i;

        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight - 250);

        // init atoms
        for (i = 0; i < nAtoms; i++) {
            atoms.push(new anim.Atom(canvas));
        }

        // init Letters
        letters.push(new anim.Letter(100, 120, anim.shapeData.T));
        letters.push(new anim.Letter(400, 120, anim.shapeData.V));

        letters.forEach(function(letter) {
            Array.prototype.push.apply(externalLetterEdges, letter.external);
        });

        draw();
    }

    /**
     * Draws a line between two atoms based on the distance
     * {args atomA} : Object of class {Atom}
     * {args atomB} : Object of class {Atom}
     */
    function energyLine(atomA, atomB) {
        var dx, dy, dist, alpha;

        if (atomA.id === atomB.id)
            return;

        dx = atomB.x - atomA.x;
        dy = atomB.y - atomA.y;
        dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < energyMinDist) {
            alpha = (1 - dist / energyMinDist) * 0.2;
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

                // collide atoms with themselves
                atom.collide(atomB);
            });
        });

        // draw atoms
        atoms.forEach(function(atom) {
            // collide atom with letters
            externalLetterEdges.forEach(function(line) {
                atom.collideLine(line);
            });

            atom.update(context);
        });

        // draw letters
        letters.forEach(function(letter) {
            letter.draw(context);
        })

        // draw external edges seperately : // TODO: DEBUG
        // externalLetterEdges.forEach(function(line) {
        //     line.draw(context);
        // });
    }

    // set external interface
    anim.init = init;
    anim.canvas = canvas;
    anim.context = context;

})();
