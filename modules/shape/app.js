/* app.js */ 

const radius = 5;
const sideLength = 10;

// Option 1: import the entire shape-area.js module here.

// const areaFunctions = require('./shape-area.js');

// const areaOfCircle = areaFunctions.circleArea(radius);
// console.log(areaOfCircle);

// const areaOfSquare = areaFunctions.squareArea(sideLength);
// console.log(areaOfSquare);

// Option 2: import circleArea and squareArea with object destructuring

const { circleArea, squareArea } = require("./shape-area.js")

// use the imported .circleArea() and .squareArea() methods here

const areaOfCircle = circleArea(radius);
console.log(areaOfCircle);

const areaOfSquare = squareArea(sideLength);
console.log(areaOfSquare);