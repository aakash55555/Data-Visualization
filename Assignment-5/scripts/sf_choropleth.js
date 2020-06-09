// load data with queue
var url1 = "./data/sacramento.geojson";

var q = d3_queue.queue(1)
  .defer(d3.json, url1)
   //.defer(d3.csv, url3)
  .awaitAll(draw);

function draw(error, data) {
  "use strict";

  // important: First argument it expects is error
  if (error) throw error;

  // initialize the Bayview as the default neighborhood
  //var field = "Bayview";

  var margin = 50,
    width = 450 - margin,
    height = 500 - margin;

 var color = d3.scaleThreshold()
.domain([0, 10, 15, 20, 25, 30, 35, 40])
.range(["#D7301F", "#EF6548", "#FBB676", "#FEF4B9", "#A8C87D", "#359A4B", "#1B532D", "#12351F"]);



  // create a projection properly scaled for SF
  //var projection = d3.geoMercator()
  var projection = d3.geoMercator()
  .center(d3.geoCentroid(data[0]))
  //.center(150, 150)
  .scale(100000)
  .translate([width / 1.5, height / 1.5]);
    //.center([-122.433701, 37.767683])
    //.scale(175000)
    //.translate([width / 1.5, height / 1.74]);

  // create a path to draw the neighborhoods
  var path = d3.geoPath()
    .projection(projection);

  // create and append the map of SF neighborhoods
  
  
  
  
  
  
  // var map = d3.select('#map')
  // .selectAll('path')
  //   .data(data[0].features)
  //   .enter()
  //   .append('path')
  //   .attr('d', path)
  //   .style('stroke', 'black')
  //   .style('stroke-width', 0.75)
  //   .style("fill", "none");

  
  
  
  
  
  
  
  // // normalize neighborhood names
  // map.datum(function(d) {
  //   var normalized = d.properties.neighbourhood
  //     .replace(/ /g, '_')
  //     .replace(/\//g, '_');

  //   d.properties.neighbourhood = normalized;
  //   d.count = data[1][d.properties.neighbourhood];
  //   return d;
  // });

  // // add the neighborhood name as its class
  // map
  //   .attr('class', function(d) {
  //     return d.properties.neighbourhood;
  //   })
  //   .attr("fill", function(d) {
  //     return color(d.count);
  //   })
  //   .attr("transform", "translate(60" + ", 50" + ")");
  d3.csv("./data/tree_canopy.csv", function(data) {
    //domain([0, 10, 15, 20, 25, 30, 35, 40]); // setting the range of the input data
    
    // Load GeoJSON data and merge with states data
    d3.json("./data/sacramento.geojson", function(json) {
    
    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {
    
      // Grab State Name
      var dataState = data[i].Neighborhood;
    
      // Grab data value 
      var dataValue = data[i].CanopyPerc;
    
      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++)  {
        var jsonState = json.features[j].properties.name;
    
        if (dataState == jsonState) {
    
        // Copy the data value into the JSON
        json.features[j].properties.canopyperc = dataValue; 
    
        // Stop looking through the JSON
        break;
        }
      }
    }

    //   var map = d3.select('#map')
    // //.attr("align", "center")
    // .selectAll('path')
    // .data(data[0].features)
    // .enter()
    // .append('path')
    // .attr('d', path)
    // .style('stroke', 'black')
    // .style('stroke-width', 0.75)
    // .style('fill', 'none');
        
    // Bind the data to the SVG and create one path per GeoJSON feature
    var map = d3.select("#map")
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function(d) {
    

        var value = +d.properties.canopyperc;
      
	if (value) {
    //If value exists…
    return color(value);
    } else {
    //If value is undefined…
    return "#d7301f";
    }
    
      // var value =0;
  //     if (value <= 0) {
  //     //If value exists…
  //     return "#D7301F";
  //     }
  //     else if (value > 0 && value <= 10) {
  //       //If value exists…
  //       return "#EF6548";
  //       }
  //     else if (value > 10 && value <= 15) {
  //         //If value exists…
  //       return "#FBB676";
  //       }
  //     else if (value > 15 && value <= 20) {
  //           //If value exists…
  //       return "#FEF4B9";
  //       }
  //     else if (value > 20 && value <= 25) {
  //             //If value exists…
  //         return "#A8C87D";
  //       }
  //     else if (value > 25 && value <= 30) {
  //               //If value exists…
  //         return "#359A4B";
  //       }
  //     else if (value > 30 && value <= 35) {
  //         //If value exists…
  //         return "#1B532D";
  //       }
  //     else if (value > 35 && value <= 40) {
  //         //If value exists…
  //         return "#12351F";
  // }    
  //     else {
  //     //If value is undefined…
  //     return "#12351F";
  //     }
      
    })
    .on('mouseover',mouseOver)
    .on('mouseout',mouseOut);
  });
});
//Step 3:


