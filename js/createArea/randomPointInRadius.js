/**
 * Created by v.bogoroditskiy on 7/29/2015.
 */

define(function() {

    function randomPointInRadius(radius) {
        for (; ;) {
            var x = Math.random() * 2 - 1;
            var y = Math.random() * 2 - 1;
            if (x * x + y * y <= 1)
                return {x: x * radius, y: y * radius};
        }
    }

    return randomPointInRadius;
});