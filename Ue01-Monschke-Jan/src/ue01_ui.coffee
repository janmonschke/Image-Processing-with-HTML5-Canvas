###
The specific UI that applies the threshold, the ISO-Data Algo and the outline
###
class Ue01UI extends BaseUI
  
  constructor : ->
    super()
    @rangeElement = document.getElementById("threshold_range")
    @rangeLabel = document.getElementById("range_label")
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
      if document.getElementById("isodata_opt").selected == true
        document.getElementById("threshold_opt").selected = true
        @binarizeMethod = "Threshold"
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
      when "Threshold"
        newPixels = @binarizer.binarizeByThreshold(pixels)
      when "Iso-Data"  
        newPixels = @binarizer.binarizeByIsoDataAlgo(pixels)
        @rangeElement.value = @binarizer.threshold
    
    @rangeLabel.innerHTML = parseInt(@binarizer.threshold, 10)
    
    imageData.data = newPixels
    @canvasHelper.putImageData(imageData)
  
  