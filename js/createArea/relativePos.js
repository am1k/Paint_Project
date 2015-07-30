/**
 * Created by v.bogoroditskiy on 7/29/2015.
 */

define(function() {

    function relativePos(event, element) {
        var rect = element.getBoundingClientRect();
        return {
            x: Math.floor(event.clientX - rect.left),
            y: Math.floor(event.clientY - rect.top)
        };
    }

    return relativePos;
});