var app = app || {};

(function() {
    var magnoviteDate = new Date(2015, 2, 17);

    app.Timer = function() {
        this.tick();
        setInterval(this.tick, 1000);
    }

    /**
     * Returns num as a binary string of length 6
     */
    function toBinary(num) {
        var bin = num.toString(2);

        var padding = 6 - bin.length;
        var output = '';
        for (var i = 0; i < padding; i++) {
            output += '0';
        }

        return output + bin;
    }

    /**
     * Updates the timer block, given a DOM reference
     * to the block and the value to update to
     */
    function updateTimerBlock(block, value) {
        var el = block.getElementsByClassName('numeric')[0];
        el.innerHTML = value;

        // update binary block
        var bin = toBinary(value);
        var bits = block.getElementsByClassName('dot');
        for (var i = 0; i < bits.length; i++) {
            if (bin[i] === '1') {
                bits[i].classList.add('on');
            } else {
                bits[i].classList.remove('on');
            }
        }
    }

    /**
     * Updates the seconds and minutes
     */
    app.Timer.prototype.tick = function() {
        var diff = countdown(magnoviteDate);

        var blocks = document.getElementsByClassName('timer-block');
        updateTimerBlock(blocks[0], diff.months);
        updateTimerBlock(blocks[1], diff.days);
        updateTimerBlock(blocks[2], diff.hours);
        updateTimerBlock(blocks[3], diff.minutes);
        updateTimerBlock(blocks[4], diff.seconds);
    }

 })();
