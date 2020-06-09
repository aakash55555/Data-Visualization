var url1 = "./data/countries.geojson";
var q = d3_queue.queue(1)
  .defer(d3.json, url1)
  .awaitAll(draw);

function draw(error, data) {
  "use strict";

  if (error) throw error;

  var margin = 50,
    width = 450 - margin,
    height = 450 - margin;

 var color = d3.scaleThreshold()
.domain([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55])
.range(["gold", "blue", "green", "yellow", "olive", "pink", "brown", "slateblue", "grey", "red","Lime"]);

//create the projection
  var projection = d3.geoMercator()
  .center(d3.geoCentroid(data[0]))
  .scale(150)
  .translate([width, height * 0.9]);

  var path = d3.geoPath()
    .projection(projection);

  //get the data from csv file
  d3.csv("./data/countries_processed.csv", function(data) {

    //load the geojson file
    d3.json("./data/countries.geojson", function(json) {
    
    //get the data from the csv file
    for (var i = 0; i < data.length; i++) {
    
    // Get Country Name
    var dataState = data[i].Country;
    
    // Get birth rate 
    var dataValue = data[i].Birthrate;
    
    // Find the corresponding state inside the GeoJSON
    for (var j = 0; j < json.features.length; j++)  {
      var jsonState = json.features[j].properties.ADMIN;
    
      if (dataState == jsonState) {
    
      // Copy the data value into the JSON
      json.features[j].properties.birth = dataValue; 
    
      // Stop looking through the JSON
      break;
      }
    }
  }
  var map = d3.select("#map")
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1")
    .style("fill", function(d) {

  var value = +d.properties.birth;
      
	if (value) {
    return color(value);
    } else {
    return "#ffa500";
    }
 })
    .on('mouseover',mouseOver)
    .on('mouseout',mouseOut);
  });
});



var xScale = d3.scaleLinear()
.domain([0,55])
.range([0,250]);

var xAxis = d3.axisBottom(xScale)
.tickSize(13)
.tickValues(color.domain());


var g = d3.select("#map")
.append("g");


g.selectAll("rect")
.append("g")
.data(color.range().map(function(clr){
var d = color.invertExtent(clr);
if (d[0] == null) d[0] = xScale.domain()[0];
if (d[1] == null) d[1] = xScale.domain()[1];

return d;
}))
.enter().insert("rect", ".tick")
.attr("height", 8)
.attr("width", function(d) {return xScale(d[1]) - xScale(d[0]); })
.attr("fill", function(d) { return color(d[0]); })
.attr("x", function(d){return xScale(d[0]);});

g.call(xAxis)
.attr("transform","translate("+200+","+(height+230)+")");;
g.select(".domain")
.remove();

g.append("text")
.attr("fill", "#000")
.attr("font-weight", "bold")
.attr("text-anchor", "start")
.attr("y", -6)
.text("Birth Rate");

var div = d3.select("body").append("div") 
    .attr("class", "tooltip2")       
    .style("opacity", 0);

    function mouseOver(d){
      var xPosition = d3.mouse(this)[0] - 100;
      var yPosition = d3.mouse(this)[1] - 70;
      d3.select("#tooltip")
      .style("left", xPosition+"px")
      .style("top", yPosition+"px")
      .style("opacity",1)
      .select("#neighbourhood")
      .text(d.properties.ADMIN)

      d3.select("#tooltip","#arrow-down")
      .style("left", xPosition+"px")
      .style("top", yPosition+"px")
      .select("#value")
      .text(d.properties.birth)

      d3.select("#tooltip").classed("hidden",false);
    }

    function mouseOut(d){
      d3.select("#tooltip").classed("hidden",true);      
    }
    BarChart();
  }
