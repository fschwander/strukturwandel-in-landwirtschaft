import * as React from "react";
import * as d3 from "d3";

export default class FarmSizeRelationsChart extends React.Component {

  constructor(params) {
    super(params);

    this.state = {
      data: this.props.data
    }
  }

  drawChart() {
    const {data} = this.state;

    // define svn size and margin.
    const canvHeight = 600, canvWidth = 800;
    const margin = { top: 50, right: 20, bottom: 40, left: 80 };

    // compute the width and height of the actual chart area.
    const width = canvWidth - margin.left - margin.right;
    const height = canvHeight - margin.top - margin.bottom;

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.minYearData)])
      .rangeRound([height, 0]);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .rangeRound([0, width])
      .padding(0.1);

    const svg = d3.select(".FarmSizeRelationsChart").append("svg")
      .attr("width", canvWidth)
      .attr("height", canvHeight);

    const g = svg.append('g')
      .attr('id', 'chart-area-box')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'x-axis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('class', 'title')
      .text('Anzahl Bauernhöfe')
      .attr('transform', `translate(-50,${height/2}) rotate(-90)`)

    g.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.minYearData))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.minYearData));
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div className='FarmSizeRelationsChart'/>
  }
}