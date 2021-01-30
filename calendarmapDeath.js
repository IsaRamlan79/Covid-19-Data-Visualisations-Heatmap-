var width = 900,
    height = 105,
    cellSize = 12; // cell size
    week_days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	
var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
	format = d3.time.format("%d/%m/%Y");
	parseDate = d3.time.format("%d/%m/%Y").parse;
    
  var color = d3.scale.linear().range(['#00e4ff', '#00ffa8', '#00ff36', '#3eff00', '#b0ff00', '#FFfa00', '#FFdc00', '#FFbe00', '#FFa000', '#FF8200', '#FF6400', '#FF4600','#FF2800','#FF0000','#e10000','#c30000','#a50000','#910000','#7d0000','#690000','#550000'])
  .domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
  // var color = d3.scale.linear().range(['#f9cdac', '#f3aca2', '#ee8b97', '#e96a8d', '#db5087', '#b8428c', '#973490', '#742796', '#5e1f88', '#4d1a70','#3d1459','#2d0f41'])
  // .domain([0,2,4,6,8,10,12,14,16,18,20,22])
    
var svg = d3.select(".death").selectAll("svg")
    .data(d3.range(2020,2022))
    //.data(2020)
  .enter().append("svg")
    .attr("width", '100%')
    .attr("data-height", '0.5678')
    .attr("viewBox",'0 0 900 105')
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });
 
for (var i=0; i<7; i++)
{    
svg.append("text")
    .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
    .style("text-anchor", "end")
    .attr("dy", "-.25em")
    .text(function(d) { return week_days[i]; }); 
 }

var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter()
	.append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return week(d) * cellSize; })
    .attr("y", function(d) { return day(d) * cellSize; })
    .attr("fill",'#fff')
    .datum(format);

var legend = svg.selectAll(".legend")
      .data(month)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + (((i+1) * 50)+8) + ",0)"; });

legend.append("text")
   .attr("class", function(d,i){ return month[i] })
   .style("text-anchor", "end")
   .attr("dy", "-.25em")
   .text(function(d,i){ return month[i] });
   
svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("id", function(d,i){ return month[i] })
    .attr("d", monthPath);

d3.csv("Covid19Malaysia2020Datasets.csv", function(error, csv) {

  csv.forEach(function(d) {
    d.new_deaths = parseInt(d.new_deaths);
  });

 var Comparison_Type_Max = d3.max(csv, function(d) { return d.new_deaths; });
 
  var data = d3.nest()
    .key(function(d) { return d.Date; })
    //.rollup(function(d) { return  Math.sqrt(d[0].new_deaths / Comparison_Type_Max); })
    .rollup(function(d) { return (d[0].new_deaths); })
    .map(csv);
	
  rect.filter(function(d) { return d in data; })
      .attr("fill", function(d) { return color(data[d]); })
    //.attr("data-title", function(d) { return "value : "+Math.round(data[d])}); 
    .attr("data-title", function(d) { return "Date:"+d+"<br>Death Case(s) : "+ data[d]}); 
	$("rect").tooltip({container: 'body', html: true, placement:'top'}); 
});

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}
