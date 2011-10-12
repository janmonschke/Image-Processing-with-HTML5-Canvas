class Binarizer
  constructor : ->
    @threshold = 128
    @maxRuns = 100
    
  setThreshold : (tr) ->
    @threshold = tr
  
  binarizeByThreshold : (pixels) ->
    for x in [0..pixels.length] by 4
      # x == R; x+1 == G; x+2 == B; x+3 == A
      gs = Converter.rgbaPixelToGrayscale(pixels[x], pixels[x+1], pixels[x+2])
      if gs < @threshold
        pixels[x] = 0
        pixels[x+1] = 0
        pixels[x+2] = 0
      else
        pixels[x] = 255
        pixels[x+1] = 255
        pixels[x+2] = 255
    return pixels
  
  binarizeByIsoDataAlgo : (pixels) ->
    # set start threshold
    @threshold = @oldThreshold = 128
    @runCount = 0
    @grayScaleHistogram = new Histogram(pixels).generateGrayscaleHistogram()
    @threshold = @calculateIsoDataThreshold()
    return @binarizeByThreshold(pixels)
    
  calculateIsoDataThreshold : ->
    unless @runCount++ >= @maxRuns or @newThreshold == @oldThreshold
      # buffer the old value
      @oldThreshold = @newThreshold
      
      pa = 0
      pa2 = 0
      for j in [0..@threshold-1]
        pa += @grayScaleHistogram[j]
        pa2 += j * @grayScaleHistogram[j]
      
      m1 = pa2 / pa
      
      pb = 0
      pb2 = 0
      for i in [@threshold..255]
        pb += @grayScaleHistogram[i]
        pb2 += i * @grayScaleHistogram[i]
      
      m2 = pb2 / pb
      
      @newThreshold = (m1 + m2) / 2
      
      @calculateIsoDataThreshold()
    else
      console.log "Isodata result: #{@newThreshold} after #{@runCount} runs"
      return @newThreshold