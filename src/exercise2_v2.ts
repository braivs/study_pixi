// Exercise 2 v2: Moving square

import {Application, Graphics} from "pixi.js";

export async function exercise2_v2() {
  // Create Pixi Application
  const app = new Application();

  await app.init({
    width: 400,
    height: 300,
    backgroundColor: 0x000000
  })

  // Add canvas to page
  document.body.appendChild(app.canvas)

  // Draw square
  const square = new Graphics()

  square.rect(0, 0, 30, 30) // x, y, width, height
  square.fill(0xFFFF00)

  const squareStartPositionX = 50 // start position for left to right. + for top to bottom & diagonal move
  // const squareStartPositionX = app.screen.width - square.width - 50 // start position for right to left
  const squareStartPositionY = 50

  square.x = squareStartPositionX // start positon from right to left
  square.y = squareStartPositionY

  app.stage.addChild(square)

  app.ticker.add(() => {
    // if square go above right edge, come back it to begin (for left to right)
    if (square.x >= app.screen.width) {
      square.x = squareStartPositionX
    }
    /*if (square.x <= 0) { // same for right to left
      square.x = squareStartPositionX
    }*/
    /* if (square.y >= app.screen.height) { // same for top to bottom
       square.y = squareStartPositionY
     }*/
    // same for diagonal move
    if (square.y >= app.screen.height) { // same for top to bottom
      square.x = squareStartPositionX
      square.y = squareStartPositionY
    }

    // square.y += 1 // move right
    // square.x += 0.7 // less speed
    // square.x -= 0.9 // move left
    // diagonal move
    square.x += 1
    square.y += 1

  })
}