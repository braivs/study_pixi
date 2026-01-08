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
  const columnsSymbols: Text[] = []
  const symbolsInColumn = 5 // More symbols for infinite loop
  const visibleAreaTop = 50 // Top of visible area
  const visibleAreaBottom = 185 // Bottom of visible area (above button)
  const symbolsHeight =  70 // - exactly 3 symbols fit

  // Create symbols in column
  for (let i = 0; i < symbolsInColumn; i++) {
    const symbol = new Text({
      text: symbols[0],
      style: {
        fontSize: 60,
        fill: '#FFFFFF'
      }
    })

    symbol.anchor.set(0.5)
    symbol.x = 200
    symbol.y = visibleAreaTop + i * symbolsHeight // begin at top

    app.stage.addChild(symbol)
    columnsSymbols.push(symbol)
  }

  let isSpinning = false // Flag: is slot is spinning
  let columnSpeed = 0 // Speed of column scrolling

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
    winsText.visible = false
    youGotText.visible = false

    if (!isSpinning) { // Prevent roll, if it is spinning
      isSpinning = true
      columnSpeed = 15 // Fast initial speed
      
      // Update all symbols to random
      for (let i = 0; i < symbolsInColumn; i++) {
        columnsSymbols[i].text = symbols[Math.floor(Math.random() * symbols.length)]
      }
    }
  })

  let winningSymbol: Text | null = null

  // Animation: move all symbols down with easing (fast start, slow end)
  app.ticker.add(() => {
    if (isSpinning) {
      // Move all symbols down
      for (let i = 0; i < symbolsInColumn; i++) {
        columnsSymbols[i].y += columnSpeed
        
        // If symbol went below button area, return it to top (infinite loop)
        if (columnsSymbols[i].y > visibleAreaBottom) {
          columnsSymbols[i].y = columnsSymbols[i].y - symbolsInColumn * symbolsHeight
          columnsSymbols[i].text = symbols[Math.floor(Math.random() * symbols.length)]
        }
      }
      
      // Easing: slow down gradually (fast start, slow end)
      columnSpeed *= 0.98
      
      // Stop when speed is very low
      if (columnSpeed < 0.1) {
        columnSpeed = 0
        isSpinning = false

        // finding last visible symbol (most low before button)

        let maxY = visibleAreaTop

        // Go via all symbols & find most low visible
        for (let i = 0; i < symbolsInColumn; i++) {
          const symbolY = columnsSymbols[i].y
          // symbol is visible, if center of it in the area of visible view
          if (symbolY >= visibleAreaTop && symbolY <= visibleAreaBottom) {
            if (symbolY > maxY) {
              maxY = symbolY
              winningSymbol = columnsSymbols[i]
            }
          }
        }

        // WIN CONDITION
        winsText.visible = !!(winningSymbol && winningSymbol.text === '⭐');

        // show got symbol
        if (winningSymbol) {
          youGotText.text = `${YOU_GOT_PREFIX}${winningSymbol.text}`
          youGotText.visible = true
        } else {
          console.warn('Something went wrong')
          youGotText.visible = false
        }
      }
    }
  })

  // Game rules
  const rulesText = new Text({
    text: 'Got ⭐ to win',
    style: {
      fill: '#FFFFFF',
      fontSize: 20,
    }
  })
  rulesText.x = 10
  rulesText.y = 20
  app.stage.addChild(rulesText)

  const winsText = new Text({
    text: `WIN!`,
    style: {
      fontSize: 50,
      fill: '#FFFFFF',
    }
  })
  winsText.anchor.set(1, 1)
  winsText.x = app.screen.width - 10
  winsText.y = app.screen.height - 40
  winsText.visible = false
  app.stage.addChild(winsText)

  const YOU_GOT_PREFIX = 'You got: '

  const youGotText = new Text({
    text: `${YOU_GOT_PREFIX}${winningSymbol}`,
    style: {
      fontSize: 23,
      fill: '#FFFFFF',
    }
  })

  youGotText.anchor.set(0, 1)
  youGotText.x = 10
  youGotText.y = app.screen.height - 30
  youGotText.visible = winningSymbol !== null

  app.stage.addChild(youGotText)


}