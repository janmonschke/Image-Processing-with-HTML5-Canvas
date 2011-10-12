###
A static helper object for several convert methods
###

Converter =
  
  # converts the rgba values to a grayscale int value in the range from 0 to 255
  # bases on http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
  rgbaPixelToGrayscale : (r, g, b, a) ->
    return parseInt(r * .3 + g * .59 + b * .11, 10)