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
    this.height = 400 - this.margin.top - this.margin.bottom;
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

    /* Scale */
    const xScale = d3.scaleTime()
      .domain(d3.extent(data[7].values, d => d.year))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([-1, 3.5])
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.ratio));

    const xAxis = g => g
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0))

    const yAxis = g => g
      .call(d3.axisLeft(yScale))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

    this.svg = d3.select('.RelativeLineChart')
      .select(".chartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = this.svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    mainGroup.append("g").call(xAxis);
    mainGroup.append("g").call(yAxis);

    mainGroup.selectAll('.line-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'line-group')
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d,i) => this.colorScale(i))
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", d => line(d.values));
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div className='RelativeLineChart'>
      <h2>Anzahl Bauernhöfe im Vergleich</h2>
      <div className='chartContainer'/>
    </div>
  }
}