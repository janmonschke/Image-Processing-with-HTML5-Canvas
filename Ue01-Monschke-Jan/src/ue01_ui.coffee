###
The specific UI that applies the threshold, the ISO-Data Algo and the outline
###
class Ue01UI extends BaseUI
  
  constructor : ->
    super()
    # select all needed DOM elements
    @rangeElement = document.getElementById("threshold_range")
    @rangeLabel = document.getElementById("range_label")
    @selectElement = document.getElementById("binarize_mode")
    @outlineCheckbox = document.getElementById("outline_cb")
    @timeSpanElement = document.getElementById("render_time")
    
    # initialize the manipultaion objects
    @binarizer = new Binarizer()
    @binarizeMethod = "Threshold"
    @outliner = new Outliner()
    
  init : ->
    super()
    # apply events to elements
    @initRangeEvents()
    @initSelectEvents()
    @initCheckboxEvents()
    
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
      
  initCheckboxEvents : ->
    @outlineCheckbox.addEventListener "change", (ev) =>
      @updateImage(@imageElement)
  
  updateImage : (image) ->
    # startTime is used for displaying the time that was needed to render the image
    startTime = new Date().getTime()
    
    # draw the image into the canvas
    @canvasHelper.adjustSize(image)
    @canvasHelper.drawImage(image)
    
    # get the pixel data from the canvas element
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

    if @outlineCheckbox.checked == true
      id1 = ctx.getImageData(0, 0, image.width, image.height)
      id2 = ctx.getImageData(0, 0, image.width, image.height)
      newpixels = @outliner.calculateOutline(id1.data, id2.data, image.width, image.height)
      id1.data = newpixels
      @canvasHelper.putImageData(id1)

    @timeSpanElement.innerHTML = "Rendered in: #{new Date().getTime() - startTime}ms"