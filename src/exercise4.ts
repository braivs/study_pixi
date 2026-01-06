// Exercise 4: Simplified "slot" (one symbol)

import {Application, Graphics, Text} from "pixi.js";

export async function exercise4() {
  const app = new Application()

  await app.init({
    width: 400,
    height: 300,
    backgroundColor: 0x000000
  })

  document.body.appendChild(app.canvas)

  // Symbol for slot
  const symbols = ['🍒', '🍋', '🍊', '🔔', '⭐', '🍇', '🍉', '🍌']

  // Show one symbol
  const symbolText = new Text({
    text: symbols[0], style: {
      fontFamily: 'Arial',
      fontSize: 90,
      fill: '#FFFFFF',
    }
  })
  symbolText.anchor.set(0.5)
  symbolText.x = 200 // center of display
  symbolText.y = 150
  app.stage.addChild(symbolText)

  // Button
  const button = new Graphics()
  button.roundRect(0, 0, 100, 50, 10)
  button.fill(0x00FF00)
  button.x = 150
  button.y = 230

  const buttonText = new Text({
    text: 'Roll',
    style: {
      fontSize: 30,
      fill: '#FFFFFF',
    }
  })
  buttonText.anchor.set(0.5)
  buttonText.x = 50
  buttonText.y = 25
  button.addChild(buttonText)

  app.stage.addChild(button);

  button.eventMode = 'static'
  button.cursor = 'pointer'

  let gotSymbol = ''
  let rollsCount = 0
  const ROLLS_PREFIX = 'Rolls: '
  const YOU_GOT_PREFIX = 'You got: '
  const WINS_PREFIX = 'Wins: '
  let winsCount = 0

  const winCondition = () => gotSymbol === '⭐'

  // Change to random symbol onClick
  button.on('pointerdown', () => {
    gotSymbol = symbols[Math.floor(Math.random() * symbols.length)]
    symbolText.text = gotSymbol

    // Update visibility & text
    youGotText.text = `${YOU_GOT_PREFIX}${gotSymbol}`
    youGotText.visible = gotSymbol !== ''

    rollsCount++
    rollsText.text = `Rolls: ${rollsCount}`

    winText.visible = winCondition()

    if (winCondition()) {
      winsCount++
      winsText.text = `${WINS_PREFIX}${winsCount}`
    }
  })

  const youGotText = new Text({
    text: `${ROLLS_PREFIX}${gotSymbol}`,
    style: {
      fontSize: 15,
      fill: '#FFFFFF',
    }
  })

  youGotText.anchor.set(0.5, 1)
  youGotText.x = app.screen.width / 2
  youGotText.y = 220
  youGotText.visible = gotSymbol !== ''

  app.stage.addChild(youGotText)


  const rollsText = new Text({
    text: `${ROLLS_PREFIX}${rollsCount}`,
    style: {
      fontSize: 20,
      fill: '#FFFFFF',
    }
  })
  rollsText.anchor.set(1, 1)
  rollsText.x = app.screen.width - 10
  rollsText.y = app.screen.height - 10
  app.stage.addChild(rollsText)

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
    text: `${WINS_PREFIX}${winsCount}`,
    style: {
      fontSize: 20,
      fill: '#FFFFFF',
    }
  })
  winsText.anchor.set(1, 1)
  winsText.x = app.screen.width - 10
  winsText.y = app.screen.height - 50
  app.stage.addChild(winsText)

}