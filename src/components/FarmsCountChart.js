import * as React from "react";
import * as d3 from "d3";
import data from '../res/data/farm-sizes.csv'

export default class FarmsCountChart extends React.Component {

  /**
   * Based on https://observablehq.com/@tmcw/stacked-area-chart
   */
  init() {
    d3.csv(data,
      d => ({
        year: +d.year,
        total_farms_count: +d.total_farms_count,
        area_valley_in_percent: +d.area_valley_in_percent,
        area_mountain_in_percent: +d.area_mountain_in_percent,
        area_size_0_1: +d.area_size_0_1,
        area_size_1_3: +d.area_size_1_3,
        area_size_3_5: +d.area_size_3_5,
        area_size_5_10: +d.area_size_5_10,
        area_size_10_20: +d.area_size_10_20,
        area_size_20_30: +d.area_size_20_30,
        area_size_30_50: +d.area_size_30_50,
        area_size_50_n: +d.area_size_50_n
      })).then(data => {

      const width = 900;
      const height = 500;
      const margin = {
        top: 20,
        bottom: 60,
        left: 80,
        right: 10
      };
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;

      const keys = Object.keys(data[0]).slice(1);
      const stack = d3.stack().keys(keys);
      const series = stack(data);
      const colorScale = d3.scaleOrdinal(d3.schemePastel2);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(series, series => d3.max(series, d => d[1]))])
        .range([innerHeight, 0]);

      const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10)
        .tickFormat(d3.format(''));

      const yAxis = d3.axisLeft()
        .scale(yScale);

      // define an area path generator
      const area = d3.area()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]));

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
        .attr('y', 40)
        .text('Jahr')
        .style('text-anchor', 'middle');

      // generate y axis
      g.append('g')
        .attr('class', 'axis y')
        .call(yAxis);

      // y axis label
      d3.select('.y.axis')
        .append('text')
        .attr('class', 'label')
        .attr('x', -innerHeight / 2)
        .attr('y', -60)
        .attr('transform', 'rotate(-90)')
        .text('Bauernhöfe')
        .style('text-anchor', 'middle');

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
    this.init()
  }

  render() {
    return <div className='FarmsCountChart'/>
  }
}