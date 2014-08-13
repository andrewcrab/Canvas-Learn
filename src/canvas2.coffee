
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
      @cxt.strokeStyle = "rgba(255,255,255,0)"
    else
      @cxt.strokeStyle = style
    this
  setFillStyle: (style) ->
    if style is null
      @cxt.fillStyle = "rgba(255,255,255,0)"
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
    @cxt.closePath()
    @cxt.stroke()
    this
  rect: (x,y,width,height) ->
    @cxt.strokeRect(x,y,width,height)
    @cxt.fillRect(x,y,width,height)
    console.log("Fill is blank")
    this

root = exports ? this
root.Canvas = Canvas