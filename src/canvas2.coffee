
class Canvas
  BLANK = "rgba(255,255,255,0)"
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


root = exports ? this
root.Canvas = Canvas