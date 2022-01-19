let maxParticle = 4000;
let emissionRate = 6;
let particleSize = 1;
let  objectSize = 3;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function loop(){
  clear();
  update();
  draw();
  queue();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update(){
  addNewParticles();
  plotParticles(canvas.width, canvas.height);
}

function queue() {
  window.requestAnimationFrame(loop);
}
// место под draw & update

function draw(){
  drawParticles();
  fields.forEach(drawCircle);
  emitters.forEach(drawCircle)
}

function Field(point, mass) {
  this.position = point;
  this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
  this.mass = mass || 100;
  this.drawColor = mass < 0 ? '#f00' : '#0f0';
}


function Vector(x, y) {
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

function Particle(point, velocity, acceleration) {
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
}

Particle.prototype.move = function(){
  //Add acceleration to velocity
  this.velocity.add(this.acceleration)

  //Add velocity to coordinates
  this.position.add(this.velocity);
}

Particle.prototype.sumbitToFields = function(fields) {
  let totalAcceletationX = 0;
  let totalAcceletationY = 0;

  for(let i = 0; i < fields.length; i++){
    let field = fields[i];

    let vectorX = field.position.x - this.position.x;
    let vectorY = field.position.y - this.position.y;

    let force = field.mass / Math.pow(vectorX*vectorX+vectorY*vectorY, 1.5);

    totalAcceletationX += vectorX * force;
    totalAcceletationY += vectorY * force
  }
  this.acceleration = new Vector(totalAcceletationX, totalAcceletationY);
}

function Emitter(point, velocity, spread){
  this.position = point; //Vector
  this.velocity = velocity; //Vector
  this.spread = spread || Math.PI / 32; //Random angle = velocity +/- spread
  this.drawColor = '#999';
}

Emitter.prototype.emitParticle = function(){
  let angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
  let magnitude = this.velocity.getMagnitude();
  let position = new Vector(this.position.x, this.position.y);
  let velocity = Vector.formAngle(angle, magnitude);
  return new Particle(position, velocity)
}


let particles = [];

let emitters = [new Emitter(new Vector(100, 230), Vector.formAngle(0, 2)), new Emitter(new Vector(500, 230), Vector.formAngle(16, 2))];
let fields = [new Field(new Vector(400, 230), -110), new Field(new Vector(340, 170), 180), new Field(new Vector(400, 100), -40)];

function addNewParticles() {
  if(particles.length > maxParticle) return;

  for(let i = 0; i < emitters.length; i++){
    for(let j = 0; j < emissionRate; j++){
      particles.push(emitters[i].emitParticle());
    }
  }
}

function plotParticles(boundsX, boundsY){
  let currentParticles = [];

  for(let i = 0; i < particles.length; i++){
    let particle = particles[i];
    let pos = particle.position;

    if(pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;

    particle.sumbitToFields(fields)

    particle.move();

    //Overwriting particles
    currentParticles.push(particle);
  }
  particles = currentParticles;
}

function drawParticles(){
  ctx.fillStyle = `rgb(0,0,255)`;
  
  //Draw particles
  for(let i = 0; i < particles.length; i++){
    let position = particles[i].position;
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
  }
}

function drawCircle(container) {
  ctx.fillStyle = container.drawColor;
  ctx.beginPath();
  ctx.arc(container.position.x, container.position.y, objectSize, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// function Field(point, mass) {
//   this.position = point;
//   this.setMass(mass);
// }

// Field.prototype.setMass = function(mass) {
//   this.mass = mass || 100;
//   this.drawColor = mass < 0 ? '#f00' : '#0f0';
// }


loop();


