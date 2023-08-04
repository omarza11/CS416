function draw3() {
    d3.select("#Slide3").select("#go_back").style("display", "none")
    var LEFT = WIDTH * .2;
    var BOTTOM = HEIGHT * .15;
    var RIGHT = LEFT / 3;
    var TOP = BOTTOM / 3;

    const bar_svg = d3.select('#double-bar-chart').append("svg").attr("width", WIDTH).attr("height", HEIGHT)

    const bar_g = bar_svg.append("g").attr('transform', 'translate(' + LEFT + ',' + TOP + ')')

    // Create scale for graph
    const x_scale = d3.scaleLinear().range([0, WIDTH - LEFT - RIGHT]).domain([0,700000])
    const y_scale = d3.scaleBand().range([HEIGHT-BOTTOM, 0]).domain(categories).padding(0.2)

    // Create both Labels
    bar_g.append("text").attr("x",(WIDTH - LEFT - RIGHT)/2).attr("y", HEIGHT - (BOTTOM/2)).text("Total Graduates")
    bar_g.append("text").attr('transform', 'rotate(270)').attr("x", (-HEIGHT - BOTTOM)/2).attr("y", -LEFT+RIGHT / 2).text("Major Category")
    const genders = {"Men": "blue", "Women": "pink"}

    // Generate both Axis
    const gen_x = d3.axisBottom(x_scale)
    bar_g.append("g").attr("class", "x axis").attr('transform', 'translate(' + 0 + ','+ (HEIGHT - BOTTOM) + ')').style("font-size", "0.75vw").call(gen_x)

    const gen_y = d3.axisLeft(y_scale)
    bar_g.append("g").attr("class", "y axis").style("font-size", "0.65vw").call(gen_y)

    bar_g.selectAll("rect").data(groupData).enter().append("rect").attr("x",0).attr("y", d => y_scale(d.key))
    .attr("width", d => x_scale(d.value.total_men)).attr("height", y_scale.bandwidth()/3)
    .on("mouseover", mouseover3).on("mouseout", mouseout3).on("mousemove", mousemove3).attr("fill", genders["Men"]).on("click", zoom_in)
        
    bar_g.selectAll("rect2").data(groupData).enter().append("rect").attr("x",0).attr("y", d => y_scale(d.key)+y_scale.bandwidth()/3)
    .attr("width", d => x_scale(d.value.total_women)).attr("height", y_scale.bandwidth()/3).attr("fill", genders["Women"])
    .on("mouseover", mouseover3).on("mouseout", mouseout3).on("mousemove", mousemove3).on("click", zoom_in)


    const legend = bar_g.append("g").attr('transform', 'translate(' + ((WIDTH-LEFT) * 0.85) + ',' + -(TOP/2)  + ')')

    new_col = ["Men", "Women"]
    new_col.forEach((category,i) => {
        const row = legend.append("g").attr('transform', 'translate(' + 0 + ',' + (i*.1 * HEIGHT) + ')')
        row.append("rect").attr("width","1vw").attr("height","1vw").attr("fill", genders[category])
        row.append("text").attr("x", "1.5vw").attr("y","1vw").attr("font-size","1.5vw").text(category)
    })
    bar_g.append("text").html("Wow there is so much variation in gender disparity, **Now click on one of the bars.**").attr("class","annotations").attr("x","5vw")
}

function reset() {
    
    d3.selectAll("#double-bar-chart").select("svg").remove()
    draw3()
}

var Tooltip3 = d3.select("#double-bar-chart")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "0.3vh solid")
.style("border-radius", "0.5vh")
.style("padding", "0")

var mouseout3 = function() {
    Tooltip3.style("opacity", 0)
} 

var mouseover3 = function() {
    Tooltip3.style("opacity", 1)
}
var mousemove3 = function(d) {
    Tooltip3
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html("Total Graduated: " + (d3.format(",")(d.value.total_grads)) + "<br>Total Men: " + (d3.format(",")(d.value.total_men)) +
    "<br>Total Women: " + (d3.format(",")(d.value.total_women)))
}

var mousemove4 = function(d) {
    Tooltip3
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html("Total Graduated: " + (d3.format(",")(d.Total)) + "<br>Men: " + (d3.format(",")(d.Men)) +
    "<br>Women: " + (d3.format(",")(d.Women)))
}

var zoom_in = function(d) {
    var LEFT = WIDTH * .2;
    var BOTTOM = HEIGHT * .15;
    var RIGHT = LEFT / 3;
    var TOP = BOTTOM / 3;

    Tooltip3.style("opacity", 0)
    d3.select('#double-bar-chart').selectAll("g").remove()
    new_data = category_data[d.key]
    var majors = new_data.map(a => a.Major)
    var maxi = new_data.map(a=> (a.Men< a.Women) ? a.Women : a.Men)
    
    
    const bar3_g = d3.select("#double-bar-chart").select("svg").append("g").attr('transform', 'translate(' + LEFT + ',' + TOP + ')')
    const x3_scale = d3.scaleLinear().range([0, WIDTH - LEFT - RIGHT]).domain([0,Math.max.apply(Math,maxi)])
    const y3_scale = d3.scaleBand().range([HEIGHT-BOTTOM, 0]).domain(majors).padding(0.2)

    bar3_g.append("text").attr("x",(WIDTH - LEFT - RIGHT)/2).attr("y", HEIGHT - (BOTTOM/2)).text("Total Graduates")
    bar3_g.append("text").attr('transform', 'rotate(270)').attr("x", (-HEIGHT - BOTTOM)/2).attr("y", -LEFT+RIGHT / 2).text("Majors")
    const genders = {"Men": "blue", "Women": "pink"}

    // Generate both Axis
    const gen_x3 = d3.axisBottom(x3_scale)
    bar3_g.append("g").attr("class", "x axis").attr('transform', 'translate(' + 0 + ','+ (HEIGHT - BOTTOM) + ')').style("font-size", "0.75vw").call(gen_x3)

    const gen_y3 = d3.axisLeft(y3_scale)
    bar3_g.append("g").attr("class", "y axis").style("font-size", "0.49vw").call(gen_y3)


    bar3_g.selectAll("rect").data(new_data).enter().append("rect").attr("x",0).attr("y", d => y3_scale(d.Major))
    .attr("width", d => x3_scale(d.Men)).attr("height", y3_scale.bandwidth()/3).attr("fill", genders["Men"])
        
    bar3_g.selectAll("rect2").data(new_data).enter().append("rect").attr("x",0).attr("y", d => y3_scale(d.Major)+y3_scale.bandwidth()/3)
    .attr("width", d => x3_scale(d.Women)).attr("height", y3_scale.bandwidth()/3).attr("fill", genders["Women"])
    .on("mouseover", mouseover3).on("mouseout", mouseout3).on("mousemove", mousemove4)
    new_col = ["Men", "Women"]

    const legend = bar3_g.append("g").attr('transform', 'translate(' + ((WIDTH-LEFT) * 0.85) + ',' + -(TOP/2)  + ')')
    new_col.forEach((category,i) => {
        const row = legend.append("g").attr('transform', 'translate(' + 0 + ',' + (i*.1 * HEIGHT) + ')')
        row.append("rect").attr("width","1vw").attr("height","1vw").attr("fill", genders[category])
        row.append("text").attr("x", "1.5vw").attr("y","1vw").attr("font-size","1.5vw").text(category)
    })
    d3.select("#Slide3").select("#go_back").style("display", "block")
    bar3_g.append("text").html("Is this what you expected? It got even worse when looking at individual majors.").attr("class","annotations").attr("x","5vw")

}