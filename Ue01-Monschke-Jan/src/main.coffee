if typeof console == "undefined"
    console = { log: -> }

window.addEventListener "load", ->
  filterUi = new Ue01UI()
  filterUi.init()
  filterUi.updateImage(document.getElementById('original_image'))