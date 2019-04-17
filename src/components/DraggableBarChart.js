import * as React from 'react';
import * as d3 from 'd3';

export default class DraggableBarChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: props.showAnswer
    };
    this.maxScaleValue = Math.round(d3.max(this.props.quizData, d => d.answerInPct)) * 1.2;
  }

  /**
   * Based on https://bl.ocks.org/AlainRo/9264cd08e341f2c92f020c39642c34d1
   */
  drawChart() {
    const {quizData} = this.props;

    let barsGap = 22;
    let chartWidth = 500,
      chartHeight = 300;
    let margin = {
      top: 30,
      right: 30,
      bottom: 0,
      left: 30,
    };

    const scaleX = d3.scaleBand()
      .domain(quizData.map(d => d.answerInPct))
      .rangeRound([0, chartWidth])

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    const x = d3.scaleLinear()
      .domain([0, quizData.length])
      .rangeRound([0, chartWidth]);

    const svg = d3.select('.chart-container')
      .append('svg')
      .attr('width', chartWidth + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom);

    const brushY = d3.brushY()
      .extent((d, i) => [[x(i) + barsGap / 2, 0], [x(i) + x(1) - barsGap / 2, chartHeight]])
      .on('brush', brushmove)
      .on('end', brushend);

    svg.append('defs')
      .append('pattern')
      .attr('id', 'dashed-fill')
      .attr('width', '8')
      .attr('height', '8')
      .attr('patternUnits', 'userSpaceOnUse')
      .append('rect')
      .attr('width', '4')
      .attr('height', '8')
      .attr('transform', 'translate(0,0)');

    this.mainGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const barContainer = this.mainGroup.selectAll('.bar')
      .data(quizData)
      .enter()
      .append('g')
      .attr('id', (d, i) => 'bar' + i)
      .attr('class', 'bar')
      .call(brushY)
      .call(brushY.move, d => [d.value, 0].map(scaleY));

    barContainer.append('rect')
      .attr('class', 'handle-bar')
      .attr('width', scaleX.bandwidth() - barsGap)
      .attr('height', 2)
      .attr('y', d => scaleY(d.value))
      .attr('x', (d, i) => x(i) + barsGap/2)
      .attr('fill', 'url(#dashed-fill)');
    drawHandleNorth();

    barContainer.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', d => scaleY(d.value))
      .attr('x', (d, i) => x(i) + x(0.5))
      .attr('dy', -4)
      .style('fill', 'currentColor')
      .text(d => d3.format('.0%')(d.value));

    function brushmove() {
      if (!d3.event.sourceEvent) return;
      if (d3.event.sourceEvent.type === 'brush') return;
      if (!d3.event.selection) return;

      const d0 = d3.event.selection.map(scaleY.invert);
      const d = d3.select(this).select('.selection');

      d0[0] > 0 ? d.datum().value = d0[0] : d.datum().value = 0.01; // Change the value of the original data

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
        .attr('y', d => scaleY(d.value))
        .text(d => d3.format('.0%')(d.value));

      barContainer.selectAll('.handle-bar')
        .attr('y', d => scaleY(d.value))
      drawHandleNorth();
    }

    function drawHandleNorth() {
      barContainer.selectAll('.handle--n')
        .attr('height', 20)
        .attr('dy', -10)
    }
  }

  showAnswer() {
    const {quizData} = this.props;
    let chartHeight = 300;

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    this.mainGroup
      .selectAll('.selection')
      .data(quizData)
      .transition()
      .duration(2000)
      .attr('height', d => chartHeight - scaleY(d.answerInPct))
      .attr('y', d => scaleY(d.answerInPct));

    this.mainGroup
      .selectAll('text')
      .transition()
      .duration(2000)
      .attr('y', d => scaleY(d.answerInPct))
      .text(d => d3.format('.0%')(d.answerInPct));

    this.mainGroup.selectAll('*').attr('pointer-events', 'none')
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    if (this.props.showAnswer) this.showAnswer();
  }

  render() {
    return (
      <div className='DraggableBarChart'>
        <div className='chart-container'/>
      </div>
    )
  }
}