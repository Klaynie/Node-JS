const gridLength = 16;
const KICKS = 'kicks';
const SNARES = 'snares';
const HI_HATS = 'hiHats';
const RIDE_CYMBALS = 'rideCymbals';

const validArrays = [
  KICKS,
  SNARES,
  HI_HATS,
  RIDE_CYMBALS
]

// Drum Arrays
let kicks = new Array(gridLength).fill(false);
let snares = new Array(gridLength).fill(false);
let hiHats = new Array(gridLength).fill(false);
let rideCymbals = new Array(gridLength).fill(false);

const toggleDrum = (arrayName, index) => {
  if (isValueInArray(validArrays, arrayName) && isValidIndex(index)) {
    const array = selectArray(arrayName);
    array[index] = !array[index];
  }
}

const clear = (arrayName) => {
  if (isValueInArray(validArrays, arrayName)) {
    const array = selectArray(arrayName);
    array.fill(false)
  }
}

const invert = (arrayName) => {
  if (isValueInArray(validArrays, arrayName)) {
    const array = selectArray(arrayName);
    for (let i = 0; i < array.length; i++) {
      array[i] = !array[i];
    }
  }
}

// Synth functions
const getNeighborPads = (xValue, yValue, size) => {
  const maxValue = size - 1;

  if (isValidInput(xValue, yValue, size)) {

    if (isCorner(xValue, yValue, size)) {

      if (isBottomLeft(xValue, yValue, size)) {
        return [
          [0, 1],
          [1, 0]
        ];
      } else if (isBottomRight(xValue, yValue, size)) {
        return [
          [maxValue, 1],
          [maxValue - 1, 0]
        ];
      } else if (isTopLeft(xValue, yValue, size)) {
        return [
          [0, maxValue - 1],
          [1, maxValue]
        ];
      } else if (isTopRight(xValue, yValue, size)) {
        return [
          [maxValue, maxValue - 1],
          [maxValue - 1, maxValue]
        ];
      }

    } else if (isEdge(xValue, yValue, size)) {

      if (isLeftEdge(xValue, yValue, size)) {
        return [
          [0, yValue + 1],
          [1, yValue],
          [0, yValue - 1]
        ];
      } else if (isRightEdge(xValue, yValue, size)) {
        return [
          [maxValue, yValue + 1],
          [maxValue - 1, yValue],
          [maxValue, yValue - 1]
        ];
      } else if (isBottomEdge(xValue, yValue, size)) {
        return [
          [xValue - 1, 0],
          [xValue, 1],
          [xValue + 1, 0]
        ];
      } else if (isTopEdge(xValue, yValue, size)) {
        return [
          [xValue - 1, maxValue],
          [xValue, maxValue - 1],
          [xValue + 1, maxValue]
        ];
      }
    } else {
      return [
        [xValue - 1, yValue],
        [xValue, yValue + 1],
        [xValue + 1, yValue],
        [xValue, yValue - 1]
      ]
    }
  } else {
    return [];
  }
}

// Helper functions
const isCorner = (xValue, yValue, size) => {
  if (
    (isBottomLeft(xValue, yValue, size)) ||
    (isBottomRight(xValue, yValue, size)) ||
    (isTopLeft(xValue, yValue, size)) ||
    (isTopRight(xValue, yValue, size))
  ) {
    return true;
  } else {
    return false;
  }
}

const isBottomRight = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return (xValue === maxValue && yValue === 0);
}

const isBottomLeft = (xValue, yValue, size) => {
  return (xValue === 0 && yValue === 0);
}

const isTopLeft = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return (xValue === 0 && yValue === maxValue);
}

const isTopRight = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return (xValue === maxValue && yValue === maxValue);
}

const isEdge = (xValue, yValue, size) => {
  if (
    (isLeftEdge(xValue, yValue, size)) ||
    (isRightEdge(xValue, yValue, size)) ||
    (isBottomEdge(xValue, yValue, size)) ||
    (isTopEdge(xValue, yValue, size))
  ) {
    return true;
  } else {
    return false;
  }
}

const isLeftEdge = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return (xValue === 0 && (yValue > 0 || y < maxValue));
}

const isRightEdge = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return (xValue === maxValue && (yValue > 0 || y < maxValue));
}

const isBottomEdge = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return ((xValue > 0 || x < maxValue) && yValue === 0);
}

const isTopEdge = (xValue, yValue, size) => {
  const maxValue = size - 1;
  return ((xValue > 0 || x < maxValue) && yValue === maxValue);
}

const selectArray = (arrayName) => {
  switch (arrayName) {
    case KICKS:
      return kicks;
    case SNARES:
      return snares;
    case HI_HATS:
      return hiHats;
    case RIDE_CYMBALS:
      return rideCymbals;
  }
}

const isValueInArray = (array, value) => {
  return array.indexOf(value) > -1;
}

const isValidIndex = (number) => {
  return number >= 0 && number < gridLength;
}

const isValidInput = (xValue, yValue, size) => {
  if (
    (xValue >= 0 && xValue < size) &&
    (yValue >= 0 && yValue < size) &&
    size === 5
  ) {
    return true;
  } else {
    return false;
  }
}