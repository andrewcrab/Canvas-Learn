root = exports ? this

root.ShapeLayer = ShapeLayer
class ShapeLayer
  @fuctionForDrawingCollection = []
  constructor: (@pen) ->

  lineFunc: (x,y,x2,y2) ->
    => pen.line(x,y,x2,y2)
  line:(x,y,x2,y2) ->
    @fuctionForDrawingCollection.push @lineFunc(x,y,x2,y2)
    this
  drawAll: ->
    f() for f in @fuctionForDrawingCollectionion




root.Calculator = Calculator
Calculator =
  distanceBetweenTwoPoints: (x,y,x2,y2) ->
    Math.sqrt (x2-x)*(x2-x) + (y2-y)*(y2-y)
  lineEndPositionByAngle: (x,y,distance,angleInDegree) ->
    dx = Math.sin(angleInDegree/180*Math.PI)*distance;
    dy = Math.cos(angleInDegree/180*Math.PI)*distance;
    x:x+dx, y:y-dy
  positionOnCanvasFromEvent: (e) ->
    x = e.clientX
    y = e.clientY;
    bbox = canvas.getBoundingClientRect()
    { x: x - bbox.left * (canvas.width  / bbox.width),y: y - bbox.top  * (canvas.height / bbox.height) };

root.Canvas = Canvas
class Canvas
  constructor:(@canvasID = "canvas") ->
    @width = 600
    @height = 400
    @canvas = null
    @cxt = null
    @init()
  init: ->
    @setCanvas(@canvasID)
  setCanvas: (canvasID)->
    @canvas = window.document.getElementById(canvasID)
    @cxt = @canvas.getContext("2d")
    this
  #TODO: Rethink this pattern
#  turnOnPen: (base = this)->
#      pen = new Pen(base)
#      @pen = pen
#      pen
#  turnOnShapeLayer: (base = this) ->
#    @turnOnPen(this)
#    sl = new ShapeLayer(this.pen)
#    @shapeLayer = sl
#    sl

root.Pen = Pen

class Pen
  BLANK = "rgba(255,255,255,0)"
  constructor:(canvas) ->
    @canvas = canvas.canvas
    @cxt = canvas.cxt
    @imageData = null
    #Initiation
    @init()
  init: ->
    @moveCanvas(0.5,0.5)
  ###
  Style Configuration
  ###
  setFillStyle: (style) ->
    if style is null
      @cxt.fillStyle = BLANK
    else
      @cxt.fillStyle = style
    this
  setFontStyle: (style) ->
    @cxt.font = style
    this
  setLineStyle: (style) ->
    if style is null
      @cxt.strokeStyle = BLANK
    else
      @cxt.strokeStyle = style
    this
  setLineWidth: (width) ->
    @cxt.lineWidth = width
    this
  saveStyleConfiguration: ->
    @cxt.save()
    this
  restoreStyleConfiguration: ->
    @cxt.restore()
    this

  ###
  Draw Functions
  ###
  line: (x,y,x2,y2)->
    @cxt.beginPath()
    @cxt.moveTo(x,y)
    @cxt.lineTo(x2,y2)
    @cxt.stroke()
    this
  rect: (x,y,width,height) ->
    @cxt.strokeRect(x,y,width,height)
    @cxt.fillRect(x,y,width,height)
    this
  circle: (x,y,radius) ->
    @cxt.beginPath()
    @cxt.moveTo(x,y)
    @cxt.arc(x,y,radius,0,Math.PI*2)
    @cxt.closePath()
    @cxt.stroke()
    @cxt.fill()
    this
  poly: (points...) ->
    @cxt.beginPath();
    @cxt.moveTo(points.pop(),points.pop())
    @cxt.lineTo(points.pop(),points.pop()) while points.length isnt 0
    @cxt.closePath()
    @cxt.stroke()
    @cxt.fill()
    this
  text: (x,y,text) ->
    @cxt.strokeText(text,x,y)
    @cxt.fillText(text,x,y)
    this
  image: (x,y,src) ->
    img = new Image()
    img.src = src
    if img.complete
      @cxt.drawImage(img,x,y)
    else
      img.onload = ->
        @cxt.drawImage(img,x,y)
    this

  ###
  Canvas Movement
###
  moveCanvas: (x,y) ->
    @cxt.translate(x,y)
    this
  rotateCanvas: (angle) ->
    @cxt.rotate(angle)
    this

