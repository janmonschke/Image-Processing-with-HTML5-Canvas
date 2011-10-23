
class BasicImageManipulator
  
  isPixelBlack : (r, g, b) ->
    return (r == 0 && g == 0 && b == 0)
  
  isPixelWhite :  (r, g, b) ->
    return (r == 255 && g == 255 && b == 255)
  
  erosion : (structure, pixels, w, h) ->
    console.log "TODO: implement erosion"
    line = 0
    row = 0
    for x in [0..pixels.length - 1] by 4
      # it's not that fun to iterate over a flat array
      line++ if x % (w-1) == 0 and x != 0
      if x % (w-1) == 0
        row = 0
      else
        row++
      
    #   surroundingPixels = [[0, 0, 0],
    #                        [0, x*pixels, 0],
    #                        [0, 0, 0]]
    #   
    #   
    #   
    #   for str_y in [0..structure.length - 1]
    #     surroundingPixels.push(new Array())
    #     for str_x in [0..structure[str_x].length - 1]
          
    
    return pixels
  
  dilation : (structure, pixels) ->
    console.log "TODO: implement dilation"
    return pixels
    
  invert : (pixels) ->
    for x in [0..pixels.length] by 4
      pixels[x] = 255 - pixels[x]
      pixels[x+1] = 255 - pixels[x+1]
      pixels[x+2] = 255 - pixels[x+2]
    return pixels
    
  intersection : (pixels) ->
    console.log "TODO: implement intersection"
    return pixels