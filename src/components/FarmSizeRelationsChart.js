import * as React from "react";
import * as d3 from "d3";

export default class FarmSizeRelationsChart extends React.Component {

  constructor(params) {
    super(params);

    this.state = {
      data: this.props.data
    }
  }

  drawChart() {
    const {data} = this.state;
    //
    // const canvHeight = 600, canvWidth = 800;
    // const margin = {top: 50, right: 20, bottom: 40, left: 80};
    //
    // const width = canvWidth - margin.left - margin.right;
    // const height = canvHeight - margin.top - margin.bottom;
    //
    // const y = d3.scaleLinear()
    //   .domain([0, d3.max(data, d => d.minYearData)])
    //   .rangeRound([height, 0]);
    //
    // const x = d3.scaleBand()
    //   .domain(data.map(d => d.label))
    //   .rangeRound([0, width])
    //   .padding(0.1);
    //
    // const svg = d3.select(".FarmSizeRelationsChart").append("svg")
    //   .attr("width", canvWidth)
    //   .attr("height", canvHeight);
    //
    // const g = svg.append('g')
    //   .attr('id', 'chart-area-box')
    //   .attr('transform', `translate(${margin.left},${margin.top})`);
    //
    // g.append('g')
    //   .attr('class', 'x-axis')
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(d3.axisBottom(x));
    //
    // g.append('g')
    //   .attr('class', 'y-axis')
    //   .call(d3.axisLeft(y).ticks(10))
    //   .append('text')
    //   .attr('class', 'title')
    //   .text('Anzahl Bauernhöfe')
    //   .attr('transform', `translate(-50,${height / 2}) rotate(-90)`)
    //
    // const barsGroup = g.selectAll('rect')
    //   .attr('class', 'bar-container')
    //   .data(data)
    //   .enter();
    //
    // barsGroup.append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', d => x(d.label))
    //   .attr('y', d => y(d.minYearData))
    //   .attr('width', x.bandwidth() / 2)
    //   .attr('height', d => height - y(d.minYearData));
    //
    // barsGroup.append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', d => x(d.label) + x.bandwidth() / 2)
    //   .attr('y', d => y(d.maxYearData))
    //   .attr('width', x.bandwidth() / 2)
    //   .attr('height', d => height - y(d.maxYearData));


    // Source: https://bl.ocks.org/mbostock/3887051


    const oldData = [
      data.map(d => d.minYearData),
      data.map(d => d.maxYearData)
    ];

    const nofCategories = oldData[0].length, // number of samples
      nofGroups = oldData.length; // number of series

    const margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(oldData, oldData => d3.max(oldData))])
      .range([height, 0]);

    const scaleX = d3.scaleBand()
      .domain(d3.range(nofCategories))
      .range([0, width], .3);

    const scaleWidth = d3.scaleBand()
      .domain(d3.range(nofGroups))
      .range([0, scaleX.bandwidth() - 10]);

    const z = d3.scaleOrdinal()
      .range(["#8a89a6", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const svg = d3.select(".FarmSizeRelationsChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").selectAll("g")
      .data(oldData)
      .enter().append("g")
      .style("fill", (d, i) => z(i))
      .attr("transform", (d, i) => "translate(" + scaleWidth(i) + ",0)")
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("width", scaleWidth.bandwidth())
      .attr("height", d => height - scaleY(d))
      .attr("x", (d, i) => scaleX(i))
      .attr("y", d => scaleY(d));
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div className='FarmSizeRelationsChart'/>
  }
}