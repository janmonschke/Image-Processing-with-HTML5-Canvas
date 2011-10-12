class Histogram
  
  constructor : (@pixels) ->
  
  generateGrayscaleHistogram : ->
    # generate an empty histogram, divide length by 4 because of pixelformat
    histogram = @generateEmptyHistogram()
    
    for x in [0..@pixels.length] by 4
      currGrayScale = Converter.rgbaPixelToGrayscale(@pixels[x], @pixels[x+1], @pixels[x+2])
      histogram[currGrayScale]++
      
    histogram = @normalizeHistogram(histogram)
    return histogram
      
  generateEmptyHistogram : () ->
    histogram = new Array()
    for pixel in [0..255]
      histogram[pixel] = 0
    return histogram
  
  normalizeHistogram : (histogram) ->
    for x in [0..histogram.length]
      histogram[x] /= histogram.length
    return histogram