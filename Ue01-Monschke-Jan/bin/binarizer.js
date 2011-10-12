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
    this.threshold = 128;
    this.grayScaleHistogram = new Histogram(pixels).generateGrayscaleHistogram();
    this.threshold = this.calculateIsoDataThreshold(0, 128, 128);
    return this.binarizeByThreshold(pixels);
  };
  Binarizer.prototype.calculateIsoDataThreshold = function(runCount, oldT, newT) {
    var m1, m2;
    if (!(runCount++ >= this.maxRuns || (runCount > 1 && oldT === newT))) {
      m1 = this.calculateClusterWeight(0, parseInt(newT, 10) - 1);
      m2 = this.calculateClusterWeight(parseInt(newT, 10), 255);
      oldT = newT;
      newT = (m1 + m2) / 2;
      return this.calculateIsoDataThreshold(runCount, oldT, newT);
    } else {
      console.log("Isodata result: " + newT + " after " + (runCount - 1) + " runs");
      return newT;
    }
  };
  Binarizer.prototype.calculateClusterWeight = function(from, to) {
    var j, p, p2;
    p = 0;
    p2 = 0;
    for (j = from; (from <= to ? j <= to : j >= to); (from <= to ? j += 1 : j -= 1)) {
      p += this.grayScaleHistogram[j];
      p2 += j * this.grayScaleHistogram[j];
    }
    if (p !== 0) {
      return p2 / p;
    } else {
      return 0;
    }
  };
  return Binarizer;
})();