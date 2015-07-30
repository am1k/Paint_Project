/**
 * Created by v.bogoroditskiy on 7/29/2015.
 */


define(function(require) {

    var tools = Object.create(null),
        relativePos = require("../createArea/relativePos"),
        trackDrag = require("../createArea/trackDrag"),
        randomPointInRadius = require("../createArea/randomPointInRadius");

    tools.Erase = function (event, cx) {
        cx.globalCompositeOperation = "destination-out";
        tools.Line(event, cx, function () {
            cx.globalCompositeOperation = "source-over";
        });
    };

    tools.Line = function (event, cx, onEnd) {
        cx.lineCap = "round";

        var pos = relativePos(event, cx.canvas);
        trackDrag(function (event) {
            cx.beginPath();
            cx.moveTo(pos.x, pos.y);
            pos = relativePos(event, cx.canvas);
            cx.lineTo(pos.x, pos.y);
            cx.stroke();
        }, onEnd);
    };

    tools.Spray = function (event, cx) {
        var radius = cx.lineWidth / 2;
        var area = radius * radius * Math.PI;
        var dotsPerTick = Math.ceil(area / 30);

        var currentPos = relativePos(event, cx.canvas);
        var spray = setInterval(function () {
            for (var i = 0; i < dotsPerTick; i++) {
                var offset = randomPointInRadius(radius);
                cx.fillRect(currentPos.x + offset.x,
                    currentPos.y + offset.y, 1, 1);
            }
        }, 25);
        trackDrag(function (event) {
            currentPos = relativePos(event, cx.canvas);
        }, function () {
            clearInterval(spray);
        });
    };

    tools.Text = function (event, cx) {
        var text = prompt("Text:", "");
        if (text) {
            var pos = relativePos(event, cx.canvas);
            cx.font = Math.max(7, cx.lineWidth) + "px sans-serif";
            cx.fillText(text, pos.x, pos.y);
        }
    };

    function rectangleFrom(a, b) {
        return {left: Math.min(a.x, b.x),
            top: Math.min(a.y, b.y),
            width: Math.abs(a.x - b.x),
            height: Math.abs(a.y - b.y)};
    }

    tools.Rectangle = function(event, cx) {
        var relativeStart = relativePos(event, cx.canvas);
        var pageStart = {x: event.pageX, y: event.pageY};

        var trackingNode = document.createElement("div");
        trackingNode.style.position = "absolute";
        trackingNode.style.background = cx.fillStyle;
        document.body.appendChild(trackingNode);

        trackDrag(function(event) {
            var rect = rectangleFrom(pageStart,
                {x: event.pageX, y: event.pageY});
            trackingNode.style.left = rect.left + "px";
            trackingNode.style.top = rect.top + "px";
            trackingNode.style.width = rect.width + "px";
            trackingNode.style.height = rect.height + "px";
        }, function(event) {
            var rect = rectangleFrom(relativeStart,
                relativePos(event, cx.canvas));
            cx.fillRect(rect.left, rect.top, rect.width, rect.height);
            document.body.removeChild(trackingNode);
        });
    };

    return tools;
});

