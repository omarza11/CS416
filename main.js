const categories = ["Agriculture_and_Natural_Resources","Arts",
    "Biology_and_Life_Science","Business","Communications_and_Journalism",
    "Computers_and_Mathematics","Education","Engineering","Health","Humanities_and_Liberal_Arts",
    "Industrial_Arts_and_Consumer_Services","Law_and_Public_Policy","Physical_Sciences","Psychology_and_Social_Work","Interdisciplinary","Social_Science"]
var colors = ["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616"]
var dataset = null;
var groupData = null;
var category_data = null;
const color = d3.scaleOrdinal().domain(categories).range(colors);
const easy_colors = d3.scaleOrdinal().range(d3.schemeCategory10);

d3.csv("/CS416/recent-grads.csv", function(d) {

    d.Total = +d.Total;
    d.Median = +d.Median;
    d.Unemployment_rate = +d.Unemployment_rate;
    d.Men = +d.Men;
    d.Women = +d.Women;
    d.Employed = +d.Employed;
    d.Full_time = +d.Full_time;
    d.Part_time = +d.Part_time;
    d.Full_time_year_round = +d.Full_time_year_round;
    d.Unemployed = +d.Unemployed;
    d.College_jobs = +d.College_jobs;
    d.Major_category = d.Major_category.replaceAll(" ","_").replaceAll("&","and");
    return d;
  }).then(function(data) {
      groupData = d3.nest().key(function(d) {return d.Major_category}).rollup(function(v) {return {
      total_grads : +d3.sum(v,function(d) {return d.Total;}),
      total_employed: +d3.sum(v,function(d) {return d.Employed;}),
      total_unemployed: +d3.sum(v,function(d) {return d.Unemployed;}),
      total_fulltime: +d3.sum(v,function(d) {return d.Full_time;}),
      total_parttime: +d3.sum(v,function(d) {return d.Part_time;}),
      total_avg_median : +d3.mean(v, function(d) {return d.Median}),
      total_women : +d3.sum(v,function(d) {return d.Women}),
      total_men : +d3.sum(v,function(d) {return d.Men}),
      total_college_jobs : +d3.sum(v,function(d) {return d.College_jobs}),
      total_non_college_jobs : +d3.sum(v,function(d) {return d.Non_college_jobs}),
  }; })
      .entries(data)
    category_data = d3.nest().key(function(d) {return d.Major_category})
      .object(data)
    dataset = data;
    draw1()
    draw2()
    draw3()
  })



var slideIndex = +localStorage.getItem("slideIndex");
if (slideIndex == null) {
  slideIndex = 1;
}
window.onbeforeunload = function()
  {
    localStorage.setItem("slideIndex", slideIndex);
  };

var WIDTH = window.innerWidth * .75;
var HEIGHT = window.innerHeight * .7 - 100;


window.addEventListener("resize", () => {
    WIDTH = window.innerWidth * .75;
    HEIGHT = window.innerHeight * .7 - 100;
    d3.select("#bubble-chart").select("svg").remove()
    draw1();
    d3.select("#bar-chart").select("svg").remove()
    draw2();
    d3.select("#double-bar-chart").select("svg").remove()
    draw3();
});

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  slideIndex +=n;
  showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  window.location.href="#" + slides[slideIndex-1].id
}
