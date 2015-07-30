/**
 * Created by v.bogoroditskiy on 7/29/2015.
 */

define(function() {
    function loadImageURL(cx, url) {
        var image = document.createElement("img");
        image.addEventListener("load", function () {
            var color = cx.fillStyle, size = cx.lineWidth;
            cx.canvas.width = image.width;
            cx.canvas.height = image.height;
            cx.drawImage(image, 0, 0);
            cx.fillStyle = color;
            cx.strokeStyle = color;
            cx.lineWidth = size;
        });
        image.src = url;
    }

    return loadImageURL;
});