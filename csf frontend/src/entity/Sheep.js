export class Sheep {
  constructor({ name, age, breed, weightKg, gender, latitude, longitude }) {
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

  getSummary() {
    return `${this.name}, ${this.age} years old ${this.gender} ${this.breed}, ${this.weightKg} kg at ${this.getLocationString()}`;
  }
}
