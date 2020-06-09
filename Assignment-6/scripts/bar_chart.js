function BarChart(){
  var BarChart_margin = {
    top: 0,
    right: 20,
    bottom: 10,
    left: 40
  },
  BarChart_width = 600 - BarChart_margin.left - BarChart_margin.right,
  BarChart_height = 580 - BarChart_margin.top - BarChart_margin.bottom;
    d3.csv("./data/XYZ.csv", function(error, data) {
        if (error) {
            throw error;
        }
  var x = d3.scaleBand().range([0, BarChart_width])
  var y = d3.scaleLinear().range([BarChart_height, 0]);
  x.domain(data.map(function(d) {   console.log(d.year);
    return d.year; }));
  y.domain([0, 100]);

  var svg = d3.select("#bar")
            .attr("width", BarChart_width + BarChart_margin.left + BarChart_margin.right)
            .attr("height", BarChart_height + BarChart_margin.top + BarChart_margin.bottom);

   svg.append("g")
    .attr('class', 'x axis')
    .attr("transform", "translate(40, 640)")
    .call(d3.axisBottom(x));  
  
    svg.append("g")
    .attr('class', 'y axis')
    .attr("transform", "translate(40" + ", 70" + ")")
    .call(d3.axisLeft(y)
    .ticks(10));

  svg.append("text")
    .attr("transform", "translate(" + (BarChart_width / 1.5) + " ," + 50 + ")")
      .style("font-size","15px")
      .text("Death Rate Bar Chart");

      svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return 75 + x(d.year); })
      .attr("y", function(d) { return 70 + y(d.value); })
      .attr("width", 20)
      .attr("height", function(d) { return BarChart_height - y(d.value); });
});
}
