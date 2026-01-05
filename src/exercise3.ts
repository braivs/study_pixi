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



}