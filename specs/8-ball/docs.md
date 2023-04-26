# Magic 8-Ball Project

## Intro:


## How to Use:


## Code Docs:
- index.html  
  
- style.css  

  - .ballwrapper  
   
  - #ball  
    
  - .ballbackground  
    
  - .answer  
    
  - .graphic  
    
  - .instructions  
    
- script.js  
    
  - responses[]  
    
  - predict()
  
  - typeResponse()

  - ball.addEventListener('mousedown')
    On event user clicks on the eight ball, set up for shaking
    Do not allow shaking while the 8-ball is speaking.

  - document.addEventListener('mousemove')
    On event user moves mouse anywhere on webpage, move 8-ball
    too. This simulates shaking the 8-ball. Keep track of if
    the 8-ball has been shaken hard enough.

  - document.addEventListener('mouseup')
    On event user lets go of mouse, stop shaking the 8-ball.
    Return 8-ball to original place, and output response. Reset
    variables for next shaking.

  - Variables
    synth - Handler for text to speech
    response - Element for <p> used to output 8-ball response
    ball - Element for <div> that is the 8-ball
    ballDisplayOffset[] - array of 2 floats with original offset/position of 8-ball
    ballOffset[] - array of 2 floats with updated position of 8-ball
    isMoving - boolean indicating whether 8-ball has been shaken hard enough
    isDown - boolean indicating whether 8-ball is being pressed

