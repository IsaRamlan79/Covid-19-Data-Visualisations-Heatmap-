// https://observablehq.com/@jeantimex/how-to-draw-a-basic-line-chart@199
export default function define(runtime, observer) {
    const main = runtime.module();
    const fileAttachments = new Map([["GOOG.csv",new URL("./files/Covid-19Data",import.meta.url)]]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
   
    main.variable().define("d3", ["require"], function(require){return(
  require("d3@5")

  
  
  )});
  main.variable(observer()).define(["md"], function(md){return(
    md` ### Death Case(s) ### `
  
    )});
    
    main.variable().define("width", function(){return(
  960
  )});
    main.variable().define("height", function(){return(
  500
  )});
   
    main.variable().define("margin", function(){return(
  {top: 20, right: 20, bottom: 30, left: 40}
  )});
    
    main.variable().define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
  (d3.csvParse(await FileAttachment("GOOG.csv").text(), d3.autoType)).map(({Date, new_deaths}) => ({date: Date, value: new_deaths}))
  )});
    
    main.variable().define("xScale", ["d3","data","margin","width"], function(d3,data,margin,width){return(
  d3.scaleTime()
      .domain(d3.extent(data, d => d.date)).nice()
      .range([margin.left, width - margin.right])
  )});
    
    main.variable().define("yScale", ["d3","data","height","margin"], function(d3,data,height,margin){return(
  d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)]).nice()
      .range([height - margin.bottom, margin.top])
  )});
   
    main.variable().define("xAxis", ["height","margin","d3","xScale"], function(height,margin,d3,xScale){return(
  (g) => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
  )});
  //   main.variable().define(["md"], function(md){return(md
  
  // )});
    main.variable().define("yAxis", ["margin","d3","yScale"], function(margin,d3,yScale){return(
  (g) => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
  )});
    
    main.variable().define("line", ["d3","xScale","yScale"], function(d3,xScale,yScale){return(
  d3.line()
      .defined(d => !isNaN(d.value))
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
  )});
    
    main.variable(observer()).define(["d3","DOM","width","height","xAxis","yAxis","data","line"], function(d3,DOM,width,height,xAxis,yAxis,data,line)
  {
    // Create an empty SVG with specified width and height.
    const svg = d3.select(DOM.svg(width, height));
    
    // Draw the x and y axes.
    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)
    
    // Draw the line.
    svg.append('path')
        .datum(data)
        .attr('d', line);
    
    return svg.node();
  }
  );
    main.variable(observer()).define(["html"], function(html){return(
  html`
  <style>
  path {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  </style>`
  )});
    
    return main;
  }
  