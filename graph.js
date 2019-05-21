const margin = {top: 40, right: 20, bottom: 50, left: 100};
const graphWidth = 800 - margin.left - margin.right;
const graphHeight = 400 - margin.top - margin.bottom;

const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', graphWidth + margin.left + margin.right)
    .attr('height', graphHeight + margin.top + margin.bottom);

const graph = svg.append('g') // create a group for the graph
    .attr('width', graphWidth)
    .attr('heigth', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// scales
const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);

// axes groups
const xAxisGroup = graph.append('g')
    .attr('class', 'x-axis')
    .attr('transform', "translate(0, " + graphHeight + ")");

const yAxisGroup = graph.append('g')
    .attr('class', 'y-axis');

// get data from the activities collection
var data = [];

// d3 line path generator
const lineL1 = d3.line()
    .x(d => {return x(new Date(d.date))})
    .y(d => {return y(d.L1)});

const lineL2 = d3.line()
    .x(d => {return x(new Date(d.date))})
    .y(d => {return y(d.L2)});

const lineL3 = d3.line()
    .x(d => {return x(new Date(d.date))})
    .y(d => {return y(d.L3)});

const lineAverage = d3.line()
    .x(d => {return x(new Date(d.date))})
    .y(d => {return y(d.Average)});
    
// line path element
const pathL1 = graph.append('path');
const pathL2 = graph.append('path');
const pathL3 = graph.append('path');
const pathAverage = graph.append('path');

const update = (data) => {

    // sort data on date
    data.sort((a,b) => new Date(a.data) - new Date(b.date)); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    // set scale domains
    x.domain(d3.extent(data, d => new Date(d.date))); // extent reads all values and creates a range from smallest to largest (needs to be confirmed)
    y.domain([d3.min(data, d => {return Math.min( d.L1, d.L2, d.L3); }), d3.max(data, d => {return Math.max( d.L1, d.L2, d.L3);})]);

    // updte path data
    pathL1.data([data]) //passing data as an array. This is important!!!!
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke.width', 2)
        .attr('d', lineL1);
    
    pathL2.data([data]) //passing data as an array. This is important!!!!
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke.width', 2)
        .attr('d', lineL2);
    
    pathL3.data([data]) //passing data as an array. This is important!!!!
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke.width', 2)
        .attr('d', lineL3);
    
    pathAverage.data([data]) //passing data as an array. This is important!!!!
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke.width', 2)
        .attr('d', lineAverage);

    // create axis
    const xAxis = d3.axisBottom(x)
        // .ticks(15)
        .tickFormat(d3.timeFormat('%H:%M:%S'));

    const yAxis = d3.axisLeft(y)
        .ticks(6)
        .tickFormat(d => d + ' v');

    // rotate axis text
    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end');

    // call axis
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
}

eventify(tensions, function(updatedArr) {
    data = updatedArr;
    update(data);
  });
