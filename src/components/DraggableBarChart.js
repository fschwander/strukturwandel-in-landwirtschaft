import * as React from 'react';
import * as d3 from 'd3';

export default class DraggableBarChart extends React.Component {

  /**
   * Based on https://bl.ocks.org/AlainRo/9264cd08e341f2c92f020c39642c34d1
   */
  drawChart() {
    const data = [
      {index: 0, value: 3},
      {index: 1, value: 5},
      {index: 2, value: 12}
    ];

    let delim = 4;

    let chartWidth = 250,
      chartHeight = 300;

    const scaleY = d3.scaleLinear()
      .domain([0, 21])
      .rangeRound([chartHeight, 0]);

    const x = d3.scaleLinear()
      .domain([0, data.length])
      .rangeRound([0, chartWidth]);

    const mainGroup = d3.select('.chart-container')
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight);

    const brushY = d3.brushY()
      .extent((d, i) => [[x(i) + delim / 2, 0], [x(i) + x(1) - delim / 2, chartHeight]])
      .on('brush', brushmove)
      .on('end', brushend);

    const barContainer = mainGroup.selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('id', (d, i) => 'bar' + i)
      .attr('class', 'bar')
      .call(brushY)
      .call(brushY.move, d => [d.value, 0].map(scaleY));

    barContainer.append('text')
      .attr('y', d => scaleY(d.value) + 25)
      .attr('x', (d, i) => x(i) + x(0.5))
      .attr('dx', '-.6em')
      .attr('dy', -5)
      .style('fill', 'currentColor')
      .text(d => d3.format('.2')(d.value));

    function brushmove() {
      if (!d3.event.sourceEvent) return;
      if (d3.event.sourceEvent.type === 'brush') return;
      if (!d3.event.selection) return;

      const d0 = d3.event.selection.map(scaleY.invert);
      const d = d3.select(this).select('.selection');

      d0[0] > 0 ? d.datum().value = d0[0] : d.datum().value = 1; // Change the value of the original data

      update();
    }

    function brushend() {
      if (!d3.event.sourceEvent) return;
      if (d3.event.sourceEvent.type === 'brush') return;
      if (!d3.event.selection) { // just in case of click with no move
        barContainer.call(brushY.move, d => [d.value, 0].map(scaleY))
      }
    }

    function update() {
      barContainer
        .call(brushY.move, d => [d.value, 0].map(scaleY))
        .selectAll('text')
        .attr('y', d => scaleY(d.value) + 25)
        .text(d => d3.format('.2')(d.value));
    }
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return (
      <div className='DraggableBarChart'>
        <div className='chart-container'/>
      </div>
    )
  }
}