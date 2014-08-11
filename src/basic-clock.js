/**
 * Created by Andrew on 14-8-11.
 */

(function(){
    var canvas = new Canvas();

    //Statics
    var FONT_HEIGHT = 15,
        MARGIN = 35,
        RADIUS = canvas.height/2 - MARGIN,
        HAND_RADIUS = RADIUS-20;
        CENTER_X = canvas.width/2;
        CENTER_Y = canvas.height/2;



    //Loop

    drawClock();
    setInterval(drawClock,1000);



    function drawClock(){

        //Background. two circles
        canvas
            .clearCanvas()
            .drawCircle(CENTER_X,CENTER_Y,RADIUS)
            .fillCircle(CENTER_X,CENTER_Y, 5);

        //Number
        var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        numerals.forEach(function(numeral) {
            var end = calculateLineEndWithAngle(CENTER_X,CENTER_Y,numeral*30,HAND_RADIUS+5);
            canvas.drawText(numeral,end[0]-2,end[1]+FONT_HEIGHT/3);
        });

        //Hands
        var date = new Date();
        var second = date.getSeconds();
        var minute = date.getMinutes();
        var hour = date.getHours();
        hour = hour < 12 ? hour : hour -12;
        var secondHandEndPoint = calculateLineEndWithAngle(CENTER_X,CENTER_Y,second*6,HAND_RADIUS);
        var minuteHandEndPoint = calculateLineEndWithAngle(CENTER_X,CENTER_Y,minute*6,HAND_RADIUS-10);
        var hourHandEndPoint = calculateLineEndWithAngle(CENTER_X,CENTER_Y,hour*6 + minute/10,HAND_RADIUS-40);
        canvas
            .drawLine(CENTER_X,CENTER_Y,secondHandEndPoint[0],secondHandEndPoint[1])
            .drawLine(CENTER_X,CENTER_Y,minuteHandEndPoint[0],minuteHandEndPoint[1])
            .drawLine(CENTER_X,CENTER_Y,hourHandEndPoint[0],hourHandEndPoint[1]);
    }

})();

function calculateLineEndWithAngle(x,y,angle,radius){
    var dx = Math.sin(angle/180*Math.PI)*radius;
    var dy = Math.cos(angle/180*Math.PI)*radius;
    result = [];
    result.push(x+dx);
    result.push(y-dy);

    return result;
}