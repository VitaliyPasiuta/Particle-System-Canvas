import { Vector } from "./Vector.js";
import { Particle } from "./Particle.js";

export class Emitter {
  constructor(point, velocity, spread) {
    this.position = point; //Vector
    this.velocity = velocity; //Vector
    this.spread = spread || Math.PI / 32; //Random angle = velocity +/- spread
    this.drawColor = '#999';
  }
  emitParticle() {
    let angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
    let magnitude = this.velocity.getMagnitude();
    let position = new Vector(this.position.x, this.position.y);
    let velocity = Vector.formAngle(angle, magnitude);
    return new Particle(position, velocity);
  }
}

