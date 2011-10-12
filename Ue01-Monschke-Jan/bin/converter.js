/*
A static helper object for several convert methods
*/var Converter;
Converter = {
  rgbaPixelToGrayscale: function(r, g, b, a) {
    return parseInt(r * .3 + g * .59 + b * .11, 10);
  }
};