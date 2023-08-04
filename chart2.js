var employment_chart = true;
function draw2() {
    var LEFT = WIDTH * .2;
    var BOTTOM = HEIGHT * .15;
    var RIGHT = LEFT / 3;
    var TOP = BOTTOM / 3;

    const bar_svg = d3.select('#bar-chart').append("svg").attr("width", WIDTH).attr("height", HEIGHT)

    const bar_g = bar_svg.append("g").attr('transform', 'translate(' + LEFT+ ',' + TOP + ')')

    // Create scale for graph
    const x2_scale = d3.scaleLinear().range([0, WIDTH - LEFT - RIGHT]).domain([0,1300000])
    const y2_scale = d3.scaleBand().range([HEIGHT-BOTTOM, 0]).domain(categories).padding(0.2)

    // Create both Labels
    bar_g.append("text").attr("x",(WIDTH - LEFT - RIGHT)/2).attr("y", HEIGHT - (BOTTOM/2)).text("Total Graduates")
    bar_g.append("text").attr('transform', 'rotate(270)').attr("x", (-HEIGHT - BOTTOM)/2).attr("y", -LEFT+RIGHT / 2).text("Major Category")


    // Generate both Axis
    const gen_x2 = d3.axisBottom(x2_scale)
    bar_g.append("g").attr("class", "x axis").attr('transform', 'translate(' + 0 + ','+ (HEIGHT - BOTTOM) + ')').style("font-size", "0.75vw").call(gen_x2)

    const gen_y2 = d3.axisLeft(y2_scale)
    bar_g.append("g").attr("class", "y axis").style("font-size", "0.65vw").call(gen_y2)




    bar_g.selectAll("rect").data(groupData).enter().append("rect").attr("x",0).attr("y", d => y2_scale(d.key))
    .attr("width", d => x2_scale(d.value.total_fulltime)).attr("height", y2_scale.bandwidth())
    .on("mouseover", mouseover2).on("mouseout", mouseout2).on("mousemove", mousemovef).attr("fill", color("Full Time"))
        
    bar_g.selectAll("rect2").data(groupData).enter().append("rect").attr("x",d => x2_scale(d.value.total_fulltime)).attr("y", d => y2_scale(d.key))
    .attr("width", d => x2_scale(d.value.total_parttime)).attr("height", y2_scale.bandwidth()).attr("fill", color("Part Time")).on("mouseover", mouseover2).on("mouseout", mouseout2).on("mousemove", mousemovep)

    bar_g.selectAll("rect2").data(groupData).enter().append("rect").attr("x",d => x2_scale(d.value.total_fulltime+d.value.total_parttime)).attr("y", d => y2_scale(d.key))
    .attr("width", d => x2_scale(d.value.total_unemployed)).attr("height", y2_scale.bandwidth()).attr("fill", color("Unemployed")).on("mouseover", mouseover2).on("mouseout", mouseout2).on("mousemove", mousemoveu)


    const legend = bar_g.append("g").attr("id","legend").attr('transform', 'translate(' + ((WIDTH-LEFT) * 0.77) + ',' + -(TOP/2)  + ')')

    tot_categories = ["Unemployed", "Full Time", "Part Time"]
    tot_categories.forEach((category,i) => {
        const row = legend.append("g").attr('transform', 'translate(' + 0 + ',' + (i*.07 * HEIGHT) + ')')
        row.append("rect").attr("width","1vw").attr("height","1vw").attr("fill", color(category))
        row.append("text").attr("x", "2vw").attr("y",".75vw").attr("font-size","1vw").text(category)
    })
    bar_g.append("text").html("Look at the difference in number of jobs available for each major. Now let's see the other chart.").attr("class","annotations").attr("x","15vw").attr("y","15vh")
}
function swap() {
    bar2_g = d3.select("#bar-chart").select("svg").remove()
    if (employment_chart) {
        d3.select("#Slide2").select("button").html("Employment Chart")
        drawOther()
    } else {
        d3.select("#Slide2").select("button").html("College Related Chart")
        draw2()
    }
    employment_chart = !employment_chart
}


