/**
 * Created by v.bogoroditskiy on 7/29/2015.
 */

define(function() {

    function trackDrag(onMove, onEnd) {
        function end(event) {
            removeEventListener("mousemove", onMove);
            removeEventListener("mouseup", end);
            if (onEnd)
                onEnd(event);
        }

        addEventListener("mousemove", onMove);
        addEventListener("mouseup", end);
    }

    return trackDrag;
});