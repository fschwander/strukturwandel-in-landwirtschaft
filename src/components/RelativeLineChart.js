import * as React from "react";
import * as d3 from "d3";

/**
 * Based on https://codepen.io/zakariachowdhury/pen/JEmjwq
 */
export default class RelativeLineChart extends React.Component {

  constructor(params) {
    super(params);

    this.margin = {top: 20, right: 100, bottom: 60, left: 100};
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  drawChart() {
    const {data, labelMap} = this.props;
    const metaData = data.pop();

    const colorScale = d3.scaleOrdinal()
      .range(['#c2eedc', '#7fd1af', '#1cb373', '#168c5a',
        '#66bbff', '#1e8cd3',
        '#ebb0dd', '#d674c0']);

    const {width, height, margin} = this;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data[7].values, d => d.year))
      .range([0, width]);

    const yScale = d3.scaleLog()
      .domain([Math.round(metaData.ratio.min * 10) / 10, Math.round(metaData.ratio.max * 10) / 10])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale)
      .tickValues([1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4])
      // .tickFormat(d => d3.format(".0%")(d));
      .tickFormat(d => d3.format(".2")(d));

    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.ratio));

    // init svg

    const svg = d3.select('.RelativeLineChart')
      .select(".chartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // draw lines

    const lineOpacity = "1";
    const otherLinesOpacityHover = "0.2";

    mainGroup.selectAll('.line-group')
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .on("mouseover", function (d, i) {
        const mouse = d3.mouse(this);
        const text = svg.append('g')
          .attr("class", "hover-label")
          .attr('transform', `translate(${margin.left + mouse[0] - 20},${margin.top + mouse[1] - 20})`)
        text.append("text")
          .attr("text-anchor", "end")
        text.append('text')
          .style("fill", colorScale(i))
          .attr('font-weight', 500)
          .attr("text-anchor", "end")
          .attr('dx', 0)
          .text(() => labelMap[d.name])
        text.append('text')
          .attr("text-anchor", "end")
          .attr('dx', 0)
          .attr('dy', 16)
          .text(d3.format("+.0%")(yScale.invert(mouse[1])))

      })
      .on("mouseout", () => svg.select(".hover-label").remove())
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => colorScale(i))
      .style('stroke-width', '2.5')
      .style('fill', 'none')
      .style('opacity', lineOpacity)
      .on("mouseover", function () {
        mainGroup.selectAll('.line')
          .style('opacity', otherLinesOpacityHover);
        d3.select(this)
          .style('opacity', lineOpacity)
          .style("cursor", "pointer");
      })
      .on("mouseout", function () {
        mainGroup.selectAll(".line")
          .style('opacity', lineOpacity);
        d3.select(this)
          .style("cursor", "none");
      });

    // draw axis

    const axisGroup = mainGroup.append('g').attr('class', 'axis-group');

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