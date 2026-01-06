// Exercise 3 v2: Button, that doing something

import {Application, Graphics, Text} from "pixi.js";

export async function exercise3_v2() {
  const app = new Application()

  await app.init({
    width: 400,
    height: 300,
    backgroundColor: 0x000000
  })

  document.body.appendChild(app.canvas)

  // Draw button
  const buttonWidth = 150
  const buttonHeight = 70
  const button = new Graphics()

  const drawButton = (button: Graphics, color: number, style: {width: number, height: number}) => {
    button.clear()
    button.roundRect(0, 0, style.width, style.height, 15)
    button.fill(color)
  }

  drawButton(button, 0xFF0000, {width: buttonWidth, height: buttonHeight})

  const centerButtonX = (width: number)=>  app.screen.width / 2 - width / 2

  // button.x = 150
  button.x = centerButtonX(buttonWidth)
  // button.y = 115
  button.y = app.screen.height / 2 - buttonHeight / 2

  // Add text to button
  const addCenterButtonText = (button: Graphics, buttonText: Text, style: {buttonWidth: number, buttonHeight: number}) => {
    buttonText.anchor.set(0.5)
    buttonText.x = style.buttonWidth / 2
    buttonText.y = style.buttonHeight / 2
    button.addChild(buttonText)
  }


  const buttonText = new Text({
    text: 'Bet 3BB',
    style: {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#000000'
    }
  })
  addCenterButtonText(button, buttonText, {buttonWidth, buttonHeight})
  button.addChild(buttonText)

  const buttonStaticPointer = (button: Graphics) => {
    button.eventMode = 'static' // Enable event handling
    button.cursor = 'pointer'
  }

  buttonStaticPointer(button)
  button.on('pointerdown', () => {
    console.log('Button clicked!')
    buttonText.text = 'Raised!'

    // clear and redraw with new color
    drawButton(button, 0x00ff00, {width: buttonWidth, height: buttonHeight})
  })

  // hover effect
  button.on('pointerenter', () => {
    drawButton(button, 0x00ff00, {width: buttonWidth, height: buttonHeight})
  })
  button.on('pointerleave', () => {
    drawButton(button, 0xFF0000, {width: buttonWidth, height: buttonHeight})
  })

  app.stage.addChild(button)

  //Second button
  const button2 = new Graphics()
  const button2Width = 100
  const button2Height = 50
  drawButton(button2, 0xFFFF00, {width: button2Width, height: button2Height})
  button2.x = centerButtonX(button2Width)
  button2.y = app.screen.height - button2Height - 50
  app.stage.addChild(button2)

  const buttonText2 = new Text({
    text: 'Call 0.04$',
    style: {
      fontFamily: 'Arial',
      fontSize: 16,
      fill: '#000000'
    }
  })
  addCenterButtonText(button2, buttonText2, {buttonWidth: button2Width, buttonHeight: button2Height})
  buttonStaticPointer(button2)

  // call text
  const textBottom = new Text({
    text: 'Called 0.04$',
    style: {
      fontSize: 18,
      fill: '#ffffff'}
  })
  textBottom.anchor.set(0.5, 1)
  textBottom.x = app.screen.width / 2
  textBottom.y = app.screen.height - 10
  textBottom.visible = false
  app.stage.addChild(textBottom)

  button2.on('pointerdown', () => {
    textBottom.visible = true
  })

}