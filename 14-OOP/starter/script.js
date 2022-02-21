'use strict';

const Person = function (firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}

const matin = new Person('matin', 1999);
console.log(matin instanceof Person)

Person.prototype.calcAge = function () {
    console.log(2020 - this.birthYear)
}

matin.calcAge()
console.log(matin.__proto__ === Person.prototype)
console.log(Person.prototype.isPrototypeOf(matin))

Person.prototype.species = "homo"
console.log(matin.hasOwnProperty('species'))

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

class Car {
    constructor(make, speed) {
        this.make = make
        this.speed = speed
    }
    accelerate () {
        this.speed += 10
        console.log(this.speed)
    }

    get speedUS () {
        return this.speed / 1.6
    }

    set speedUS(speed) {
        this.speed = speed * 1.6
    }

    static hey () {
        console.log('Hey')
    }
}
Car.hey = function () {
    console.log('HEy');
}
Car.prototype.brake = function () {
    this.speed -= 5
    console.log(this.speed)
}

const bmw = new Car("BMW", 120)


// gatters and setters in object
const account = {
    owner: "matin",
    movements: [100,50,-65,-650,540],

    get latest() {
        return this.movements.slice(-1).pop()
    },
    set latest(mov) {
        this.movements.push(mov)
    }
}

console.log(account.latest)
account.latest = 50

// Create
const PersonProto = {
    calcAge () {
        console.log(2022 - this.birthYear)
    }
}

const sin = Object.create(PersonProto)

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course
}

Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName}`)
}
 