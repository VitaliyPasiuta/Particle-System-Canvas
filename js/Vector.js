export class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  // Add two vectors
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  // Get vector lenght
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  //Get vector angle, considering qudrant
  getAngle() {
    return Math.atan2(this.y, this.x);
  }
  //Get new vector based on angle and size
  static formAngle(angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }
}




