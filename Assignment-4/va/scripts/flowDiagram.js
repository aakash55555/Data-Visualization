// this is where your implementation for your flow diagram should go 
function FlowDiagram(svg, data) {
    this.svg = svg;
    // grab the bounding box of the container
    var boundingBox = svg.node().getBoundingClientRect();

    //  grab the width and height of our containing SVG
    var svgHeight = boundingBox.height;
    var svgWidth = boundingBox.width;
    let index = 0;
    let svgDimen = this.svg
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append("g");

    // this is where your code should go to generate the flow diagram from the random data
    this.draw = function(data){
        d3.selectAll(".remove").remove();
        /* 
        var xScale = d3.scaleBand()
        .domain("enter", "update","exit")
        .range([0, svgWidth])

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.text { font: bold 120px monospace; }';
        */
                    
        let t = d3.transition()
                 
        // JOIN the new elements in the existing ones
        let text = svgDimen.selectAll("text")
        .data(data,(d) => d.id);
      
        //Exit method
        index = 0;
        text.exit()
        .attr("class", "remove")
        .style('fill', 'red')
        .attr("y", (d,i) => i * 20)
        .text((d) => d.name)
        .transition(t)
        .attr('fill', 'red')
        .attr("x", 400)
        .attr("y", function(d, i) {
          index += 1; 
          return (index * 16); });
        
        //Update Method
        text.attr("class","update")
        .attr('fill', 'orange')
        .text((d) =>d.name)
        .transition(t)
        .attr('fill', 'orange')
        .attr("x", 200)
        .attr("y", (d, i) => 15+(i * 20))
  
        /*
        text.append("text")
        .style('fill', 'orange')
        .attr("x", 0)
        .attr("dx", ".35em")
        .style("fill-opacity", 1e-6)
        .attr("x", -60)
        .attr("y", function(d, i) { return i * 15; })
        .text(function(d) { return d.name; })
        .transition(t)
        .attr("x", 0)
        .attr("y", fun)
        .style("fill-opacity", 1);
        */
        // ENTER new elements present in new data.
        /*
        text.enter().append("text")
        .style('fill', 'green')
        .attr("dy", ".35em")
        .attr("y", -60)
        .attr("x", function(d, i) { return i * 32; })
        .style("fill-opacity", 1e-6)
        .text(function(d) { return d; })
        .transition(t)
        .attr("y", 0)
        .style("fill-opacity", 1);
        */
        
        //Enter Method
        index = 0;
        text.enter()
        .append("text")
        .attr('fill', 'green')
        .attr("class", "enter")
        .attr("y", (d, i) => i * 15)
        .text((d) => d.name)
        .transition(t)
        .attr("y", function(d, i) { 
          index += 1; 
          return (index* 16);
          })   
        .attr("x",0)
        .attr("fill","green");
      }
 }

