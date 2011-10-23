class Outliner extends BasicImageManipulator
  
  calculateOutline : (pixels, copy, w, h) ->
    outlineStructure =  [[0, 1, 0],
                         [1, 1, 1],
                         [0, 1, 0]]
    
    pixels = @erosion(outlineStructure, pixels, w, h)
    
    pixels = @invert(pixels)
    
    pixels = @intersection(pixels, copy)
    
    return pixels