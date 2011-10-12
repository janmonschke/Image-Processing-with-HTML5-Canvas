/*
The Base class for all UIs in the Image Processing excercises.
It handles the D&D functionality and the filechooser
*/var BaseUI;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
BaseUI = (function() {
  function BaseUI() {
    this.canvasElement = document.getElementsByTagName("canvas")[0];
    this.canvasHelper = new CanvasHelper(this.canvasElement);
    this.imageElement = document.getElementById("original_image");
    this.fileChooserElement = document.getElementById("file_chooser");
  }
  BaseUI.prototype.init = function() {
    this.initFileChooser();
    return this.initDropEvents();
  };
  BaseUI.prototype.initFileChooser = function() {
    return this.fileChooserElement.addEventListener("change", __bind(function(ev) {
      var fReader, file;
      if (ev.target.files.length > 0 && ev.target.files[0].type.indexOf("image") > -1) {
        file = ev.target.files[0];
        fReader = new FileReader();
        fReader.onload = __bind(function(f) {
          var img;
          img = new Image();
          img.onload = __bind(function() {
            return this.updateImage(img);
          }, this);
          img.src = f.target.result;
          return this.imageElement.src = f.target.result;
        }, this);
        return fReader.readAsDataURL(file);
      }
    }, this));
  };
  BaseUI.prototype.initDropEvents = function() {
    document.body.addEventListener("dragenter", function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      console.log(ev);
      return false;
    });
    return document.body.addEventListener("drop", function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      console.log(ev);
      return false;
    });
  };
  BaseUI.prototype.updateImage = function(image) {
    return console.log("TODO: add callback function", arguments);
  };
  return BaseUI;
})();