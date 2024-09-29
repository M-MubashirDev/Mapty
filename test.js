"use strict";
// // Create an object calculator with a method sum that adds two numbers. Use bind to create a new function
// // that always adds 5 to any number passed to it, and call to immediately add 10 to 15 using the same sum method.
// const calculature = {
//   x: 10,
//   y: 10,
//   sum() {
//     console.log(this.x + this.y);
//   },
// };
// const sumOut = function () {
//   console.log(x + y);
// };
// const bind = sumOut.bind(calculature.sum);
// console.log(bind(10,12));
// const calculator = {
//   sum: function (a, b) {
//     return a + b;
//   },
// };

// // Using bind to create a new function that adds 5
// const addFive = calculator.sum.bind(calculator, 5, 10);
// console.log(addFive()); // 15

// // Using call to add 10 to 15
// console.log(calculator.sum.call(calculator, 10, 15)); // 25
//.................................................................................................................................
// Create a class Car with properties make, model, and year and a method describe.
// Create another class AnotherCar with properties make, model, and year.
// Create instances of both classes.
// Use bind to create a new function where this is bound to the instance of AnotherCar and call the
//  describe method through this new function.
// class Car {
//   constructor(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//   }
//   _describe() {
//     console.log(`${this.model} is made by ${this.make} in year ${this.year} `);
//   }
// }
// const carA = new Car("bugati", "pakistan", "2020");
// console.log(carA._describe());
// class AnotherCar {
//   constructor(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//   }
// }
// const carAnother = new AnotherCar("look", "like", "lance");
// const use = carA._describe.bind(carAnother);
// console.log(use());
//...................................................................................
// Create a closet function that returns an object representing a closet. This closet object should have methods to add, remove
// , and list items.

// Instructions:
// Implement a closet function that returns an object.
// The returned object should have the following methods:
// addItem: Add an item to the closet.
// removeItem: Remove an item from the closet.
// listItems: List all items in the closet.
// Ensure that the addItem and removeItem methods modify the closet's state accordingly.
// Test your implementation by adding, removing, and listing items from the closet.
//.................................................................................................
// Implement a closest function that takes two parameters: element and selector.
// The function should search for the closest ancestor element of the element that matches the selector.
// If no ancestor matches the selector, the function should return null.
// Test your implementation by using it to find the closest ancestor element that matches a given selector.
// const twoClosest = closest("element");
// const getone = greatGrandSon.closest("#daughter");
// console.log(getone);
//.................................................................
// Create a custom function that handles click events on specified elements.

// Instructions:
// Implement a function named handleClick that takes two parameters: selector and callback.
// The function should select all elements that match the selector and attach a click event listener to each of them.
// When any of these elements are clicked, the callback function should be executed with the event object as its argument.
// Test your implementation by using it to handle click events on specified elements.
// const greatGrandSon = document.querySelector(".greatGrandSon");
// const parent = document.querySelector(".parent");
// const take = function (selector, callback) {
//   parent.addEventListener("click", function () {
//     const m = selector.closest("div");
//     console.log(m);
//   });
// };
// take(greatGrandSon);
console.log(Date.now());
console.log(new Date());
