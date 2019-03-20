import * as React from "react";
import * as d3 from "d3";

export default class FarmsCountChart extends React.Component {

  /**
   * Based on https://observablehq.com/@tmcw/stacked-area-chart
   */
  drawChart() {
    d3.csv("https://gist.githubusercontent.com/clhenrick/60b8de7fe07c0c6122cff4979feef1fe/raw/5f30c13b504b443bd4c027add21e79fbf1d8fa8d/pivot.csv",
      d => ({
        year: +d.year,
        'african american': +d['African American'],
        asian: +d.Asian,
        latino: +d['Latino'],
        white: +d['White']
      })).then(data => {

      const width = 975;
      const height = 400;
      const margin = {
        top: 10,
        bottom: 60,
        left: 65,
        right: 10
      };
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;

      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

      const keys = Object.keys(data[0]).slice(1);

      const stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderDescending); // so that the largest grouping is stacked below the others

      const series = stack(data);

      const yScale = d3.scaleLinear()
        .domain([
          d3.min(series, series => d3.min(series, d => d[0])),
          d3.max(series, series => d3.max(series, d => d[1]))
        ])
        .range([innerHeight, 0]);

      const colorScale = d3.scaleOrdinal(d3.schemePastel2);

      const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10)
        .tickFormat(d3.format(''));

      const yAxis = d3.axisLeft()
        .scale(yScale)
        .tickValues([0, 0.25, 0.5, 0.75, 1])
        .tickFormat(d3.format(',.0%'));


      const svg = d3.select('.FarmsCountChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const g = svg.append('g')
        .attr('class', 'main')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // x axis
      g.append('g')
        .attr('class', 'axis x')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);

      // x axis label
      d3.select('g.axis.x')
        .append('text')
        .attr('class', 'label')
        .attr('x', innerWidth / 2)
        .attr('y', 35)
        .text('Year')
        .style('text-anchor', 'middle');

      // generate y axis
      g.append('g')
        .attr('class', 'axis y')
        .call(yAxis);

      // y axis label
      d3.select('.y.axis').append('text')
        .attr('class', 'label')
        .attr('x', -innerHeight / 2)
        .attr('y', -50)
        .attr('transform', `rotate(-90 0 0)`)
        .text('Ethnicity')
        .style('text-anchor', 'middle');

      // define an area path generator
      const area = d3.area()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]));

      // create the stacked area paths
      g.selectAll('.area')
        .data(series)
        .enter().append('path')
        .attr('class', 'area')
        .attr('fill', d => colorScale(d.key))
        .attr('d', area);
    })
  }

  componentDidMount() {
    this.drawChart()
  }

  render() {
    return <div className='FarmsCountChart'/>
  }
}