function drawOther() {
    var LEFT = WIDTH * .2;
    var BOTTOM = HEIGHT * .15;
    var RIGHT = LEFT / 3;
    var TOP = BOTTOM / 3;

    const bar2_svg = d3.select('#bar-chart').append("svg").attr("width", WIDTH).attr("height", HEIGHT)

    const bar2_g = bar2_svg.append("g").attr('transform', 'translate(' + LEFT+ ',' + TOP + ')')

    // Create scale for graph
    const x2_scale = d3.scaleLinear().range([0, WIDTH - LEFT - RIGHT]).domain([0,700000])
    const y2_scale = d3.scaleBand().range([HEIGHT-BOTTOM, 0]).domain(categories).padding(0.2)

    // Create both Labels
    bar2_g.append("text").attr("x",(WIDTH - LEFT - RIGHT)/2).attr("y", HEIGHT - (BOTTOM/2)).text("Total Graduates")
    bar2_g.append("text").attr('transform', 'rotate(270)').attr("x", (-HEIGHT - BOTTOM)/2).attr("y", -LEFT+RIGHT / 2).text("Major Category")


    // Generate both Axis
    const gen_x2 = d3.axisBottom(x2_scale)
    bar2_g.append("g").attr("class", "x axis").attr('transform', 'translate(' + 0 + ','+ (HEIGHT - BOTTOM) + ')').style("font-size", "0.75vw").call(gen_x2)

    const gen_y2 = d3.axisLeft(y2_scale)
    bar2_g.append("g").attr("class", "y axis").style("font-size", "0.65vw").call(gen_y2)

    bar2_g.selectAll("rect").data(groupData).enter().append("rect").attr("x",0).attr("y", d => y2_scale(d.key))
    .attr("width", d => x2_scale(d.value.total_college_jobs)).attr("height", y2_scale.bandwidth()).attr("fill", easy_colors("Major Related Job"))
    .on("mouseover", mouseover2).on("mouseout", mouseout2).on("mousemove", mousemovec)
        
    bar2_g.selectAll("rect2").data(groupData).enter().append("rect").attr("x",d => x2_scale(d.value.total_college_jobs)).attr("y", d => y2_scale(d.key))
    .attr("width", d => x2_scale(d.value.total_non_college_jobs)).attr("height", y2_scale.bandwidth()).attr("fill", easy_colors("Non Related Job"))
    .on("mouseover", mouseover2).on("mouseout", mouseout2).on("mousemove", mousemoven)



    const legend = bar2_g.append("g").attr("id","legend").attr('transform', 'translate(' + ((WIDTH-LEFT) * 0.77) + ',' + -(TOP/2)  + ')')

    tot_categories = ["Major Related Job", "Non Related Job"]
    tot_categories.forEach((category,i) => {
        const row = legend.append("g").attr('transform', 'translate(' + 0 + ',' + (i*.07 * HEIGHT) + ')')
        row.append("rect").attr("width","1vw").attr("height","1vw").attr("fill", easy_colors(category))
        row.append("text").attr("x", "2vw").attr("y",".75vw").attr("font-size","1vw").text(category)
    })
    bar2_g.append("text").html("Psych there's not even many people working related to their major in the large industries.").attr("class","annotations").attr("x","15vw").attr("y","15vh")
}
var Tooltip2 = d3.select("#bar-chart")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "0.3vh solid")
.style("border-radius", "0.5vh")
.style("padding", "0")
.style("font-size", "1vw")

var mouseout2 = function(d) {
    Tooltip2.style("opacity", 0)
} 

var mouseover2 = function(d) {
    Tooltip2.style("opacity", 1)
}
var mousemovec = function(d) {
    sum = d.value.total_college_jobs + d.value.total_non_college_jobs;
    Tooltip2
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html("College: " + (d3.format(".2%")( d.value.total_college_jobs/sum)))
}
var mousemoven = function(d) {
    sum = d.value.total_college_jobs + d.value.total_non_college_jobs;
    Tooltip2
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html("Non College: " + (d3.format(".2%")( d.value.total_non_college_jobs/sum)))
}
var mousemoveu = function(d) {
    sum = d.value.total_fulltime + d.value.total_parttime + d.value.total_unemployed;
    Tooltip2
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html("Unemployed: " + (d3.format(".2%")( d.value.total_unemployed/sum)))
}
var mousemovef = function(d) {
    sum = d.value.total_fulltime + d.value.total_parttime + d.value.total_unemployed;
    Tooltip2
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html("Full Time: " + (d3.format(".2%")( d.value.total_fulltime / sum)))
}
var mousemovep = function(d) {
    sum = d.value.total_fulltime + d.value.total_parttime + d.value.total_unemployed;
    Tooltip2
    .style("left", (d3.event.pageX + (0.01 * WIDTH)) + "px")
    .style("top", (d3.event.pageY + (0.01 * HEIGHT)) + "px")
    .html( "Part Time: " + (d3.format(".2%")(d.value.total_parttime/ sum)))
}