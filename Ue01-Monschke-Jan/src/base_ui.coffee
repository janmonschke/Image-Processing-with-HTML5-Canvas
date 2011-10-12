###
The Base class for all UIs in the Image Processing excercises.
It handles the D&D functionality and the filechooser
###
class BaseUI
  
  constructor : ->
    @canvasElement = document.getElementsByTagName("canvas")[0]
    @canvasHelper = new CanvasHelper(@canvasElement)
    @imageElement = document.getElementById("original_image")
    @fileChooserElement = document.getElementById("file_chooser")
    
  init : ->
    @initFileChooser()
    @initDropEvents()
    
  initFileChooser : ->
    @fileChooserElement.addEventListener "change", (ev) =>
    
      # check that a file has been chosen and its type is image
      if ev.target.files.length > 0 and ev.target.files[0].type.indexOf("image") > -1
        
        # select first file
        file = ev.target.files[0]

        fReader = new FileReader()
        
        # assign the result to the image element and call the callback
        fReader.onload = (f) =>
          img = new Image()
          img.onload = =>
            @updateImage(img)
          img.src = f.target.result
          @imageElement.src = f.target.result
        
        # start reading
        fReader.readAsDataURL(file)
    
  initDropEvents : ->
    
    # give visual feedback that the image can be dropped now
    document.body.addEventListener "dragenter", (ev) ->
      ev.preventDefault()
      ev.stopPropagation()
      console.log(ev)
      false
    
    # init reading the image
    document.body.addEventListener "drop", (ev) ->
      ev.preventDefault()
      ev.stopPropagation()
      console.log(ev)
      false
      
  updateImage : (image) ->
    console.log "TODO: add callback function", arguments
    