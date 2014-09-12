var anim = anim || {};

(function() {

    anim.util = {};

    anim.util.captureMouse = function(el) {
        var mouse = {x: 0, y:0};

        el.addEventListener('mousemove', function(e) {
            var x, y;

            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            } else {
                x = e.clientX + document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop +
                        document.documentElement.scrollTop;
            }

            x -= el.offsetLeft;
            y -= el.offsetTop;

            mouse.x = x;
            mouse.y = y;
        }, false);

        return mouse;
    }

    anim.util.forEachObj = function(obj, callback) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                callback(key, obj[key]);
            }
        }
    }

})();
