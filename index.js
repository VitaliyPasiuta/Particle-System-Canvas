import {Vector} from './js/Vector.js';
import {Emitter} from './js/Emitter.js';
import {Field} from './js/Field.js';

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

function draw(){
  drawParticles();
  fields.forEach(drawCircle);
  emitters.forEach(drawCircle)
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

loop();


