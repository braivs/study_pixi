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
  const reels = [
    {symbol: reel1, spinning: false, y: 150, targetY: 150},
    {symbol: reel2, spinning: false, y: 150, targetY: 150},
    {symbol: reel3, spinning: false, y: 150, targetY: 150},
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
      reel.symbol.y = 50

      // Each subsequent rail stops later
      setTimeout(() => {
        reel.targetY = 150
        reel.symbol.text = symbols[Math.floor(Math.random() * symbols.length)]
      }, index * 500)
    })
  })

  // Animation
  app.ticker.add(() => {
    let allStopped = true

    reels.forEach((reel) => {
      if (reel.spinning && reel.y < reel.targetY) {
        reel.y += 5
        reel.symbol.y = reel.y
        allStopped = false
      }
    })

    if (allStopped && !canSpin) {
      canSpin = true

      // check win
      if (reels[0].symbol.text === reels[1].symbol.text && reels[1].symbol.text === reels[2].symbol.text) {
        console.log('WIN!')
      }

    }
  })

  app.stage.addChild(button)

}