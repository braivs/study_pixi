// Exercise 5: 3 symbols (simple slot)

import {Application, Graphics, Text} from "pixi.js";

export async function exercise5() {
  const app = new Application()

  await app.init({
    width: 400,
    height: 300,
    backgroundColor: 0x000000
  })

  document.body.appendChild(app.canvas)

  const symbols = ['🍒', '🍋', '🍊', '🔔', '⭐', '🍇']

  // Create 3 symbol text objects
  const symbol1 = new Text({
    text: symbols[0],
    style: {
      fontSize: 60,
      fill: '#FFFFFF'
    }
  })
  const symbol2 = new Text({
    text: symbols[0],
    style: {
      fontSize: 60,
      fill: '#FFFFFF'
    }
  })
  const symbol3 = new Text({
    text: symbols[0],
    style: {
      fontSize: 60,
      fill: '#FFFFFF'
    }
  })

  // Center symbols (set anchor to center)
  symbol1.anchor.set(0.5)
  symbol2.anchor.set(0.5)
  symbol3.anchor.set(0.5)

  // Position symbols relative to center
  const spacing = 120
  const centerX = app.screen.width / 2

  symbol1.x = centerX - spacing // Left of center
  symbol2.x = centerX // Center
  symbol3.x = centerX + spacing // Right of center
  symbol1.y = 150
  symbol2.y = 150
  symbol3.y = 150

  app.stage.addChild(symbol1, symbol2, symbol3)

  // Create button
  const button = new Graphics();
  button.roundRect(0, 0, 100, 50, 10)
  button.fill(0x00FF00)
  button.x = 150
  button.y = 220

  app.stage.addChild(button)

  const buttonText = new Text({
    text: 'Roll',
    style: {
      fontSize: 20,
      fill: 'black'
    }
  })
  buttonText.anchor.set(0.5)
  buttonText.x = 50
  buttonText.y = 25
  button.addChild(buttonText)

  button.eventMode = 'static'
  button.cursor = 'pointer'

  const PARTIAL_PAYOUT = 75
  const WIN_PAYOUT = 400
  const ROLL_PRICE = 50
  let balance = 1000
  const BALANCE_PREFIX = 'Balance: '

  // Change all symbols on button click
  button.on('pointerdown', () => {
    // Check if player has enough balance
    if (balance < ROLL_PRICE) {
      console.log('Not enough balance!')
      return
    }

    // Ensure balance doesn't go negative
    if (balance < 0) {
      balance = 0
    }

    // Deduct roll price
    balance -= ROLL_PRICE

    // Spin: generate random symbols
    symbol1.text = symbols[Math.floor(Math.random() * symbols.length)]
    symbol2.text = symbols[Math.floor(Math.random() * symbols.length)]
    symbol3.text = symbols[Math.floor(Math.random() * symbols.length)]

    // Check for win condition
    if (symbol1.text === symbol2.text && symbol2.text === symbol3.text) {
      // Full win: all three symbols match
      console.log('WIN')
      winText.visible = true
      partialWinText.visible = false
      balance += WIN_PAYOUT
    }
    else if (symbol1.text === symbol2.text || symbol2.text === symbol3.text || symbol1.text === symbol3.text) {
      // Partial win: two symbols match
      winText.visible = false
      partialWinText.visible = true
      balance += PARTIAL_PAYOUT
    } else {
      // No win
      winText.visible = false
      partialWinText.visible = false
    }

    // Update balance display
    balanceText.text = `${BALANCE_PREFIX}${balance}`
  })

  const winText = new Text({
    text: 'WIN!',
    style: {
      fontSize: 50,
      fill: '#FFFFFF',
    }
  })
  winText.anchor.set(0.5)
  winText.x = app.screen.width / 2
  winText.y = 75
  winText.visible = false

  app.stage.addChild(winText)

  const partialWinText = new Text({
    text: 'PARTIAL WIN!',
    style: {
      fontSize: 50,
      fill: '#FFFFFF',
    }
  })
  partialWinText.anchor.set(0.5)
  partialWinText.x = app.screen.width / 2
  partialWinText.y = 75
  partialWinText.visible = false

  app.stage.addChild(partialWinText)

  const balanceText = new Text({
    text: `${BALANCE_PREFIX}${balance}`,
    style: {
      fontSize: 25,
      fill: '#FFFFFF',
    }
  })
  balanceText.x = 20
  balanceText.y = 20
  app.stage.addChild(balanceText)

}