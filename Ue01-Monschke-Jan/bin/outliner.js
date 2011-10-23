var Outliner;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Outliner = (function() {
  function Outliner() {
    Outliner.__super__.constructor.apply(this, arguments);
  }
  __extends(Outliner, BasicImageManipulator);
  Outliner.prototype.calculateOutline = function(pixels, copy, w, h) {
    var outlineStructure;
    outlineStructure = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
    pixels = this.erosion(outlineStructure, pixels, w, h);
    pixels = this.invert(pixels);
    pixels = this.intersection(pixels, copy);
    return pixels;
  };
  return Outliner;
})();