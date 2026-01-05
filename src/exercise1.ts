// Exercise 1: First text on the screen

import {Application, Text} from "pixi.js";

export async function exercise1() {
  // 1. Создаем Pixi Application
  const app = new Application();

  await app.init({
    width: 800,
    height: 700,
    backgroundColor: '0x222222',
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  });

  // 2. Добавляем на страницу
  document.body.appendChild(app.canvas);

  // 3. Создаем текст
  const text = new Text({
    text: 'Привет!',
    style: {
      fontSize: 68,
      fill: '#0000FF'
    }
  });

  // text.anchor.set(0.5);
  // text.x = 50;  // Отступ слева
  // text.y = 50;  // Отступ сверху

  // 4. Добавляем текст на сцену
  app.stage.addChild(text);
}