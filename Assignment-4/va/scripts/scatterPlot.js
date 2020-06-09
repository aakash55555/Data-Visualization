// this is where your implementation for your scatter plot should go
function ScatterPlot(svg, data, updateFlowDiagram) {

    var margins = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    };

    this.svg = svg;

    // grab the bounding box of the container
    var boundingBox = svg.node().getBoundingClientRect();

    //  grab the width and height of our containing SVG
    var svgHeight = boundingBox.height;
    var svgWidth = boundingBox.width;

    var svg= this.svg
      .attr("height",svgHeight)
      .attr("width",svgWidth)
      .append("g")
      //.append("g")
      .attr("transform", "translate("+((svgWidth/2)-270)+","+ (margins.top+50) +")");


            var h = svgHeight - margins.top - margins.bottom-100
              var w = svgWidth - margins.left - margins.right-100

    // this is where your code should go to generate the flow diagram from the random data

    var xScale = d3.scaleLinear()
      .domain(d3.extent(data, function(d) {return d.v0}))
      .range([0,w])
      .nice();
    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, function(d) {return d.v1}))
      .range([h,0])
      .nice();

      var xAxis = d3.axisBottom(xScale)
      .ticks(8)

    // Y-axis
    var yAxis = d3.axisLeft(yScale)
      .ticks(8)
      svg.append('g')
            .attr('class','axis')
            .attr('id','xAxis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)

        // Y-axis
        svg.append('g')
            .attr('class','axis')
            .attr('id','yAxis')
            .call(yAxis)

this.draw = function(data){
d3.selectAll(".remove").remove();

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) {return d.v0}))
    .range([0,w])
    .nice();
  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) {return d.v1}))
    .range([h,0])
    .nice();

xAxis.scale(xScale);
d3.select(".x").transition().call(xAxis)


yAxis.scale(yScale);
d3.select(".y").transition().call(xAxis)




  var t = d3.transition()

    d3.selectAll(".exit").remove();
        var text = svg.selectAll("circle")
            .data(data, function(d) { return d.id; });


          text.enter().append('circle')
            .attr('cx',function (d) { return xScale(d.v0) })
            .attr('cy',function (d) { return yScale(d.v1) })
            .attr('r','5')
            .attr('stroke','green')
            .attr('stroke-width',1)
            .attr('fill',"green")


                // text.attr('cx',function (d) { return xScale(d.v0) })
                //   .attr('cy',function (d) { return yScale(d.v1) })
                //   .attr('r','5')
                //   .attr('stroke','orange')
                //   .attr('stroke-width',1)
                //   .attr('fill',"orange")
                  text.transition(t)
                  .attr('cx',function (d) { return xScale(d.v0) })
                    .attr('cy',function (d) { return yScale(d.v1) })
                    .attr('r','5')
                    .attr('stroke','orange')
                    .attr('stroke-width',1)
                    .attr('fill',"orange")



              text.exit()
                    .attr("class", "exit")
                    .attr('cx',function (d) { return xScale(d.v0) })
                    .attr('cy',function (d) { return yScale(d.v1) })
                    .attr('r','5')
                    .attr('stroke','red')
                    .attr('stroke-width',1)
                    .attr('fill',"red")


// var lg = calcLinear(data,d3.min(data, function(d){ return d.v0}), d3.min(data, function(d){ return d.v1}));
//
//       // svg.append("line")
//       // .attr("class", "regression")
//       // .attr("x1", xScale(lg.ptA.x))
//       // .attr("y1", yScale(lg.ptA.y))
//       // .attr("x2", xScale(lg.ptB.x))
//       // .attr("y2", yScale(lg.ptB.y))
//       // .attr("stroke-width","2px")
//       // .attr("stroke","red")
//
//
//
//
//
//
//       function calcLinear(data, minX, minY){
//
//             // Let n = the number of data points
//             var n = data.length;
//
//             // Get just the points
//             // var pts = [];
//             // data.forEach(function(d,i){
//             //   var obj = {};
//             //   obj.x = d.x;
//             //   obj.y = d.y;
//             //   obj.mult = obj.x*obj.y;
//             //   pts.push(obj);
//             // });
//
//             var sum = 0;
//
//             var sumSq = 0;
//             var mult=0;
//             data.forEach(function(d,i){
//               mult= d.v0*d.v1;
//               sum = sum + mult;
//               xSum = xSum + d.v0;
//               ySum = ySum + d.v0;
//               sumSq = sumSq + (d.v0 * d.v0)
//             });
//             var a = sum * n;
//             var b = xSum * ySum;
//             var c = sumSq * n;
//             var d = xSum * xSum;
//             var m = (a - b) / (c - d);
//             var e = ySum;
//             var f = m * xSum;
//             var b = (e - f) / n;
//
//             return {
//               ptA : {
//                 x: minX,
//                 y: parseInt((m * minX + b) ,10)
//               },
//               ptB : {
//                 y: minY,
//                 x: parseInt(((minY - b) / m),10)
//               }
//             }
//           }

                  var xSum = 0;
                  var ySum = 0;
                  var n = data.length;
                  data.forEach(function(d,i){xSum = xSum + d.v0;ySum = ySum + d.v1;});
                  var xMean = xSum/n;
                  var yMean = ySum/n;
                  var term1 = 0;
                  var term2 = 0;
                  var v0l = 0;
                  var v1l = 0;
                  for (i = 0; i < data.length; i++) {
                      v0l = data[i].v0 - xMean;
                      v1l = data[i].v1 - yMean;
                      term1 += v0l * v1l;
                      term2 += v0l * v0l;
                  }
                  var b1 = term1 / term2;
                  var b0 = yMean - (b1 * xMean);
                  coeffArray = [];
                  for (i = 0; i < data.length; i++) {coeffArray.push(b0 + (data[i].v0 * b1));}
                  var l=0;
                  data.forEach(function(d){d.coeffArray = +coeffArray[l];l++;});

                  var line = d3.line()
                      .x(function(d) {return xScale(d.v0);})
                      .y(function(d) {return yScale(d.coeffArray);})

          var path=svg.append("path")
                          .data([data])
                          .attr("stroke", "blue")
                          .attr("d", line)
                          .attr("class","remove")
                          .attr("stroke-width", 1)
                          .attr("fill", "none");
}

}
