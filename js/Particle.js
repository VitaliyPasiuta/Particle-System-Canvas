import { Vector } from "./Vector.js";

export class Particle {
  constructor(point, velocity, acceleration) {
    this.position = point || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.acceleration = acceleration || new Vector(0, 0);
  }
  move() {
    //Add acceleration to velocity
    this.velocity.add(this.acceleration);

    //Add velocity to coordinates
    this.position.add(this.velocity);
  }
  sumbitToFields(fields) {
    let totalAcceletationX = 0;
    let totalAcceletationY = 0;

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];

      let vectorX = field.position.x - this.position.x;
      let vectorY = field.position.y - this.position.y;

      let force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5);

      totalAcceletationX += vectorX * force;
      totalAcceletationY += vectorY * force;
    }
    this.acceleration = new Vector(totalAcceletationX, totalAcceletationY);
  }
}


