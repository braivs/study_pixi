// Exercise 7: 3 reels with animation

import {Application, Graphics, Text} from "pixi.js";

export async function exercise7() {
  const app = new Application()

  await app.init({
    width: 500,
    height: 500,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  })

  document.body.appendChild(app.canvas)

  const symbols = ['🍒', '🍋', '🍊', '🔔', '⭐']
  const CHANGE_SYMBOLS_EVERY_FRAME = true // Flag: change symbols every frame during spin

  // creating 3 symbols (1 for rail)
  const reel1 = new Text({text: symbols[0], style: {fontSize: 60, fill: '#FFFFFF'}})
  const reel2 = new Text({text: symbols[0], style: {fontSize: 60, fill: '#FFFFFF'}})
  const reel3 = new Text({text: symbols[0], style: {fontSize: 60, fill: '#FFFFFF'}})

  reel1.anchor.set(0.5)
  reel2.anchor.set(0.5)
  reel3.anchor.set(0.5)

  reel1.x = 150
  reel2.x = 250
  reel3.x = 350
  reel1.y = 150
  reel2.y = 150
  reel3.y = 150

  app.stage.addChild(reel1, reel2, reel3)

  // state of each reel
  // canStop: flag that allows reel to stop when it reaches targetY
  // Without this, all reels would stop simultaneously since they all have the same targetY
  const reels = [
    {symbol: reel1, spinning: false, y: 150, targetY: 150, canStop: false},
    {symbol: reel2, spinning: false, y: 150, targetY: 150, canStop: false},
    {symbol: reel3, spinning: false, y: 150, targetY: 150, canStop: false},
  ]

  // Button
  const button = new Graphics()
  button.roundRect(0, 0, 120, 50, 10)
  button.fill(0x00FF00)
  button.x = 190
  button.y = 300

  const buttonText = new Text({
    text: 'SPIN',
    style: {
      fontSize: 20,
      fill: '#FFFFFF',
      fontWeight: 'bold'
    }
  })
  buttonText.anchor.set(0.5)
  buttonText.x = 60
  buttonText.y = 25
  button.addChild(buttonText)

  button.eventMode = 'static'
  button.cursor = 'pointer'

  let canSpin = true

  button.on('pointerdown', () => {
    if (!canSpin) return
 
    canSpin = false

    // run all reels
    reels.forEach((reel, index) => {
      reel.spinning = true
      reel.y = 50
      reel.targetY = 150
      // Reset canStop to false - reel will keep spinning until permission is granted
      reel.canStop = false
      reel.symbol.y = 50

      // Set initial random symbol
      reel.symbol.text = symbols[Math.floor(Math.random() * symbols.length)]

      // Cascade stop: each reel gets permission to stop at different times
      // Reel 0 stops immediately (0ms), reel 1 after 500ms, reel 2 after 1000ms
      setTimeout(() => {
        // Set final symbol when reel is allowed to stop
        reel.symbol.text = symbols[Math.floor(Math.random() * symbols.length)]
        reel.canStop = true  // Grant permission to stop
      }, index * 500)
    })
  })

  // Animation
  app.ticker.add(() => {
    let allStopped = true

    reels.forEach((reel) => {
      if (reel.spinning) {
        if (reel.y < reel.targetY) {
          // Still moving towards target position
          reel.y += 5
          reel.symbol.y = reel.y
          
          // Change symbol every frame during spin (if flag enabled)
          if (CHANGE_SYMBOLS_EVERY_FRAME) {
            reel.symbol.text = symbols[Math.floor(Math.random() * symbols.length)]
          }
          
          allStopped = false
        } else if (reel.canStop) {
          // Reached target AND has permission to stop - stop the reel
          reel.spinning = false
          reel.y = reel.targetY
          reel.symbol.y = reel.y
        } else {
          // Reached target but no permission yet - reset position to keep spinning
          // This creates the visual effect of continuous spinning until canStop becomes true
          reel.y = 50
          reel.symbol.y = reel.y
          
          allStopped = false
        }
      }
    })

    if (allStopped && !canSpin) {
      canSpin = true

      // check win
      if (reels[0].symbol.text === reels[1].symbol.text &&
        reels[1].symbol.text === reels[2].symbol.text) {
        console.log('WIN!')
      }

    }
  })

  app.stage.addChild(button)

}