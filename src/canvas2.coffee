
class Canvas
  constructor:(@canvasID = "canvas") ->
    @width = 600
    @height = 400
    @canvas
    @cxt


root = exports ? this
root.Canvas = Canvas