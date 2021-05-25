class Car {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }
}

class CarFactory {
  createCar(type) {
    switch (type) {
      case 'civic':
        return new Car(4, 'V6', 'grey');
      case 'honda':
        return new Car(4, 'V8', 'red');
    }
  }
}

class Suv {
  constructor(doors, engine, color) {
    this.doors = doors;
    this.engine = engine;
    this.color = color;
  }
}

class SuvFactory {
  createCar(type) {
    switch (type) {
      case 'cx4':
        return new Car(4, 'V6', 'grey');
      case 'cx5':
        return new Car(4, 'V8', 'red');
    }
  }
}

const carfactory = new CarFactory();
const suvFacotry = new SuvFactory();

const autoManufacturer = (type, model) => {
  switch (type) {
    case 'car':
      return carFactory.createCar(model);
    case 'suv':
      return suvFacotry.createCar(model);
  }
}

const cx5 = autoManufacturer('suv', 'cx5');

console.log(cx5);