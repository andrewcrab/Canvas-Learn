// Generated by CoffeeScript 1.7.1
(function() {
  var Canvas, root;

  Canvas = (function() {
    var BLANK;

    BLANK = "rgba(255,255,255,0)";

    function Canvas(canvasID) {
      this.canvasID = canvasID != null ? canvasID : "canvas";
      this.width = 600;
      this.height = 400;
      this.canvas = null;
      this.cxt = null;
      this.init();
    }

    Canvas.prototype.init = function() {
      return this.setCanvas(this.canvasID);
    };

    Canvas.prototype.setCanvas = function(canvasID) {
      this.canvas = window.document.getElementById(canvasID);
      this.cxt = this.canvas.getContext("2d");
      return this;
    };

    Canvas.prototype.setStrokeStyle = function(style) {
      if (style === null) {
        this.cxt.strokeStyle = "rgba(255,255,255,0)";
      } else {
        this.cxt.strokeStyle = style;
      }
      return this;
    };

    Canvas.prototype.setFillStyle = function(style) {
      if (style === null) {
        this.cxt.fillStyle = "rgba(255,255,255,0)";
      } else {
        this.cxt.fillStyle = style;
      }
      return this;
    };

    Canvas.prototype.setFontStyle = function(style) {
      this.cxt.font = style;
      return this;
    };

    Canvas.prototype.setStrokeWidth = function(width) {
      this.cxt.lineWidth = width;
      return this;
    };

    Canvas.prototype.saveStyleConfiguration = function() {
      this.cxt.save();
      return this;
    };

    Canvas.prototype.restoreStyleConfiguration = function() {
      this.cxt.restore();
      return this;
    };

    Canvas.prototype.line = function(x, y, x2, y2) {
      this.cxt.beginPath();
      this.cxt.moveTo(x, y);
      this.cxt.lineTo(x2, y2);
      this.cxt.stroke();
      return this;
    };

    Canvas.prototype.rect = function(x, y, width, height) {
      this.cxt.strokeRect(x, y, width, height);
      this.cxt.fillRect(x, y, width, height);
      return this;
    };

    Canvas.prototype.circle = function(x, y, radius) {
      this.cxt.beginPath();
      this.cxt.moveTo(x, y);
      this.cxt.arc(x, y, radius, 0, Math.PI * 2);
      this.cxt.closePath();
      this.cxt.stroke();
      this.cxt.fill();
      return this;
    };

    return Canvas;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Canvas = Canvas;

}).call(this);

//# sourceMappingURL=canvas2.map
