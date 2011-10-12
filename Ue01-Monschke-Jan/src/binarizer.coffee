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
    @threshold = 128
    @grayScaleHistogram = new Histogram(pixels).generateGrayscaleHistogram()

    @threshold = @calculateIsoDataThreshold(0, 128, 128)
    return @binarizeByThreshold(pixels)
    
  calculateIsoDataThreshold : (runCount, oldT, newT) ->
    # stop when max number of runs has been reached or there was no change in the last calculation
    unless runCount++ >= @maxRuns or (runCount > 1 and oldT == newT)
      
      # calculate both weight points
      m1 = @calculateClusterWeight(0, parseInt(newT, 10)-1)
      m2 = @calculateClusterWeight(parseInt(newT, 10), 255)

      # buffer the old value
      oldT = newT
      
      # calbulate arithmetic average of both points
      newT = (m1 + m2) / 2
      
      # recursively go on calculating
      @calculateIsoDataThreshold(runCount, oldT, newT)
    else
      console.log "Isodata result: #{newT} after #{runCount-1} runs"
      return newT
      
  calculateClusterWeight : (from, to) ->
    p = 0
    p2 = 0
    # sum up the values
    for j in [from..to]
      p += @grayScaleHistogram[j]
      p2 += j * @grayScaleHistogram[j]
      
    # return the weight or zero to prevent division by zero
    return if p != 0 then p2 / p else 0