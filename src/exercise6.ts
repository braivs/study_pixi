// Exercise 6: Add simple animation

import {Application, Graphics, Text} from "pixi.js";

export async function exercise6() {
  const app = new Application()

  await app.init({
    width: 400,
    height: 300,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  })

  document.body.appendChild(app.canvas)

  const symbols = ['🍒', '🍋', '🍊', '🔔', '⭐']

  const symbol = new Text({
    text: symbols[0],
    style: {
      fontSize: 60,
      fill: '#FFFFFF'
    }
  })
  symbol.anchor.set(0.5)
  symbol.x = 200
  symbol.y = 50 // begin at top

  app.stage.addChild(symbol)

  let isSpinning = false // Flag: is slot is spinning
  let targetY = 150 // Where the symbol must land
  let startY = 50
  let progress = 0
  const animationDuration = 60 // Number of frames for animation

  // Easing function: smooth acceleration at start, smooth deceleration at end
  function easeInOut(progress: number): number {
    // progress goes from 0 (start) to 1 (end)
    
    const half = 0.5 // Middle of animation
    
    if (progress < half) {
      // First half: acceleration (ease-in)
      // Square makes movement slow at start, fast towards middle
      return 2 * progress * progress
    } else {
      // Second half: deceleration (ease-out)
      // Reverse progress: from 1 to 0.5, square it and invert
      const reversedProgress = 2 - 2 * progress // from 1 to 0
      const squared = reversedProgress * reversedProgress
      return 1 - squared / 2
    }
  }

  // Button
  const button = new Graphics()
  button.roundRect(0, 0, 100, 50, 10)
  button.fill(0x00FF00)
  button.x = 150
  button.y = 220

  app.stage.addChild(button)

  const buttonText = new Text({
    text: 'Roll',
    style: {
      fontSize: 20,
      fill: '#FFFFFF',
      fontWeight: 'bold'
    }
  })
  buttonText.anchor.set(0.5)
  buttonText.x = 50
  buttonText.y = 25
  button.addChild(buttonText)

  button.eventMode = 'static'
  button.cursor = 'pointer'

  button.on('pointerdown', () => {
    if (!isSpinning) { // Prevent roll, if it is spinning
      isSpinning = true
      symbol.y = 50 // return to top
      startY = 50
      targetY = 150
      progress = 0 // Reset progress
      symbol.text = symbols[Math.floor(Math.random() * symbols.length)]
    }
  })

  // Animation: move symbol down with easing
  app.ticker.add(() => {
    if (isSpinning && progress < 1) {
      progress += 1 / animationDuration
      if (progress > 1) progress = 1
      
      // Apply easing function
      const easedProgress = easeInOut(progress)
      
      // Calculate position based on eased progress
      symbol.y = startY + (targetY - startY) * easedProgress
    } else if (isSpinning) {
      isSpinning = false
    }
  })

}