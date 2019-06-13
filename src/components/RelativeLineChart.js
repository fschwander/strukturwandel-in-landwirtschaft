import * as React from "react";
import * as d3 from "d3";

/**
 * Based on https://codepen.io/zakariachowdhury/pen/JEmjwq
 */
export default class RelativeLineChart extends React.Component {

  constructor(params) {
    super(params);

    this.margin = {top: 20, right: 60, bottom: 60, left: 100};
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  /**
   * Based on https://bl.ocks.org/mbostock/3887051
   */
  drawChart() {
    const {data} = this.props;

    this.colorScale = d3.scaleOrdinal()
      .range(['#c2eedc', '#7fd1af', '#1cb373', '#168c5a',
        '#66bbff', '#1e8cd3',
        '#ebb0dd', '#d674c0']);

    const {width, height, margin} = this;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data[7].values, d => d.year))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([-1, 3.6])
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.ratio));

    // init svg

    this.svg = d3.select('.RelativeLineChart')
      .select(".chartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = this.svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // draw lines

    mainGroup.selectAll('.line-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'line-group')
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d, i) => this.colorScale(i))
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", d => line(d.values))

    const xAxis = d3.axisBottom(xScale)
      .ticks(width / 80)
      .tickSizeOuter(0)
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format("+.0%"))

    // draw axis

    const axisGroup = mainGroup.append('g').attr('class', 'axis-group')

    axisGroup.append("g")
      .attr('class', 'x-axis')
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('class', 'header')
      .attr('x', width / 2)
      .attr('y', 50)
      .text('Jahr')
      .style('text-anchor', 'middle');

    axisGroup.append("g")
      .attr('class', 'y-axis')
      .call(yAxis)
      .append('text')
      .attr('class', 'header')
      .attr('x', -height / 2)
      .attr('y', -70)
      .attr('transform', 'rotate(-90)')
      .text('Prozentuale Entwicklung')
      .attr('text-anchor', 'middle');
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div className='RelativeLineChart'>
      <h2>Relative Entwicklung der Bauernhöfe</h2>
      <div className='chartContainer'/>
    </div>
  }
}