var xScale = d3.scaleLinear()
.domain([0,40])
.range([0,450]);

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
//console.log("i am getting the value of d[0] as",d[0]);
return d;
}))
//.data(color.domain.slice().reverse)
.enter().insert("rect", ".tick")
.attr("height", 8)
.attr("width", function(d) {return xScale(d[1]) - xScale(d[0]); })
.attr("fill", function(d) { return color(d[0]); })
.attr("x", function(d){return xScale(d[0]);});

g.call(xAxis)
.attr("transform","translate("+100+","+(height+200)+")");;
g.select(".domain")
.remove();
// .attr("transform","translate("+100+","+(height+120)+")");

g.append("text")
.attr("fill", "#000")
.attr("font-weight", "bold")
.attr("text-anchor", "start")
.attr("y", -6)
.text("Tree Canopy Percentage");

//Step 4
var div = d3.select("body").append("div") 
    .attr("class", "tooltip2")       
    .style("opacity", 0);

    function mouseOver(d){
      var xPosition = d3.mouse(this)[0] + 280;
      var yPosition = d3.mouse(this)[1] - 100;
      d3.select("#tooltip")
      .style("left", xPosition+"px")
      .style("top", yPosition+"px")
      .style("opacity",1)
      .select("#neighbourhood")
      .text(d.properties.name)

      d3.select("#tooltip","#arrow-down")
      .style("left", xPosition+"px")
      .style("top", yPosition+"px")
      .select("#value")
      .text(d.properties.canopyperc)

      d3.select("#tooltip").classed("hidden",false);
    }

    function mouseOut(d){
      d3.select("#tooltip").classed("hidden",true);      
    }
// var tooltip= d3.select("#map")
// .append("div")
// .attr("class","#tooltip")
// .style("position", "absolute")
// .style("text-align", "center")
// .style("padding", "2px")
// .style("background-color", "rgba(0,0,0,0.6)")
// .style("border", "2px")
// .style("visibility", "visible")
// .style("pointer-events", "None");

// d3.select("#map")
// .selectAll("path")
// 	.data(json.features)
// 	.enter()
// 	.append("path")
// 	.attr("d", path) 
// 		.style("fill", "rgb(217,91,67)")	
// 		.style("opacity", 0.85)	

// 	// Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
// 	// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
// 	.on("mouseover", function(d) {      
//     	tooltip.transition()        
//       	   .duration(200)      
//            .style("opacity", .9);      
//            tooltip.html(d.properties.name + "<br />" + 'Canopy Percentage:' + "<br />" + d.properties.color_value).style("color","white").style("visibility", "visible")
//            .style("left", (d3.event.pageX) + "px")     
//            .style("top", (d3.event.pageY - 28) + "px");    
// 	})   

//     // fade out tooltip on mouse out               
//     .on("mouseout", function(d) {       
//         tooltip.transition()        
//            .duration(500)      
//            .style("opacity", 0);   
//     }); 

// d3.select("#tooltip").classed("hidden",false);
d3.select('body')
.on('keydown', () => {
const event = d3.event;
if (event.keyCode === 67) {
  animation();
}
});
function animation() {
  console.log("value of map",map)
  console.log("calling animation")
  document.body.innerHTML = "<button>C key is working and map is disappearing but animation not working</button>"
 d3.select("body").selectAll("path").attr("fill","#ffffff");
};
}
