class CanvasHelper
  
  constructor : (@element) ->
    @context = @element.getContext("2d")
  
  adjustSize : (element) ->
    @element.width = element.width
    @element.height = element.height
    
  drawImage : (image) ->
    @context.drawImage(image, 0, 0)
    
  putImageData : (pixels) ->
    @context.putImageData(pixels, 0, 0)
    
  getImageData : ->
    @context.getImageData(0, 0, image.width, image.height)