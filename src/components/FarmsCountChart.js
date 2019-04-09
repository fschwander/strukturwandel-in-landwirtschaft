import * as React from 'react';
import * as d3 from 'd3';
import data from '../res/data/farm-sizes.csv'

export default class FarmsCountChart extends React.Component {

  constructor(params) {
    super(params)

    this.width = 900;
    this.height = 500;
    this.margin = {
      top: 20,
      bottom: 60,
      left: 80,
      right: 10
    };
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.labelMap = {
      year: 'Jahr',
      total_farms_count: 'Total Anz. Farmen',
      area_valley_in_percent: 'Talgebiet in %',
      area_mountain_in_percent: 'Berggebiet in %',
      area_size_0_1: '< 1 ha',
      area_size_1_3: '1 bis 3 ha',
      area_size_3_5: '3 bis 5 ha',
      area_size_5_10: '5 bis 10 ha',
      area_size_10_20: '10 bis 20 ha',
      area_size_20_30: '20 bis 30 ha',
      area_size_30_50: '30 bis 50 ha',
      area_size_50_n: '> 50 ha'
    };
  }

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

      const { innerWidth, innerHeight, width, height, margin } = this;

      const keys = Object.keys(data[0]).filter(d =>
        d === 'area_size_0_1' ||
        d === 'area_size_1_3' ||
        d === 'area_size_3_5' ||
        d === 'area_size_5_10' ||
        d === 'area_size_10_20' ||
        d === 'area_size_20_30' ||
        d === 'area_size_30_50' ||
        d === 'area_size_50_n');

      const stack = d3.stack().keys(keys);
      const series = stack(data);
      const colorScale = d3.scaleOrdinal(d3.schemePastel2);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(series, series => d3.max(series, d => d[1]))])
        .range([innerHeight, 0]);

      const area = d3.area()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]));

      this.svg = d3.select('.chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const g = this.svg.append('g')
        .attr('class', 'main')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // create the stacked area paths
      g.selectAll('.area')
        .data(series)
        .enter().append('path')
        .attr('class', 'area')
        .attr('fill', d => colorScale(d.key))
        .attr('d', area);

      this.initAxes(g, xScale, yScale)
      this.initLegend(keys, colorScale)
    })
  }

  initAxes(g, xScale, yScale) {
    const { innerWidth, innerHeight } = this;

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(10)
      .tickFormat(d3.format(''));

    const yAxis = d3.axisLeft()
      .scale(yScale);

    // x axis
    g.append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    // x axis label
    d3.select('g.axis.x')
      .append('text')
      .attr('class', 'header')
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
      .attr('class', 'header')
      .attr('x', -innerHeight / 2)
      .attr('y', -60)
      .attr('transform', 'rotate(-90)')
      .text('Bauernhöfe')
      .style('text-anchor', 'middle');
  }

  initLegend(keys, colorScale) {
    const legendWidth = 100;
    const lineHeight = 25;

    const legend = d3.select('.legend').append('svg')
      .attr('width', legendWidth)
      .attr('height', keys.length * lineHeight);

    const legendEntry = legend.selectAll('rect')
      .data(keys.reverse())
      .enter();

    legendEntry.append('rect')
      .attr('x', 2)
      .attr('y', (d, i) => lineHeight * i + (lineHeight - 12) / 2)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => colorScale(d))
      .attr('stroke', 'black')
      .attr('stroke-width', '1');

    legendEntry.append('text')
      .attr('x', 20)
      .attr('y', (d, i) => lineHeight * i + lineHeight / 1.6)
      .text(d => this.labelMap[d]);
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return <div className='FarmsCountChart'>
      <div className='chart'/>
      <div className='legend'/>
    </div>

  }
}