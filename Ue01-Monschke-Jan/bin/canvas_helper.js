var CanvasHelper;
CanvasHelper = (function() {
  function CanvasHelper(element) {
    this.element = element;
    this.context = this.element.getContext("2d");
  }
  CanvasHelper.prototype.adjustSize = function(element) {
    this.element.width = element.width;
    return this.element.height = element.height;
  };
  CanvasHelper.prototype.drawImage = function(image) {
    return this.context.drawImage(image, 0, 0);
  };
  CanvasHelper.prototype.putImageData = function(pixels) {
    return this.context.putImageData(pixels, 0, 0);
  };
  CanvasHelper.prototype.getImageData = function() {
    return this.context.getImageData(0, 0, image.width, image.height);
  };
  return CanvasHelper;
})();