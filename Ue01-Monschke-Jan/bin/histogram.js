var Histogram;
Histogram = (function() {
  function Histogram(pixels) {
    this.pixels = pixels;
  }
  Histogram.prototype.generateGrayscaleHistogram = function() {
    var currGrayScale, histogram, x, _ref;
    histogram = this.generateEmptyHistogram();
    for (x = 0, _ref = this.pixels.length; (0 <= _ref ? x <= _ref : x >= _ref); x += 4) {
      currGrayScale = Converter.rgbaPixelToGrayscale(this.pixels[x], this.pixels[x + 1], this.pixels[x + 2]);
      histogram[currGrayScale]++;
    }
    histogram = this.normalizeHistogram(histogram);
    return histogram;
  };
  Histogram.prototype.generateEmptyHistogram = function() {
    var histogram, pixel;
    histogram = new Array();
    for (pixel = 0; pixel <= 255; pixel++) {
      histogram[pixel] = 0;
    }
    return histogram;
  };
  Histogram.prototype.normalizeHistogram = function(histogram) {
    var x, _ref;
    for (x = 0, _ref = histogram.length; (0 <= _ref ? x <= _ref : x >= _ref); (0 <= _ref ? x += 1 : x -= 1)) {
      histogram[x] /= histogram.length;
    }
    return histogram;
  };
  return Histogram;
})();