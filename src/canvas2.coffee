
class Canvas
  BLANK = "rgba(255,255,255,0)"
  constructor:(@canvasID = "canvas") ->
    @width = 600
    @height = 400
    @canvas = null
    @cxt = null
    @imageData = null
    @xMouseDown = null
    @yMouseDown = null
    @xMouseUp = null
    @yMouseUp = null
    @isMouseDown = false
    #Initiation
    @init()
  init: ->
    @setCanvas(@canvasID)
  setCanvas: (canvasID)->
    @canvas = window.document.getElementById(canvasID)
    @cxt = @canvas.getContext("2d")
    this

  ###
  Style Configuration
  ###
  setStrokeStyle: (style) ->
    if style is null
      @cxt.strokeStyle = BLANK
    else
      @cxt.strokeStyle = style
    this
  setFillStyle: (style) ->
    if style is null
      @cxt.fillStyle = BLANK
    else
      @cxt.fillStyle = style
    this
  setFontStyle: (style) ->
    @cxt.font = style
    this
  setStrokeWidth: (width) ->
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
  #TODO:Canvas.arc still have some problem. Need to find a way without using tangent line
  arc: (x,y,x2,y2,radius) ->
    @cxt.beginPath()
    @cxt.moveTo(149,19)
    @cxt.arcTo(150,20,150,70,50)
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

  ###
  Drawing Utility
###
  clearCanvas: ->
    @cxt.clearRect(0,0,@width,@height)
    this
  saveImageData: ->
    @imageData = @cxt.getImageData(0,0,@width,@height)
    this
  restoreImageData: ->
    @cxt.putImageData(@imageData,0,0)
    this

  ###
  Calculation Utility
###
  calculateDistanceBetweenTwoPoints: (x,y,x2,y2) ->
    Math.sqrt (x2-x)*(x2-x) + (y2-y)*(y2-y)
  calculateLineEndPositionByAngle: (x,y,distance,angleInDegree) ->
    dx = Math.sin(angleInDegree/180*Math.PI)*distance;
    dy = Math.cos(angleInDegree/180*Math.PI)*distance;
    x:x+dx, y:y-dy
  calculatePositionOnCanvasFromEvent: (e) ->
    x = e.clientX
    y = e.clientY;
    bbox = @canvas.getBoundingClientRect()
    { x: x - bbox.left * (canvas.width  / bbox.width),y: y - bbox.top  * (canvas.height / bbox.height) };


  ###
  Utility Shapes
###
  #TODO:Need to improve the figures.
  drawCanvasBorder: ->
    @saveStyleConfiguration()
    @setFillStyle(null)
    @rect(0.5,0.5,@width-1,@height-1)
    @restoreStyleConfiguration()
    this
  drawBackgroundGrid: (stepX, stepY) ->
    @line(x+0.5,+0.5,x+0.5,@height+0.5) for x in [stepX..@width] by stepX
    @line(0.5,y+0.5,@width+0.5,y+0.5) for y in [stepY..@height] by stepY
    this
  drawGuideLine: (x,y)->
    @saveStyleConfiguration()
    @setStrokeWidth(1)
    @line(x+0.5,0,x+0.5,@height+0.5)
    @line(0+0.5,y+0.5,@width+0.5,y+0.5)
    @restoreStyleConfiguration()
    this

    ###
  Painting Gagets
###
  turnOnGuideLine: ->
    @saveImageData() if @imageData is null
    @canvas.addEventListener "mousemove", @turnOffGuideLineFunction
    this
  turnOffGuideLineFunction: (e) =>
    position = @calculatePositionOnCanvasFromEvent(e)
    @saveStyleConfiguration()
    @setStrokeStyle("lightgreen")
    @clearCanvas()
    @restoreImageData()
    @drawGuideLine(position.x,position.y)
    @restoreStyleConfiguration()
  turnOffGuideLine: ->
    @canvas.removeEventListener('mousemove',@turnOffGuideLineFunction)
  turnOnDrawingLine: ->
    @saveCurrentCanvasAndWaitMouseUpToRestoreTheCanvas()
    @canvas.addEventListener "mousemove", (e) =>
      if @isMouseDown
        position = @calculatePositionOnCanvasFromEvent(e)
        @line(@xMouseDown,@yMouseDown,position.x,position.y)
    @canvas.addEventListener "mouseup", (e) =>
      @line(@xMouseDown,@yMouseDown,@xMouseUp,@yMouseUp);
      @saveImageData()
      @turnOffGuideLine()
    this

  ###
  Gagets Utility
###
  saveCurrentCanvasAndWaitMouseUpToRestoreTheCanvas: () ->
    @canvas.addEventListener "mousedown", (e) =>
      @isMouseDown = true
      position = @calculatePositionOnCanvasFromEvent(e)
      @xMouseDown = position.x
      @yMouseDown = position.y
      @saveImageData() if @imageData is null
      @turnOnGuideLine()
    #TODO: Possible bugs, need to change to custom event.
    @canvas.addEventListener "mouseup", (e) =>
      @isMouseDown = false
      position = @calculatePositionOnCanvasFromEvent(e)
      @xMouseUp = position.x
      @yMouseUp = position.y
      @restoreImageData()
      @turnOffGuideLine()
    this





root = exports ? this
root.Canvas = Canvas