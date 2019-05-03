import * as React from "react";
import * as d3 from "d3";
import DataService from "../services/DataService";

export default class FarmSizeRelationsChart extends React.Component {

  /**
   * Based on https://bl.ocks.org/mbostock/3887051
   */
  drawChart() {
    const {data} = this.props;

    const margin = {top: 50, right: 20, bottom: 40, left: 100};

    const width = 600 - margin.left - margin.right;
    this.innerWidth = width;
    const height = 400 - margin.top - margin.bottom;

    const processedData = [
      this.props.data.map(d => d.minYearData),
      this.props.data.map(d => d.maxYearData)
    ];

    const colorScale = d3.scaleOrdinal()
      .range(["#8a89a6", "#6b486b"]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(processedData, oldData => d3.max(oldData))])
      .range([height, 0]);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .rangeRound([0, width]);

    const scaleWidth = d3.scaleBand()
      .domain(d3.range(processedData.length))
      .range([0, xScale.bandwidth()])
      .paddingInner(0.02)
      .paddingOuter(0.2);

    const svg = d3.select(".FarmSizeRelationsChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.mainGroup = mainGroup;

    mainGroup.append("g").selectAll("g")
      .data(processedData)
      .enter().append("g")
      .style("fill", (d, i) => colorScale(i))
      .attr("transform", (d, i) => "translate(" + scaleWidth(i) + ",0)")
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("width", scaleWidth.bandwidth())
      .attr("height", d => height - yScale(d))
      .attr("x", (d, i) => xScale(data[i].label))
      .attr("y", d => yScale(d));

    mainGroup.append('g')
      .attr('class', 'x-axis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    mainGroup.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('class', 'title')
      .text('Anzahl Bauernhöfe')
      .attr('transform', `translate(-80,${height / 2}) rotate(-90)`)

    this.initLegend(colorScale);
  }

  initLegend(colorScale) {
    const {fullData} = this.props;

    const legendEntries = [fullData[0].year, fullData[fullData.length - 1].year];

    const lineHeight = 30;
    const padding = 18;

    const legendWidth = 70 + 2 * padding;
    const legendHeight = legendEntries.length * lineHeight + padding;

    const legend = this.mainGroup.append('g')
      .attr('class', 'legend')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('transform', `translate(${this.innerWidth - legendWidth - padding},${padding})`);

    legend.append('rect')
      .attr('class', 'background')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'white')
      .attr('stroke', 'currentColor')
      .attr('stroke-width', '1');

    const legendEntry = legend.append('g')
      .attr('class', 'entries')
      .attr('transform', `translate(${padding},${padding})`)
      .selectAll('rect')
      .data(legendEntries)
      .enter();

    legendEntry.append('rect')
      .attr('y', (d, i) => lineHeight * i)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => colorScale(d));

    legendEntry.append('text')
      .attr('x', 20)
      .attr('y', (d, i) => lineHeight * i + 10)
      .text((d, i) => legendEntries[i]);
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div className='FarmSizeRelationsChart'/>
  }
}