/**
 * Created by Andrew on 14-8-11.
 */
var canvas = new Canvas();
var $readout = document.getElementById('reading')

canvas.myCanvas.onmousemove = function(e){
    $readout.innerText = "(" + e.layerX + "," + e.layerY + ")";
}

