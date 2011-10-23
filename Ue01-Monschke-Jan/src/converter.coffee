###
A static helper object for several convert methods
###

Converter =
  
  # converts the rgba values to a grayscale int value in the range from 0 to 255
  # bases on http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
  rgbaPixelToGrayscale : (r, g, b, a) ->
    return parseInt(r * .3 + g * .59 + b * .11, 10)
   
  invertPixel : (r, g, b) ->
    return [255 - r, 255 - g, 255 - b]
    
  # converts the canvas pixel array to integer pixel data
  canvasPixelToIntegerPixel : (pixelData) ->
    integerPixels = new Array()
    
    # one intger will have the following format 0xAARRGGBB
    for x in [0..pixelData.length-1] by 4
      b = pixelData[x+2]
      g = pixelData[x+1] << 8
      r = pixelData[x] << 16
      a = pixelData[x+3] << 24
      rgb = (a | r | g | b) >>> 0
      integerPixels.push(rgb)
    
    return integerPixels