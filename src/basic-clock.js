/**
 * Created by Andrew on 14-8-11.
 */
var canvas = new Canvas();

var FONT_HEIGHT = 15,
    MARGIN = 35,
    RADIUS = canvas.height/2 - MARGIN,
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.height/10,
    NUMERAL_SPACING = 20,

    HAND_RADIUS = RADIUS-10;





//Background, static
canvas
    .drawCircle(canvas.width/2,canvas.height/2,RADIUS)
    .fillCircle(canvas.width/2, canvas.height/2, 5);
drawNumber();
setInterval(drawClock, 1000);


function drawClock(){
    var date = new Date,
        hour = date.getHours(),
        minute = date.getMinutes();
    hour = hour>12 ? hour-12 : hour;
    console.log(hour);
    console.log(minute);
    canvas.drawLine(canvas.width/2,canvas.height/2,Math.cos((hour*60+minute)/360)*HAND_RADIUS,Math.sin((hour*60+minute)/360))*HAND_RADIUS;
}


function drawNumber(){
    var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

    var angle = 0,
    numeralWidth = 0;

    numerals.forEach(function(numeral){
        angle = Math.PI/6 * (numeral-3);
        numeralWidth = canvas.cxt.measureText(numeral).width;
        canvas.fillText(numeral,
                canvas.width/2  + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
                canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3);


    });
};
