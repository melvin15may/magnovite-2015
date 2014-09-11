var anim = anim || {};

/**
 * Depends on {anim.Triangle}
 */
(function() {

    var verticeFillStyle = '#8D95F0';
    var verticeRadius = 2;
    var lineStrokeStyle = 'rgba(141, 149, 240, 0.5)';

    /**
     * The Letter object, represents each single letter
     * {arg x} : the top left x coordinate of this shape
     * {arg y} : the top left y coordinate of this shape
     * {arg data} : json object containing data for this shape
     */
    function Letter(x, y, data) {
        var $this = this;

        this.vertices = data.vertices;
        this.edges = data.edges;

        this.external = [];
        this.triangles = [];
        data.triangles.forEach(function(triangle) {
            var t = new anim.Triangle($this.vertices, $this.edges, triangle);

            $this.triangles.push(t);

            // handle the external edges
            var ext = t.getExternal();
            for (var i = 0; i < ext.length; i++) {
                ext[i][0][0] += x;
                ext[i][0][1] += y;

                ext[i][1][0] += x;
                ext[i][1][1] += y;

                $this.external.push(new anim.Line(
                    ext[i][0][0], ext[i][0][1],
                    ext[i][1][0], ext[i][1][1],
                    ext[i][2]
                ));
            }
        });

        this.x = x;
        this.y = y;
    }

    Letter.prototype.draw = function(context) {
        var _this = this;

        context.save();
        context.translate(this.x, this.y);

        // draw the triangles
        this.triangles.forEach(function(triangle) {
            triangle.draw(context);
        });

        // draw vertices
        context.fillStyle = verticeFillStyle;
        this.vertices.forEach(function(vertice) {
            context.beginPath();
            context.arc(vertice[0], vertice[1], verticeRadius, 0, Math.PI * 2, false);
            context.closePath();

            context.fill();
        });

        // draw lines
        context.strokeStyle = lineStrokeStyle;
        this.edges.forEach(function(edge) {
            var pointA = _this.vertices[edge[0]];
            var pointB = _this.vertices[edge[1]];

            context.beginPath();
            context.moveTo(pointA[0], pointA[1]);
            context.lineTo(pointB[0], pointB[1]);
            context.stroke();
        });

        context.restore();
    }

    anim.Letter = Letter;
})();

