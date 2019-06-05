import * as React from 'react';
import * as d3 from 'd3';
import DataService from "../services/DataService";

export default class FarmsCountStackedAreaChart extends React.Component {

  constructor(params) {
    super(params);

    this.width = 780;
    this.height = 500;
    this.margin = {
      top: 10,
      bottom: 60,
      left: 90,
      right: 70
    };
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.labelMap = DataService.getLabelMap();
  }

  /**
   * Based on https://observablehq.com/@tmcw/stacked-area-chart
   */
  init() {
    const {innerWidth, innerHeight, width, height, margin} = this;
    const {data} = this.props;

    const keys = DataService.getFilteredFarmsKeys(data);
    const stack = d3.stack().keys(keys);
    const series = stack(data);
    const colorScale = d3.scaleOrdinal()
      .range(['#c2eedc', '#7fd1af', '#1cb373', '#168c5a',
        '#66bbff', '#1e8cd3',
        '#ebb0dd', '#d674c0']);

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

    const svg = d3.select('.FarmsCountStackedAreaChart')
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
      .attr('y', 50)
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
      .attr('y', -70)
      .attr('transform', 'rotate(-90)')
      .text('Anz. Bauernhöfe')
      .attr('text-anchor', 'middle');
  }

  initLegend(keys, colorScale) {
    const lineHeight = 22;
    const padding = 8;

    const legendWidth = 100 + 2 * padding;
    const legendHeight = keys.length * lineHeight + padding;

    const legend = this.mainGroup.append('g')
      .attr('class', 'legend')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('transform', `translate(${this.innerWidth - legendWidth -12},${padding - 18})`);

    legend.append('rect')
      .attr('class', 'background')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'white');

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
      <div className='FarmsCountStackedAreaChart'>
        <h2>Gesamthafte Bauernhofsentwicklung</h2>
      </div>
    )
  }
}