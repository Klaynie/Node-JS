let poemVerses = [
  "Always",
  "in the middle",
  "of our bloodiest battles",
  "you lay down your arms",
  "like flowering mines",
  "to conquer me home."
];

d3.select("#viz")
  .selectAll("p")
  .data(poemVerses)
  .enter()
  .append("p")
  .text("Click Me!")
  .on("click", function(d) {
    d3.select(this).text(d);
  });