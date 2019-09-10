// Creates margins for image
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from the CSV file
d3.csv("data/data.csv", function (error, healthData) {
    if (error) throw error;

    // Format the data
    healthData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.evening = +data.healthcare;
    });
    // Create the scales for the chart
    var xScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.poverty))
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.healthcare))
        .range([height, 0]);

    // Create the axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);

