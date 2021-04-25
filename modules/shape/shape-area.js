/* shape-area.js */
const PI = Math.PI;

module.exports.circleArea = function (radiusLength) {
    return PI * radiusLength ** 2;
}

module.exports.squareArea = function (sideLength) {
    return sideLength ** 2;
}