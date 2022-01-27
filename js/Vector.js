export function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

// Add two vectors
Vector.prototype.add = function(vector){
  this.x += vector.x;
  this.y += vector.y;
}

// Get vector lenght
Vector.prototype.getMagnitude = function(){
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

//Get vector angle, considering qudrant
Vector.prototype.getAngle = function () {
  return Math.atan2(this.y, this.x);
} 

//Get new vector based on angle and size
Vector.formAngle = function (angle, magnitude) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
}