var BasicImageManipulator;
BasicImageManipulator = (function() {
  function BasicImageManipulator() {}
  BasicImageManipulator.prototype.erosion = function(structure, pixels) {
    console.log("TODO: implement erosion");
    return pixels;
  };
  BasicImageManipulator.prototype.dilation = function(structure, pixels) {
    console.log("TODO: implement dilation");
    return pixels;
  };
  BasicImageManipulator.prototype.invert = function(pixels) {
    var inverted, x, _ref;
    for (x = 0, _ref = pixels.length; (0 <= _ref ? x <= _ref : x >= _ref); x += 4) {
      inverted = Converter.invertPixel(pixels[x], pixels[x + 1], pixels[x + 2]);
      pixels[x] = inverted[0];
      pixels[x + 1] = inverted[1];
      pixels[x + 2] = inverted[2];
    }
    return pixels;
  };
  BasicImageManipulator.prototype.intersection = function(pixels) {
    console.log("TODO: implement intersection");
    return pixels;
  };
  return BasicImageManipulator;
})();