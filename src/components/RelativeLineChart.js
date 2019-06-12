import * as React from "react";
import * as d3 from "d3";
// import DataService from "../services/DataService";
// import data from '../res/data/farm-sizes.csv'

/**
 * Based on https://codepen.io/zakariachowdhury/pen/JEmjwq
 */
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

    const data = [
      {
        name: "USA",
        values: [
          {date: "2000", price: "100"},
          {date: "2001", price: "110"},
          {date: "2002", price: "145"},
          {date: "2003", price: "241"},
          {date: "2004", price: "101"},
          {date: "2005", price: "90"},
          {date: "2006", price: "10"},
          {date: "2007", price: "35"},
          {date: "2008", price: "21"},
          {date: "2009", price: "201"}
        ]
      },
      {
        name: "Canada",
        values: [
          {date: "2000", price: "200"},
          {date: "2001", price: "120"},
          {date: "2002", price: "33"},
          {date: "2003", price: "21"},
          {date: "2004", price: "51"},
          {date: "2005", price: "190"},
          {date: "2006", price: "120"},
          {date: "2007", price: "85"},
          {date: "2008", price: "221"},
          {date: "2009", price: "101"}
        ]
      },
      {
        name: "Maxico",
        values: [
          {date: "2000", price: "50"},
          {date: "2001", price: "10"},
          {date: "2002", price: "5"},
          {date: "2003", price: "71"},
          {date: "2004", price: "20"},
          {date: "2005", price: "9"},
          {date: "2006", price: "220"},
          {date: "2007", price: "235"},
          {date: "2008", price: "61"},
          {date: "2009", price: "10"}
        ]
      }
    ];

    /* Format Data */
    const parseDate = d3.timeParse("%Y");

    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
      });
    });

    /* Scale */
    const xScale = d3.scaleTime()
      .domain(d3.extent(data[0].values, d => d.date))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data[0].values, d => d.price)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.price));

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
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
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