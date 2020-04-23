d3.csv("data.csv").then(function (data) {
  var svgWidth = 960;
  var svgHeight = 500;

  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100,
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  console.log(data);
  console.log([data]);

  var svg = d3
    .select("div.chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var xlinearScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.income)])
    .range([width, 0]);

  var ylinearScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.numsmokers)])
    .range([height, 0]);

  var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var bottomAxis = d3.axisBottom(xlinearScale);
  var leftAxis = d3.axisLeft(ylinearScale);
  chartGroup
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(bottomAxis);

  chartGroup.append("g").call(leftAxis);
  console.log(chartGroup);

  data.forEach(function (data) {
    // data.income = +data.income;
    data.numSmokers = +data.smokes;

    console.log(data.income);
  });
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", (d) => d.smokes)
    .attr("cx", (d) => d.income / 120)
    .attr("cy", (d) => d.smokes * 12)
    .text((d) => d.state)
    .attr("color", "white");
});
