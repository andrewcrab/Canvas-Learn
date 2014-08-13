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

var LENGTH_OF_AXIS_READING = 5;
Canvas.prototype = {
    constructor:Canvas,
    canvasID:"canvas",
    width:600,
    height:400,
    canvas:null,
    cxt:null,
    drawingLayerData:null,
    /**
     * Call this in constructor.
     */
    init:function(){
        this.setCanvas(this.canvasID);
        this.cxt.save();
        //this.canvasWidth = this.canvas.width;
        //this.canvasHeight = this.canvas.height;
    },
    /**
     *Tie canvas object on the document to Canvas.cxt
     * @param {String} canvasID
     * @returns {canvas}
     */
    setCanvas:function(canvasID){
        this.canvasID = canvasID;
        this.canvas = window.document.getElementById(canvasID);
        this.cxt = this.canvas.getContext("2d");

        return this;
    },

    //TODO: Write example on how to write style.
    /**
     * Set fill style.
     * @param {String} style
     * @returns {Canvas}
     */
    setFillStyle:function(style){
        this.cxt.fillStyle = style;

        return this;
    },
    /**
     * Set stroke style.
     * @param {String} style
     * @returns {Canvas}
     */
    setStrokeStyle:function(style){
        this.cxt.strokeStyle = style;

        return this;
    },
    /**
     * Set line width.
     * @param width
     * @returns {Canvas}
     */
    setLineWidth:function(width){
        this.cxt.lineWidth = width;

        return this;
    },
    /**
     * Set font style.
     * @param {String} style
     * @example
     * @returns {canvas}
     */
    setFontStyle:function(style){
        this.cxt.font = style;

        return this;
    },
    //TODO:This function need more work. Study how to read css configuration.
    /**
     * Read canvas size or set it to Canvas.width/height
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
     * Save stroke and fill style, etc.
     * @returns {Canvas}
     */
    saveCanvasStyleConfiguration:function(){
        this.cxt.save();
        return this;
    },
    /**
     * Restore the configuration saved last time.
     * @returns {Canvas}
     */
    restoreCanvasStyleConfiguration:function(){
        this.cxt.restore();
        return this;
    },

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
     * Draw polygram?? on canvas.
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
     * Draw text on canvas
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
     * Draw image on canvas
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
     * Draw mask circle on canvas.
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

    /**
     * Move canvas by x,y.
     * @param x
     * @param y
     * @returns {Canvas}
     */
    moveCanvas:function(x,y){
        this.cxt.translate(x,y);

        return this;
    },
    /**
     * Rotate canvas by angle. To convert degree, use Math.PI*degree/180.
     * @param angle
     * @returns {Canvas}
     */
    rotateCanvas:function(angle){
        this.cxt.rotate(angle);
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
    saveImageInNewWindow:function(){
        try{
            window.open(this.canvas.toDataURL("image/png"));
        }catch(e){
            alert("Your browser do not support image saving.");
        }

        return this;
    },

    /**
     * Utility: Calculate the position of the end of the line by starting point, angle and distance.
     * @param x
     * @param y
     * @param angle
     * @param radius
     * @returns {Array|*}
     */
    calculateLineEndWithAngle:function(x,y,angle,distance){
        var dx = Math.sin(angle/180*Math.PI)*distance;
        var dy = Math.cos(angle/180*Math.PI)*distance;
        result = [];
        result.push(x+dx);
        result.push(y-dy);

        return result;
    },
    calculateAddHalfPoint:function(arr){
        
    },
    calculateDistance:function(x,y,x2,y2){
        var dx = x2 - x,
            dy = y2 - y;
        return Math.sqrt(dx*dx + dy*dy);
    },
    saveDrawingLayer: function() {
        this.drawingLayerData = this.cxt.getImageData(0, 0,this.width,this.height);

        return this;
    },
    restoreDrawingLayer:function() {
        this.cxt.putImageData(this.drawingLayerData, 0, 0);
        return this;
    },
    calculatePositionOnCanvasFromEvent:function(e){
        var x = e.clientX, y = e.clientY;
        var bbox = this.canvas.getBoundingClientRect();
        return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height) };
    },

    event:function(eventID,callback){
        this.cxt.addEventListener("mouseup",callback(e));
    },
    /*
    ** Utility Shapes
     */
    drawCanvasBorder:function(){
      this.rect(0,0,this.width,this.height);
      return this;
    },
    drawBackgroundGrid:function(stepX,stepY){
        for (var i = stepX; i < this.width; i += stepX){
            this.line(i,0,i,this.height);
        }
        for (var i = stepX; i < this.height; i += stepY){
            this.line(0,i,this.width,i);
        }
        return this;
    },
    drawAxis:function(x,y,length,step){
        //Axis
        this
            .line(x,y,x+length,y);

        //Readings, long bar every 5 readings
        for (var i = 0; i <= length/step; i ++){
            if (i%5 ===0){
                this.line(i*step + x,y+LENGTH_OF_AXIS_READING,i*step + x,y-LENGTH_OF_AXIS_READING);
            }else{
                this.line(i*step + x,y+LENGTH_OF_AXIS_READING*0.5,i*step + x,y-LENGTH_OF_AXIS_READING*0.5);

            }
        }

        return this;
    },
    drawGuideLine:function(x,y){
        this.cxt.save();
        this.line(x,0,x,this.height)
            .line(0,y,this.width,y);
        this.cxt.restore();
        return this;
    },

    /*
    ** Gagets
     */
    turnOnGuideLine:function(){


        var that = this;



        this.canvas.onmousemove = function(e){
            var position = that.calculatePositionOnCanvasFromEvent(e);
            if (!that.drawingLayerData){
                that.saveDrawingLayer();
            }

            that
                .clearCanvas()
                .restoreDrawingLayer()
                .saveCanvasStyleConfiguration()
                .setStrokeStyle("navy")
                .setLineWidth(0.25)
                .drawGuideLine(position.x+0.5, position.y+0.5)//Pixel is on 0.5, give integer x,y, you will nerver get 1 pixel
                .restoreCanvasStyleConfiguration();

        };


        return this;
    }
};

