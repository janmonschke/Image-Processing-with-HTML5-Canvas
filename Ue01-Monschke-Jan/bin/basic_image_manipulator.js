var BasicImageManipulator;
BasicImageManipulator = (function() {
  function BasicImageManipulator() {}
  BasicImageManipulator.prototype.isPixelBlack = function(r, g, b) {
    return r === 0 && g === 0 && b === 0;
  };
  BasicImageManipulator.prototype.isPixelWhite = function(r, g, b) {
    return r === 255 && g === 255 && b === 255;
  };
  BasicImageManipulator.prototype.erosion = function(structure, pixels, w, h) {
    var line, row, x, _ref;
    console.log("TODO: implement erosion");
    line = 0;
    row = 0;
    for (x = 0, _ref = pixels.length - 1; (0 <= _ref ? x <= _ref : x >= _ref); x += 4) {
      if (x % (w - 1) === 0 && x !== 0) {
        line++;
      }
      if (x % (w - 1) === 0) {
        row = 0;
      } else {
        row++;
      }
    }
    return pixels;
  };
  BasicImageManipulator.prototype.dilation = function(structure, pixels) {
    console.log("TODO: implement dilation");
    return pixels;
  };
  BasicImageManipulator.prototype.invert = function(pixels) {
    var x, _ref;
    for (x = 0, _ref = pixels.length; (0 <= _ref ? x <= _ref : x >= _ref); x += 4) {
      pixels[x] = 255 - pixels[x];
      pixels[x + 1] = 255 - pixels[x + 1];
      pixels[x + 2] = 255 - pixels[x + 2];
    }
    return pixels;
  };
  BasicImageManipulator.prototype.intersection = function(pixels) {
    console.log("TODO: implement intersection");
    return pixels;
  };
  return BasicImageManipulator;
})();