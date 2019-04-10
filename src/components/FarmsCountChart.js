import * as React from 'react';
import * as d3 from 'd3';

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
    const {
      innerWidth, innerHeight, width, height, margin,
      props: {data}
    } = this;

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

    const svg = d3.select('.FarmsCountChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.mainGroup = svg.append('g')
      .attr('class', 'main')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // create the stacked area paths
    this.mainGroup.append('g').attr('class', 'chart')
      .selectAll('.area')
      .data(series)
      .enter().append('path')
      .attr('class', 'area')
      .attr('fill', d => colorScale(d.key))
      .attr('d', area);

    this.initAxes(xScale, yScale)
    this.initLegend(keys, colorScale)
  }

  initAxes(xScale, yScale) {
    const {innerWidth, innerHeight} = this;

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(10)
      .tickFormat(d3.format(''));

    const yAxis = d3.axisLeft()
      .scale(yScale);

    // x axis
    this.mainGroup.append('g')
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
    this.mainGroup.append('g')
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
    const lineHeight = 25;
    const padding = 12;

    const legendWidth = 100 + 2 * padding;
    const legendHeight = keys.length * lineHeight + padding;

    console.log(keys);

    const legend = this.mainGroup.append('g')
      .attr('class', 'legend')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('transform', `translate(${this.innerWidth-legendWidth-padding},${padding})`);

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
      .data(keys.reverse())
      .enter();

    legendEntry.append('rect')
      .attr('y', (d, i) => lineHeight * i)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => colorScale(d));

    legendEntry.append('text')
      .attr('x', 20)
      .attr('y', (d, i) => lineHeight * i + 10)
      .text(d => this.labelMap[d]);
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <div className='FarmsCountChart' />
    )
  }
}