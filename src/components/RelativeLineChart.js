import * as React from "react";
import * as d3 from "d3";
// import DataService from "../services/DataService";
import data from '../res/data/data.csv'

export default class RelativeLineChart extends React.Component {

  constructor(params) {
    super(params);

    let maxYear = d3.max(this.props.data, d => d.year);
    let minYear = d3.min(this.props.data, d => d.year);

    this.state = {
      activeYear: maxYear,
      min: minYear,
      max: maxYear
    };
    this.margin = {top: 20, right: 60, bottom: 60, left: 100};
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  /**
   * Based on https://bl.ocks.org/mbostock/3887051
   */
  drawChart() {
    // this.colorScale = d3.scaleOrdinal()
    //   .range(['#c2eedc', '#7fd1af', '#1cb373', '#168c5a',
    //     '#66bbff', '#1e8cd3',
    //     '#ebb0dd', '#d674c0']);

    const {width, height, margin} = this;

    d3.csv(data, d3.autoType).then(data => {

      const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right])

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top])

      const line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value))

      const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

      const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
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

      mainGroup.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", (d) => {
          return line(d)
        });
    })


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