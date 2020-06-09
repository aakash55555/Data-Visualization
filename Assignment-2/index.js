//Changes for Step 4, Declare the color scheme and Set the dimensions of the canvas / graph
var margin = {top: 10, right: 20, bottom: 50, left: 50},
    width = 800 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom,    
    color = d3.scaleOrdinal(d3.schemeCategory10);

//Changes for Step 3 and 5, set the ranges of X Axis, Y Axis and radius of circle and change the scale of X- Axis
var x = d3.scaleLog().range([0, width]).base(10);
var y = d3.scaleLinear().range([height, 0]);
var r = d3.scaleLinear().range([4, 10]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
//Step 1:- moves the svg element to the center
var svg = d3.select(".center").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Step 2:- Get the data from the file gapminderDataFiveYear.tsv
d3.tsv("data/gapminderDataFiveYear.tsv", function(error, data) {
    if (error) throw error;

//Step 2:- Get the columns and format the data (i.e., process it such that strings are converted to their appropriate types)
data.forEach(function(d) {
    d.year = +d.year;
    d.pop = +d.pop;
    d.lifeExp = +d.lifeExp;
    d.gdpPercap = +d.gdpPercap;
});
    
//Step 2:- Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.gdpPercap; }));
y.domain([29, d3.max(data, function(d) { return d.lifeExp; })]);
r.domain(d3.extent(data, function(d) { return d.pop; }));
    
// Add the valueline path.
svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

//Step 2, 4:- Add the scatterplot between GDP Per Capita and Life Expectancy in the year 1952 and 2007
svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .filter(function(d) { return d.year == 1952 || d.year == 2007})
    .attr("r", function(d){ return r(d.pop); })
    .attr("fill", function(d) {
        if(d.year == 1952){ 
            return color(10);
        } else {
            return color(9);
        }
})
    .attr("opacity", 0.8)
    .attr("cx", function(d) { return x(d.gdpPercap); })
    .attr("cy", function(d) { return y(d.lifeExp); });

//Step 6:- Add the X Axis with 11 ticks, .0s format and Lato as font-family
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .style("font-family", "Lato")
    .call(d3.axisBottom(x).ticks(11, ".0s"));

//Step 6:- Add the Y Axis
svg.append("g")
    .style("font-family", "Lato")
    .call(d3.axisLeft(y));

//Step 6:- Add label name  for X Axis with all the characteristics mentioned
svg.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-weight",700)
    .attr("text-anchor", "end")
    .attr("y", height + margin.top +30)
    .attr("font-size","14px")
    .attr("x", width * 3/5)
    .text("GDP per Capita");

//Step 6:- Add label for Y Axis with the mentioned characteristics
svg.append("text")
    .attr("y", -30)
    .attr("x", -150)
    .attr("font-weight",700)
    .attr("font-size","14px")
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Life Expectency");

//Step 7:- Add chart title at the top with required characteristics
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", margin.top+5)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-weight",700)
    .style("font-size", "16px")
    .style("text-decoration","bold")
    .style("text-decoration", "underline")
    .text("GDP vs Life expectency (1952,2007)");

//Step 7:- Adding the legends variables
var legendSquareSize = 11;                            
var legendSquareSpacing = 3;   
var dataset = ['1952','2007']   

//Step 7:- Stting properties for the legend
var legend = svg.selectAll('.legend')                   
.data(color.domain())                                   
.enter()                                               
.append('g')                                           
.attr('class', 'legend')                              
.attr('transform', function(d, i) {                    
    var height = legendSquareSize + legendSquareSpacing;         
    var offset =  height * color.domain().length / 2;    
    var horizontalDrag = 60 * legendSquareSize;                      
    var verticalDrag = i * height + offset;                      
    return 'translate(' + horizontalDrag + ',' + verticalDrag + ')';        
});    
 
//Step 7:- Setting properties of the Legend Square
legend.append('rect')
.attr('height', legendSquareSize)                                               
.attr('width', legendSquareSize)                                         
.style('fill', function(d)
{
     return color(d);
});                                                      
    
//Step 7:- Setting properties of the Legend Titles
legend.append('text')
.data(dataset)
.attr('y', legendSquareSize - legendSquareSpacing)                                         
.attr('x', legendSquareSize + legendSquareSpacing)          
.text(function(d){
    return d;
})
.style("font-size", "11px")
.attr("font-family","san-serif");      
});