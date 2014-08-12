/**
 * Created by Andrew on 14-8-11.
 */
/**
 * Created by Andrew on 14-8-4.
 */
/**
 * Draw on canvas
 * @class canvas
 */
function Canvas(canvasID){
    this.canvasID = canvasID||this.canvasID;

    //TODO:Not really ideal. Find a way to get rid of this line.
    this.init(canvasID);
};


Canvas.prototype = {
    constructor:Canvas,
    canvasID:"canvas",
    width:600,
    height:400,
    myCanvas:null,
    cxt:null,
    init:function(){
        this.setCanvas(this.canvasID);
        this.cxt.save();
        //this.canvasWidth = this.myCanvas.width;
        //this.canvasHeight = this.myCanvas.height;
    },
    /**
     *
     * @param {String} canvasID
     * @returns {canvas}
     */
    setCanvas:function(canvasID){
        this.canvasID = canvasID;
        this.myCanvas = window.document.getElementById(canvasID);
        this.cxt = this.myCanvas.getContext("2d");

        return this;
    },
    /**
     *
     * @param {Number} width
     * @param {Number} height
     * @returns {canvas}
     */
    setCanvasSize:function(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;

        return this;
    },
    /**
     *
     * @param {Number} fontSize
     * @param {String} fontFamily
     * @example
     * @returns {canvas}
     */
    setFontStyle:function(style){
        this.cxt.font = style;

        return this;
    },
    /**
     *
     * @param {String} style
     * @returns {Canvas}
     */
    setFillStyle:function(style){
        this.cxt.fillStyle = style;

        return this;
    },
    /**
     *
     * @param {String} style
     * @returns {Canvas}
     */
    setStrokeStyle:function(style){
        this.cxt.strokeStyle = style;

        return this;
    },
    setLineWidth:function(width){
        this.cxt.lineWidth = width;

        return this;
    },
    /**
     *
     * @param x
     * @param y
     * @returns {Canvas}
     */
    /**
     *Draw line on canvas.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} x2
     * @param {Number} y2
     * @returns {canvas}
     */
    line:function(x,y,x2,y2){
        this.cxt.beginPath();
        this.cxt.moveTo(x,y);
        this.cxt.lineTo(x2,y2);
        this.cxt.closePath();
        this.cxt.stroke();

        return this;
    },

    /**
     *Draw rectangle on canvas.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @returns {canvas}
     */
    rect:function(x,y,width,height){
        this.cxt.strokeRect(x,y,width,height);

        return this;
    },

    /**
     * Draw circle on canvas with center and radius.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @returns {canvas}
     */
    circle:function(x,y,radius){
        this.cxt.beginPath();
        this.cxt.arc(x,y,radius,0,Math.PI*2);
        this.cxt.closePath();
        this.cxt.stroke();

        return this;
    },

    /**
     *
     * @param {Number...} points
     * @returns {canvas}
     */
    poly:function(points){
        var x1 = arguments[0];
        var y1 = arguments[1];
        var len = arguments.length/2;

        this.cxt.beginPath();
        this.cxt.moveTo(x1,y1);

        for (var i = 1; i < len; i++){
            this.cxt.lineTo(arguments[i*2],arguments[i*2+1]);
        }

        this.cxt.closePath();
        this.cxt.stroke();

        return this;
    },



    /**
     *
     * @param text
     * @param x
     * @param y
     * @returns {Canvas}
     */
    text:function(text,x,y){
        this.cxt.strokeText(text,x,y);

        return this;
    },


    /**
     *
     * @param {String} src Image location.
     * @param {Number} x
     * @param {Number} y
     * @returns {canvas}
     */
    image:function(src,x,y){
        var image = new Image();
        image.src = src;
        if(image.complete){
            this.cxt.drawImage(image,x,y);
        }else{
            image.onload = function(){
                this.cxt.drawImage(image,x,y);
            }
        }

        return this;
    },




    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @returns {Canvas}
     */
    maskCircle:function(x,y,radius){
        this.cxt.beginPath();
        this.cxt.moveTo(0,0);
        this.cxt.lineTo(x,0);
        this.cxt.lineTo(x,y-radius);
        this.cxt.arcTo(x,y-radius,x,y+radius,radius);
        this.cxt.lineTo(x,canvasHeight);
        this.cxt.lineTo(0,canvasHeight);
        this.cxt.closePath();
        this.cxt.fill();

        return this;
    },


    moveCanvas:function(x,y){
        this.cxt.translate(x,y);

        return this;
    },
    rotateCanvas:function(dx,dy){
        if(dx === 0 && dy !== 0){
            dx = 1;
            dy = Infinity;
        }
        if(dy === 0 && dx !== 0){
            dy = 1;
            dx = Infinity;
        }
        this.cxt.rotate(Math.atan2(dy,dx));
        return this;
    },
    /**
     * Clean canvas
     * @returns {Canvas}
     */
    clearCanvas:function(){
        this.cxt.clearRect(0,0,this.width,this.height);

        return this;
    },
    /**
     * Save image to a pop up window.
     * @returns {Canvas}
     */
    saveImage:function(){
        try{
            window.open(this.myCanvas.toDataURL("image/png"));
        }catch(e){
            alert("Your browser do not support image saving.");
        }

        return this;
    },
    /**
     * Utility Function
     * @param x
     * @param y
     * @param angle
     * @param radius
     * @returns {Array|*}
     */
    calculateLineEndWithAngle:function(x,y,angle,radius){
        var dx = Math.sin(angle/180*Math.PI)*radius;
        var dy = Math.cos(angle/180*Math.PI)*radius;
        result = [];
        result.push(x+dx);
        result.push(y-dy);

        return result;
    },
    calculateDistance:function(x,y,x2,y2){
        var dx = x2 - x,
            dy = y2 - y;
        return Math.sqrt(dx*dx + dy*dy);
    },
    event:function(eventID,callback){
        this.canvas.addEventListener("mouseup",callback(e));
    },
    /*
    ** Utility Shapes
     */
    drawBackgroundGrid:function(color,stepX,stepY){
        this
            .setLineWidth(0.3)
            .setStrokeStyle(color);
        for (var i = stepX; i < this.width; i += stepX){
            this.line(i,0,i,this.height);
        }
        for (var i = stepX; i < this.height; i += stepY){
            this.line(0,i,this.width,i);
        }
        this.cxt.restore();
    },
    drawAxis:function(x,y,x2,y2,step,color){
        this
            .setStrokeStyle(color)
            .line(x,y,x2,y2);
        var distance = this.calculateDistance(x,y,x2,y2);
        this.rotateCanvas(x2-x,y2-y);
        for (var i = x; i <= distance + x; i+= step){
            this.line(i,y-5,i,y+5);
        }
    }
};