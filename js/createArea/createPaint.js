/**
 * Created by v.bogoroditskiy on 7/29/2015.
 */

define(function(require) {
    var controls = require("../controls/controls"),
        elt = require("./elt");

    function createPaint(parent) {
        var canvas = elt("canvas", {width: 500, height: 300});
        var cx = canvas.getContext("2d");
        var toolbar = elt("div", {class: "toolbar"});
        for (var name in controls)
            toolbar.appendChild(controls[name](cx));

        var panel = elt("div", {class: "picturepanel"}, canvas);
        parent.appendChild(elt("div", null, panel, toolbar));
    }

    return createPaint;
});