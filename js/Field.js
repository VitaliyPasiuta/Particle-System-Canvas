export class Field {
  constructor(point, mass) {
    this.position = point;
    this.setMass(mass);
  }
  setMass(mass) {
    this.mass = mass || 100;
    this.drawColor = mass < 0 ? '#f00' : '#0f0';
  }
}

