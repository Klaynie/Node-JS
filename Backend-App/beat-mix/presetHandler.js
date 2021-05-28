const presets = require('./presets');
const GET = 'GET';
const PUT = 'PUT';
const STATUS_200 = 200;
const STATUS_400 = 400;
const STATUS_404 = 404;

const presetHandler = (type, presetsIndex, newPresetArray) => {
  if (isValidType(type)) {
    if (isValidIndex(presetsIndex)) {
      switch (type) {
        case GET:
          return [STATUS_200, presets[presetsIndex]];
        case PUT:
          presets[presetsIndex] = newPresetArray;
          return [STATUS_200, newPresetArray];
      }
    } else {
      return [STATUS_404, 'Not Found'];
    }
  } else {
    return [STATUS_400, 'Bad Request'];
  }
};

const isValidType = (type) => {
  return type === GET || type === PUT;
}
const isValidIndex = (index) => {
  return index >= 0 && index < presets.length;
}

module.exports = presetHandler;