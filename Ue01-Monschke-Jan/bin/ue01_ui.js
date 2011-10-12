/*
The specific UI that applies the threshold, the ISO-Data Algo and the outline
*/var Ue01UI;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Ue01UI = (function() {
  __extends(Ue01UI, BaseUI);
  function Ue01UI() {
    Ue01UI.__super__.constructor.call(this);
    this.rangeElement = document.getElementById("threshold_range");
    this.rangeLabel = document.getElementById("range_label");
    this.selectElement = document.getElementById("binarize_mode");
    this.outlineCheckbox = document.getElementById("outline_cb");
    this.binarizer = new Binarizer();
    this.binarizeMethod = "Threshold";
    this.outliner = new Outliner();
  }
  Ue01UI.prototype.init = function() {
    Ue01UI.__super__.init.call(this);
    this.initRangeEvents();
    return this.initSelectEvents();
  };
  Ue01UI.prototype.initRangeEvents = function() {
    return this.rangeElement.addEventListener("change", __bind(function(ev) {
      this.binarizer.setThreshold(ev.target.value);
      if (document.getElementById("isodata_opt").selected === true) {
        document.getElementById("threshold_opt").selected = true;
        this.binarizeMethod = "Threshold";
      }
      return this.updateImage(this.imageElement);
    }, this));
  };
  Ue01UI.prototype.initSelectEvents = function() {
    return this.selectElement.addEventListener("change", __bind(function(ev) {
      this.binarizeMethod = ev.target.value;
      return this.updateImage(this.imageElement);
    }, this));
  };
  Ue01UI.prototype.updateImage = function(image) {
    var ctx, imageData, newPixels, newpixels, pixels;
    this.canvasHelper.adjustSize(image);
    this.canvasHelper.drawImage(image);
    ctx = this.canvasElement.getContext("2d");
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    pixels = imageData.data;
    switch (this.binarizeMethod) {
      case "Threshold":
        newPixels = this.binarizer.binarizeByThreshold(pixels);
        break;
      case "Iso-Data":
        newPixels = this.binarizer.binarizeByIsoDataAlgo(pixels);
        this.rangeElement.value = this.binarizer.threshold;
    }
    if (this.outlineCheckbox.checked === true) {
      newpixels = this.outliner.calculateOutline(pixels);
      console.log("TODO: implement outline");
    }
    this.rangeLabel.innerHTML = parseInt(this.binarizer.threshold, 10);
    imageData.data = newPixels;
    return this.canvasHelper.putImageData(imageData);
  };
  return Ue01UI;
})();