export class Sheep {
  constructor({ id, name, age, breed, weightKg, gender, latitude, longitude }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.weightKg = weightKg;
    this.gender = gender;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLocationString() {
    return `(${this.latitude}, ${this.longitude})`;
  }
}
