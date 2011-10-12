var Binarizer;
Binarizer = (function() {
  function Binarizer() {
    this.threshold = 128;
    this.maxRuns = 100;
  }
  Binarizer.prototype.setThreshold = function(tr) {
    return this.threshold = tr;
  };
  Binarizer.prototype.binarizeByThreshold = function(pixels) {
    var gs, x, _ref;
    for (x = 0, _ref = pixels.length; (0 <= _ref ? x <= _ref : x >= _ref); x += 4) {
      gs = Converter.rgbaPixelToGrayscale(pixels[x], pixels[x + 1], pixels[x + 2]);
      if (gs < this.threshold) {
        pixels[x] = 0;
        pixels[x + 1] = 0;
        pixels[x + 2] = 0;
      } else {
        pixels[x] = 255;
        pixels[x + 1] = 255;
        pixels[x + 2] = 255;
      }
    }
    return pixels;
  };
  Binarizer.prototype.binarizeByIsoDataAlgo = function(pixels) {
    this.threshold = this.oldThreshold = 128;
    this.runCount = 0;
    this.grayScaleHistogram = new Histogram(pixels).generateGrayscaleHistogram();
    this.threshold = this.calculateIsoDataThreshold();
    return this.binarizeByThreshold(pixels);
  };
  Binarizer.prototype.calculateIsoDataThreshold = function() {
    var i, j, m1, m2, pa, pa2, pb, pb2, _ref, _ref2;
    if (!(this.runCount++ >= this.maxRuns || this.newThreshold === this.oldThreshold)) {
      this.oldThreshold = this.newThreshold;
      pa = 0;
      pa2 = 0;
      for (j = 0, _ref = this.threshold - 1; (0 <= _ref ? j <= _ref : j >= _ref); (0 <= _ref ? j += 1 : j -= 1)) {
        pa += this.grayScaleHistogram[j];
        pa2 += j * this.grayScaleHistogram[j];
      }
      m1 = pa2 / pa;
      pb = 0;
      pb2 = 0;
      for (i = _ref2 = this.threshold; (_ref2 <= 255 ? i <= 255 : i >= 255); (_ref2 <= 255 ? i += 1 : i -= 1)) {
        pb += this.grayScaleHistogram[i];
        pb2 += i * this.grayScaleHistogram[i];
      }
      m2 = pb2 / pb;
      this.newThreshold = (m1 + m2) / 2;
      return this.calculateIsoDataThreshold();
    } else {
      console.log("Isodata result: " + this.newThreshold + " after " + this.runCount + " runs");
      return this.newThreshold;
    }
  };
  return Binarizer;
})();