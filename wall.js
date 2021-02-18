//wall.js
//author: Matt Herrity
//Date: 2/17/21

class wall{
  #x1;
  #x2;
  #y1;
  #y2;

  constructor(h, w) {
    this.#x1 = Math.floor(Math.random()*w);
    this.#x2 = Math.floor(Math.random()*w);
    this.#y1 = Math.floor(Math.random()*h);
    this.#y2 = Math.floor(Math.random()*h);
  }

  get x1() {
    return this.#x1;
  }

  get y1() {
    return this.#y1;
  }

  get x2() {
    return this.#x2;
  }

  get y2() {
    return this.#y2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.#x1, this.#y1);
    ctx.lineTo(this.#x2, this.#y2);
    ctx.stroke();
  }

}


console.log("Wall Module Loaded");
