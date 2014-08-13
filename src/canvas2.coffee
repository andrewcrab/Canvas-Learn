
class Canvas
  constructor:(@canvasID = "canvas") ->
    @width = 600
    @height = 400
    @canvas
    @cxt
  init: ->
    @setCanvas(@canvasID)
  setCanvas: (canvasID)->
    @canvas = window.document.getElementById(canvasID)
    @cxt = @canvas.getContext("2d")



root = exports ? this
root.Canvas = Canvas