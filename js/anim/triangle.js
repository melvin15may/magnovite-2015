var anim = anim || {};

(function() {

    var fillStyles = ['#ff0000', '#00ff00', '#0000ff'];

    function Triangle(vertices, edges, triangle) {
        var $this = this;

        this.external = triangle[3];
        this.cordinates = [
            vertices[ edges[triangle[0]][0] ],
            vertices[ edges[triangle[1]][0] ],
            vertices[ edges[triangle[2]][0] ]
        ];

        var rand = Math.floor(Math.random() * fillStyles.length);
        this.fillStyle = fillStyles[rand];
    }

    /**
     * Returns an array of cordinates for the external
     * edges of this triangle
     */
    Triangle.prototype.getExternal = function() {
        var $this = this;
        var external = [];

        this.external.forEach(function(obj) {
            var i = obj.i;
            var a, b;

            switch (i) {
            case 0:
                a = 0; b = 1;
                break;

            case 1:
                a = 1; b = 2;
                break;

            case 2:
                a = 0; b = 2;
                break;
            }

            external.push([
                $this.cordinates[a].slice(0),
                $this.cordinates[b].slice(0),
                obj.side
            ]);
        });

        return external;
    }

    Triangle.prototype.draw = function(context) {
        var cord = this.cordinates;
        context.save();

        context.beginPath();
        context.moveTo(cord[0][0], cord[0][1]);
        context.lineTo(cord[1][0], cord[1][1]);
        context.lineTo(cord[2][0], cord[2][1]);
        context.closePath();

        context.fillStyle = this.fillStyle;
        context.fill();

        context.restore();
    }

    anim.Triangle = Triangle;

})();
