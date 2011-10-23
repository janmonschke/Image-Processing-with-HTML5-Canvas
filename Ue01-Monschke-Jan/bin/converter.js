/*
A static helper object for several convert methods
*/var Converter;
Converter = {
  rgbaPixelToGrayscale: function(r, g, b, a) {
    return parseInt(r * .3 + g * .59 + b * .11, 10);
  },
  invertPixel: function(r, g, b) {
    return [255 - r, 255 - g, 255 - b];
  },
  canvasPixelToIntegerPixel: function(pixelData) {
    var a, b, g, integerPixels, r, rgb, x, _ref;
    integerPixels = new Array();
    for (x = 0, _ref = pixelData.length - 1; (0 <= _ref ? x <= _ref : x >= _ref); x += 4) {
      b = pixelData[x + 2];
      g = pixelData[x + 1] << 8;
      r = pixelData[x] << 16;
      a = pixelData[x + 3] << 24;
      rgb = (a | r | g | b) >>> 0;
      integerPixels.push(rgb);
    }
    return integerPixels;
  }
};