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
    this.timeSpanElement = document.getElementById("render_time");
    this.binarizer = new Binarizer();
    this.binarizeMethod = "Threshold";
    this.outliner = new Outliner();
  }
  Ue01UI.prototype.init = function() {
    Ue01UI.__super__.init.call(this);
    this.initRangeEvents();
    this.initSelectEvents();
    return this.initCheckboxEvents();
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
  Ue01UI.prototype.initCheckboxEvents = function() {
    return this.outlineCheckbox.addEventListener("change", __bind(function(ev) {
      return this.updateImage(this.imageElement);
    }, this));
  };
  Ue01UI.prototype.updateImage = function(image) {
    var ctx, id1, id2, imageData, newPixels, newpixels, pixels, startTime;
    startTime = new Date().getTime();
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
    this.rangeLabel.innerHTML = parseInt(this.binarizer.threshold, 10);
    imageData.data = newPixels;
    this.canvasHelper.putImageData(imageData);
    if (this.outlineCheckbox.checked === true) {
      id1 = ctx.getImageData(0, 0, image.width, image.height);
      id2 = ctx.getImageData(0, 0, image.width, image.height);
      newpixels = this.outliner.calculateOutline(id1.data, id2.data, image.width, image.height);
      id1.data = newpixels;
      this.canvasHelper.putImageData(id1);
    }
    return this.timeSpanElement.innerHTML = "Rendered in: " + (new Date().getTime() - startTime) + "ms";
  };
  return Ue01UI;
})();