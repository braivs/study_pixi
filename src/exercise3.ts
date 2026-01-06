// Exercise 3: Text centering

import {Application, Text} from "pixi.js";

export async function exercise3() {
  const app = new Application()

  await app.init({
    width: 600,
    height: 400,
    backgroundColor: 0x22222
  })

  document.body.appendChild(app.canvas)

  const textStyle = {
    fontSize: 36,
    fill: '#ffffff'
  }

  const text = new Text( {
    text: 'CENTER',
    style: textStyle
  })

  text.anchor.set(0.5) // center anchor
  text.x = app.screen.width / 2 // half of the width
  text.y = app.screen.height / 2 // half of the height

  app.stage.addChild(text)

  const textBottom = new Text({
    text: 'BOTTOM CENTER',
    style: textStyle
  })

  textBottom.anchor.set(0.5, 1)
  textBottom.x = app.screen.width / 2
  textBottom.y = app.screen.height
  app.stage.addChild(textBottom)
}