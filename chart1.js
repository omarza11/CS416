function draw1() {
    var LEFT = WIDTH * .07;
    var BOTTOM = HEIGHT * .15;
    var RIGHT = LEFT / 3;
    var TOP = BOTTOM / 3;
    const bubble_svg = d3.select('#bubble-chart').append("svg").attr("width", WIDTH).attr("height", HEIGHT)

    const bubble_g = bubble_svg.append("g").attr('transform', 'translate(' + LEFT + ',' + TOP + ')')

    // Create scale for graph
    const x1_scale = d3.scaleLog().base(10).range([0, WIDTH - LEFT - RIGHT]).domain([20000,115000])
    const y1_scale = d3.scaleLinear().range([HEIGHT - BOTTOM, 0]).domain([0,0.2])
    const radius = d3.scaleLinear().range([HEIGHT * 0.01,HEIGHT * 0.1]).domain([124,400000])

    bubble_g.append("text").attr("x",(WIDTH - LEFT - RIGHT)/2).attr("y", HEIGHT - (BOTTOM/2)).text("Median Salary ($)")
    bubble_g.append("text").attr('transform', 'rotate(270)').attr("x", (-HEIGHT - BOTTOM)/2).attr("y", -LEFT / 2).text("Unemployment Rate")

    // Generate both Axis
    const gen_x1 = d3.axisBottom(x1_scale).tickFormat(d3.format(".2s"))
    bubble_g.append("g").attr("class", "x axis").attr('transform', 'translate(' + 0 + ','+ (HEIGHT - BOTTOM) + ')').call(gen_x1)

    const gen_y1 = d3.axisLeft(y1_scale)
    bubble_g.append("g").attr("class", "y axis").call(gen_y1)

        
    const legend = bubble_g.append("g").attr('transform', 'translate(' + ((WIDTH-LEFT) * 0.77) + ',' + -(TOP/2)  + ')')

        categories.forEach((category,i) => {
            const row = legend.append("g").attr('transform', 'translate(' + 0 + ',' + (i*.03 * HEIGHT) + ')')
            row.append("rect").attr("width","0.5vw").attr("height","1vh").attr("fill", color(category))
            row.append("text").attr("x", "1vw").attr("y","1vh").attr("font-size",".9vw").text(category)
            row.on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove)
            row.on("click", function() {
                if (row.attr("opacity") == 1) {
                    row.attr("opacity",0.5)
                    bubble_svg.selectAll("#" + category).attr("visibility","hidden")
                } else {
                    row.attr("opacity", 1)
                    bubble_svg.selectAll("#" + category).attr("visibility","visible")
                }
            })
        })
    legend.append("text").attr("y",(17*.03 * HEIGHT)).html("**Try clicking on the legend").style("font-weight","bold")
    bubble_g.selectAll("circle").data(dataset).enter().append("circle")
    .attr("fill", d=> color(d.Major_category)).attr("visibility","visible").attr("cx", d=>x1_scale(d.Median))
    .attr("cy", d=> y1_scale(d.Unemployment_rate)).attr("r", d=> radius(d.Total)).attr("id", d=>d.Major_category)
    .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove)

    bubble_g.append("text").html("Can you tell what the most popular majors are? Hint it's based on size").attr("class","annotations").attr("x","5vw")
}


var Tooltip = d3.select("#bubble-chart")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "0.3vh solid")
.style("border-radius", "0.5vh")
.style("padding", "0")


var mouseout = function(d) {
    Tooltip.style("opacity", 0)
} 

var mouseover = function(d) {
    Tooltip.style("opacity", 1)
}
var mousemove = function(d) {
    
    Tooltip
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    
    if (d == null) {
        Tooltip.html("Click me to toggle the category on or off, maybe try double clicking")
    } else {
    Tooltip.html("Major Category: " + d.Major_category+ "<br>Major: " + d.Major + "<br>Total: " + (d3.format(",")(d.Total)) + "<br>Unemployment Rate: "+ (d3.format(".3f")(d.Unemployment_rate)) + "<br>Median Salary: " + (d3.format(".2s")(d.Median)))

    }
}

