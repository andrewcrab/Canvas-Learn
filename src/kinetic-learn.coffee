stage = new Kinetic.Stage
  container: 'container'
  width: 578
  height:200

animLayer = new Kinetic.Layer()
#staticLayer = new Kinetic.Layer()

###
  shapes
###
blueHex = new Kinetic.RegularPolygon
  x: 100
  y: stage.height()/2
  sides: 6
  radius: 70
  fill: "#00D2FF"
  stroke:"black"
  strokeWidth:4
  draggable:true

animLayer.add blueHex
stage.add animLayer



K = this.K

K =
  version: '0.0.1'
  idCounter: 0,

