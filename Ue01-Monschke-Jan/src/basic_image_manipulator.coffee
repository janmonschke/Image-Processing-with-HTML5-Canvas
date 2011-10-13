
class BasicImageManipulator
  
  erosion : (structure, pixels) ->
    console.log "TODO: implement erosion"
    return pixels
  
  dilation : (structure, pixels) ->
    console.log "TODO: implement dilation"
    return pixels
    
  invert : (pixels) ->
    for x in [0..pixels.length] by 4
      inverted = Converter.invertPixel(pixels[x], pixels[x+1], pixels[x+2])
      pixels[x] = inverted[0]
      pixels[x+1] = inverted[1]
      pixels[x+2] = inverted[2]
    return pixels
    
  intersection : (pixels) ->
    console.log "TODO: implement intersection"
    return pixels