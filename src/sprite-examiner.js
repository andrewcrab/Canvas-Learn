/**
 * Created by Andrew on 14-8-11.
 */
var canvas = new Canvas();
var $readout = document.getElementById('reading')

canvas.canvas.onmousemove = function(e){
    $readout.innerText = "(" + e.layerX + "," + e.layerY + ")";
}

