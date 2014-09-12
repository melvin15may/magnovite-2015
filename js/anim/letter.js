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
        this.edges = [];
        this.triangles = [];
        data.triangles.forEach(function(triangle) {
            // add edges of this triangle
            $this.edges.push([$this.vertices[triangle[0]], $this.vertices[triangle[1]]])
            $this.edges.push([$this.vertices[triangle[1]], $this.vertices[triangle[2]]])
            $this.edges.push([$this.vertices[triangle[0]], $this.vertices[triangle[2]]])

            $this.triangles.push(new anim.Triangle($this.vertices, triangle));
        })

        this.external = [];
        data.external.forEach(function(ext) {
            var p1 = $this.vertices[ext[0]];
            var p2 = $this.vertices[ext[1]];

            // create lines for external offseted by this letters
            // offset
            $this.external.push(new anim.Line(
                p1[0] + x, p1[1] + y,
                p2[0] + x, p2[1] + y,
                ext[2]
            ));
        });

        this.x = x;
        this.y = y;
    }

    Letter.prototype.draw = function(context) {
        var $this = this;

        context.save();
        context.translate(this.x, this.y);

        // draw the triangles
        this.triangles.forEach(function(triangle) {
            triangle.draw(context);
        });

        // draw vertices
        context.fillStyle = verticeFillStyle;
        anim.util.forEachObj(this.vertices, function(name, vertice) {
            context.beginPath();
            context.arc(vertice[0], vertice[1], verticeRadius, 0, Math.PI * 2, false);
            context.closePath();

            context.fill();
        });

        // draw lines
        context.strokeStyle = lineStrokeStyle;
        this.edges.forEach(function(edge) {
            var pointA = edge[0];
            var pointB = edge[1];

            context.beginPath();
            context.moveTo(pointA[0], pointA[1]);
            context.lineTo(pointB[0], pointB[1]);
            context.stroke();
        });

        context.restore();
    }

    anim.Letter = Letter;
})();

