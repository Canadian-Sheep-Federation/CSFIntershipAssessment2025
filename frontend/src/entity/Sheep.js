// This file defines the Sheep class, which represents a sheep entity with various properties and methods.
export class Sheep {
  constructor({ id, name, age, breed, weightKg, gender, location, latitude, longitude }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.weightKg = weightKg;
    this.gender = gender;
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLocationString() {
    return `(${this.location})`;
  }

  getSummary() {
    return `${this.name}, ${this.age} years old ${this.gender} ${this.breed}, ${this.weightKg} kg at ${this.getLocationString()}`;
  }
}
