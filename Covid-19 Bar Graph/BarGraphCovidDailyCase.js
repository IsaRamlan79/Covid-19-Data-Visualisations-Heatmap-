// https://observablehq.com/@lg/analysis-of-covid-19-data-in-australia@291
import define1 from "./e93997d5089d7165@2286.js";
import define2 from "./7764a40fe6b83ca1@413.js";


export default function define(runtime, observer) {
  const main = runtime.module();
//   main.variable(observer()).define(["md"], function(md){return(
// md`# Analysis of COVID-19 Data in Malaysia #
//  ###  `
// )});
 
  main.variable(observer("viewof simpleBar")).define("viewof simpleBar", ["vl","ausFullDataRaw"], function(vl,ausFullDataRaw){return(
vl.markBar() // Make a bar chart
  .data(ausFullDataRaw)               // Using the Autralian data
  .encode(
    vl.x().fieldT("date").timeUnit ("datemonthyear").title('Date'),
    vl.y().fieldQ("newC").title("New Case(s)"),// Frequency on the y-axis
    vl.tooltip([
      {type: "temporal", field: "date", timeUnit: "datemonthyear" ,title:"Date"},
      {type: "quantitative", field: "newC",title:"New Case(s)"}
    ]), // show the Field Names in a tooltip
  )
  .title(`Covid-19 Confirmed New Cases by Day in Malaysia`)
  .background('white')
  .width(800)    // use the full default chart width
  .render()
)});
  
  main.define("ausFullDataRaw", ["d3","dateParse"], function(d3,dateParse){return(
d3.csv("Covid19Malaysia2020Datasets.csv", function(d) {
  return {
    date: dateParse(d.Date),
 
   
    newC:  +d.new_case,  
  };
})
)});
 
  main.variable().define("dateParse", ["d3"], function(d3){return(
d3.timeParse("%d/%m/%Y")
)});
  
  main.variable().define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("date", child1);
  const child2 = runtime.module(define2);
  main.import("vl", child2);
  const child3 = runtime.module(define3);
  main.import("form", child3);
  const child4 = runtime.module(define1);
  main.import("radio", child4);
 
  return main;
}
