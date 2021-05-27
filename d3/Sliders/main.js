var blob = document.getElementById('blob');
var colorSlider = document.getElementById('slider-color-picker');

var num2hex = rgb => {
  return rgb
    .map(color => {
      let str = color.toString(16);
      if (str.length === 1) {
        str = '0' + str;
      }
      return str;
    })
    .join('');
};

var rgb = [255, 0, 0];
var colors = ['red', 'green', 'blue'];

var gColorPicker = d3
  .select('div#slider-color-picker')
  .append('svg')
  .attr('width', 375)
  .attr('height', 200)
  .append('g')
  .attr('transform', 'translate(15,30)');

rgb.forEach((color, i) => {
  var slider = d3
    .sliderBottom()
    .min(0)
    .max(255)
    .step(1)
    .width(300)
    .ticks(0)
    .default(rgb[i])
    .displayValue(false)
    .fill(colors[i])
    .handle(
      d3
      .symbol()
      .type(d3.symbolCircle)
      .size(200)()
    )
    .on('onchange', num => {
      rgb[i] = num;
      blob.style.fill = `#${num2hex(rgb)}`;
    });
  gColorPicker
    .append('g')
    .attr('transform', `translate(30,${60 * i})`)
    .call(slider);
});