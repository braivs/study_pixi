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
  const SPIN_DELAY = 500

  const YOU_GOT_PREFIX = 'You got: '

  let balance = 1070
  const BALANCE_PREFIX = 'Balance: '

  const WIN_PAYOUT = 600
  const ROLL_PRICE = 50

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

  // Function to update button state based on balance and spinning status
  const updateButtonState = () => {
    const hasEnoughBalance = balance >= ROLL_PRICE
    const isEnabled = canSpin && hasEnoughBalance

    // Clear and redraw button with new color
    button.clear()
    button.roundRect(0, 0, 120, 50, 10)
    
    if (isEnabled) {
      button.fill(0x00FF00)  // Green when enabled
      button.cursor = 'pointer'
      button.eventMode = 'static'
    } else {
      button.fill(0x666666)  // Gray when disabled
      button.cursor = 'auto'
      button.eventMode = 'static'  // Still static to show cursor, but we check balance in handler
    }
  }

  let winningCombination: string[] | null = null

  // Create text display for winning combination
  const youGotText = new Text({
    text: `${YOU_GOT_PREFIX}`,
    style: {
      fontSize: 23,
      fill: '#FFFFFF',
    }
  })
  youGotText.anchor.set(0, 1)
  youGotText.x = 10
  youGotText.y = app.screen.height - 30
  youGotText.visible = false
  
  // Update text when winning combination changes
  const updateYouGotText = () => {
    if (winningCombination) {
      youGotText.text = `${YOU_GOT_PREFIX}${winningCombination.join(' ')}`
      youGotText.visible = true
    } else {
      youGotText.visible = false
    }
  }

  const updateBalanceDisplay = () => {
    balanceText.text = `${BALANCE_PREFIX}${balance}`
    updateButtonState()  // Update button state when balance changes
  }

  const winsText = new Text({
    text: `WIN!`,
    style: {
      fontSize: 50,
      fill: '#FFFFFF',
    }
  })
  winsText.anchor.set(1, 1)
  winsText.x = app.screen.width - 10
  winsText.y = app.screen.height - 30
  winsText.visible = false


  
  app.stage.addChild(youGotText, winsText)

  button.on('pointerdown', () => {
    if (!canSpin) return
    if (balance < ROLL_PRICE) return  // Not enough balance

    // Deduct roll price
    balance -= ROLL_PRICE
    updateBalanceDisplay()
 
    canSpin = false
    winningCombination = null  // Reset winning combination
    youGotText.visible = false
    winsText.visible = false

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
      }, index * SPIN_DELAY)
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

      // Save winning combination (symbols from all reels)
      winningCombination = [
        reels[0].symbol.text,
        reels[1].symbol.text,
        reels[2].symbol.text
      ]

      // Update display
      updateYouGotText()

      // check win
      if (reels[0].symbol.text === reels[1].symbol.text &&
        reels[1].symbol.text === reels[2].symbol.text) {
        balance += WIN_PAYOUT
        updateBalanceDisplay()  // This will also update button state
        winsText.visible = true
        console.log('WIN!', winningCombination)
      } else {
        winsText.visible = false
      }

      // Update button state after spin ends (check if we can spin again)
      updateButtonState()

    }
  })

  app.stage.addChild(button)

  // Game rules
  const rulesText = new Text({
    text: 'Rules: got 3 same symbol to win',
    style: {
      fill: '#FFFFFF',
      fontSize: 20,
    }
  })
  rulesText.x = 10
  rulesText.y = 20
  app.stage.addChild(rulesText)

  const balanceText = new Text({
    text: `${BALANCE_PREFIX}${balance}`,
    style: {
      fontSize: 40,
      fill: '#FFFFFF',
    }
  })
  balanceText.x = 10
  balanceText.y = app.screen.height - 110
  app.stage.addChild(balanceText)

  // Initialize button state
  updateButtonState()

}