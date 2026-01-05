// Exercise 2: Text positioning

import {Application, Text} from "pixi.js";

export async function exercise2() {
  // 1. Create Pixi Application
  const app = new Application();

  await app.init({
    width: 600,
    height: 400,
    backgroundColor: 0x22222
  })

  // 2. Add canvas to page
  document.body.appendChild(app.canvas)

  const FONT_SIZE = 24;

  // Text 1: Left top corner
  const text1 = new Text({
    text: 'Left top',
    style: {
      fontSize: FONT_SIZE,
      fill: '#FFFFFF'
    }
  })

  text1.x = 10
  text1.y = 10

  // add text to stage
  app.stage.addChild(text1)

  // Text 2: Top right corner
  const text2 = new Text({
    text: 'Right top',
    style: {
      fontSize: FONT_SIZE,
      fill: 'orange'
    }
  })

  text2.y = 10
  text2.x = -10

  // calculate position manually
  text2.x = app.screen.width - text2.width - 10

  app.stage.addChild(text2)

  // Text 3: Top left corner
  const text3 = new Text({
    text: 'Right top',
    style: {
      fontSize: FONT_SIZE,
      fill: 'green'
    }
  })
  // set anchor to left bottom corner
  text3.anchor.set(0, 1)
  text3.x = 10
  text3.y = app.screen.height - 10;
  app.stage.addChild(text3)

  // Text 4: Right bottom corner
  const text4 = new Text({
    text: 'Right bottom',
    style: {
      fontSize: FONT_SIZE,
      fill: 'red'
    }
  })
  text4.anchor.set(1, 1)
  text4.x = app.screen.width - 10;
  text4.y = app.screen.height - 10;
  app.stage.addChild(text4)

}