###
The specific UI that applies the threshold, the ISO-Data Algo and the outline
###
class Ue01UI extends BaseUI
  
  constructor : ->
    super()
    @rangeElement = document.getElementById("threshold_range")
    @selectElement = document.getElementById("binarize_mode")
    @binarizer = new Binarizer()
    @binarizeMethod = "Threshold"
    
  init : ->
    super()
    @initRangeEvents()
    @initSelectEvents()
    
  initRangeEvents : ->
    @rangeElement.addEventListener "change", (ev) =>
      @binarizer.setThreshold(ev.target.value)
      @updateImage(@imageElement)
  
  initSelectEvents : ->
    @selectElement.addEventListener "change", (ev) =>
      @binarizeMethod = ev.target.value
      @updateImage(@imageElement)
  
  updateImage : (image) ->
    @canvasHelper.adjustSize(image)
    @canvasHelper.drawImage(image)
    
    ctx = @canvasElement.getContext("2d")
    imageData = ctx.getImageData(0, 0, image.width, image.height)
    pixels = imageData.data
    
    switch @binarizeMethod
      when "Threshold" then newPixels = @binarizer.binarizeByThreshold(pixels)
      when "Iso-Data" then newPixels = @binarizer.binarizeByIsoDataAlgo(pixels)
    
    # update the range element's value
    @rangeElement.value = @binarizer.threshold
    
    imageData.data = newPixels
    @canvasHelper.putImageData(imageData)
  
  