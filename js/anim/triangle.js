var anim = anim || {};

(function() {

    var fillStyles = ['#ff0000', '#00ff00', '#0000ff'];

    function Triangle(vertices, triangle) {
        var $this = this;
        this.cordinates = [
            vertices[triangle[0]],
            vertices[triangle[1]],
            vertices[triangle[2]]
        ];

        var rand = Math.floor(Math.random() * fillStyles.length);
        this.fillStyle = fillStyles[rand];
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
