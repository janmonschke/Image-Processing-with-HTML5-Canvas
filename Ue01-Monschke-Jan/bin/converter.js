/*
A static helper object for several convert methods
*/var Converter;
Converter = {
  rgbaPixelToGrayscale: function(r, g, b, a) {
    return r * .3 + g * .59 + b * .11;
  }
};