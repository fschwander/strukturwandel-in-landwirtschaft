import * as React from 'react';
import * as d3 from 'd3';

export default class DraggableBarChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: props.showAnswer
    };
    this.chartWidth = 500;
    this.chartHeight = 300;

    this.maxScaleValue = Math.round(d3.max(this.props.data, d => d.maxInPct)) * 1.2;
    this.durations = {
      anim1: 1000,
      anim2: 1500,
      anim3: 2000,
      animSum: 4500
    }
  }

  /**
   * Based on https://bl.ocks.org/AlainRo/9264cd08e341f2c92f020c39642c34d1
   */
  drawChart() {
    const {data} = this.props;
    const {chartHeight, chartWidth} = this;

    let barsGap = 22;

    let margin = {
      top: 20,
      right: 30,
      bottom: 50,
      left: 50,
    };

    const scaleX = d3.scaleBand()
      .domain(data.map(d => d.label))
      .rangeRound([0, chartWidth]);

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    const x = d3.scaleLinear()
      .domain([0, data.length])
      .rangeRound([0, chartWidth]);

    const colorScale = d3.scaleOrdinal()
      .range(['#4ec291', '#42a3f1', '#e396d1']);

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
      .attr('width', 8)
      .attr('height', 8)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('rect')
      .attr('width', 4)
      .attr('height', 8)
      .attr('transform', 'translate(0,0)');

    this.mainGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const barContainer = this.mainGroup.selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('id', (d, i) => 'bar' + i)
      .attr('class', 'bar')
      .call(brushY)
      .call(brushY.move, d => [d.value, 0].map(scaleY));

    this.mainGroup.selectAll('.selection')
      .data(data)
      .attr('fill', (d, i) => colorScale(i))
      .attr('fill-opacity', 1)
      .attr('height', d => chartHeight - scaleY(d.value))
      .attr('y', d => scaleY(d.value));

    barContainer.append('rect')
      .attr('class', 'handle-bar')
      .attr('width', scaleX.bandwidth() - barsGap)
      .attr('height', 2)
      .attr('y', d => scaleY(d.value))
      .attr('x', (d, i) => x(i) + barsGap / 2)
      .attr('fill', 'url(#dashed-fill)');

    barContainer.append('text')
      .attr('text-anchor', 'middle')
      .attr('class', 'label-top')
      .attr('y', d => scaleY(d.value))
      .attr('x', (d, i) => x(i) + x(0.5))
      .attr('dy', -4)
      .style('fill', 'currentColor')
      .text(d => d3.format('.0%')(d.value));

    barContainer.append('text')
      .attr('text-anchor', 'middle')
      .attr('class', 'x-axis')
      .attr('y', chartHeight)
      .attr('x', (d, i) => x(i) + x(0.5))
      .attr('dy', 22)
      .attr('fill', 'currentColor')
      .text((d, i) => data[i].label);

    const textLeft = barContainer.append('text')
      .attr('class', 'label-answer-left header-small')
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(6,-2)')
      .attr('y', d => scaleY(d.value))
      .attr('x', (d, i) => x(i))
      .attr('fill', 'currentColor');

    textLeft.append('tspan')
      .attr('x', (d, i) => x(i))
      .text("deine");
    textLeft.append('tspan')
      .attr('x', (d, i) => x(i))
      .attr('dy', 12)
      .text("Antwort");

    this.initExplanationContainer();
    drawHandleNorth();

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
        .selectAll('.label-top, .label-answer-left, .handle-bar')
        .attr('y', d => scaleY(d.value));
      barContainer.selectAll('.label-top')
        .text(d => d3.format('.0%')(d.value));

      drawHandleNorth();
    }

    function drawHandleNorth() {
      barContainer.selectAll('.handle--n')
        .attr('height', 30);
    }
  }

  initExplanationContainer() {
    const {chartWidth, chartHeight} = this;

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    const explanationContainer = this.mainGroup.append('g')
      .attr('class', 'explanation-container')
      .attr('opacity', 1)
      .data(this.props.data)
      .attr('transform', d => `translate(140, ${scaleY(d.value) - 92})`)
      .attr('dx', chartWidth / 2)
      .attr('pointer-events', 'none')

    explanationContainer.append('rect')
      .attr('width', 334)
      .attr('height', 60)
      .attr('fill', '#ebebe5');

    const textContainer = explanationContainer.append('text')
      .attr('x', 8)
      .attr('y', 24)
      .attr('fill', 'black');
    textContainer.append('tspan')
      .text('Schätze, wie sich die Anzahl der Bauernhöfe');
    textContainer.append('tspan')
      .text('relativ zum Jahr 1985 verändert hat!')
      .attr('dy', 26)
      .attr('x', 8);
  }

  animateExplanationLabel() {
    const {mainGroup, chartHeight, durations} = this;

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    const explanationContainer = mainGroup.selectAll('.explanation-container');

    explanationContainer.transition()
      .duration(durations.anim1)
      .attr('transform', d => `translate(140, ${scaleY(d.random1) - 92})`)
      .transition()
      .duration(durations.anim2)
      .attr('transform', d => `translate(140, ${scaleY(d.random2) - 92})`)
      .transition()
      .duration(durations.anim3)
      .attr('transform', d => `translate(140, ${scaleY(d.value) - 92})`)
      .transition()
      .delay(200)
      .duration(1500)
      .attr('transform', 'translate(-38,-10)');

    explanationContainer.select('rect')
      .transition()
      .attr('fill', '#ebebe5')
      .transition()
      .delay(durations.animSum)
      .duration(1500)
      .attr('fill', 'transparent');

    const arrow = explanationContainer.append('polygon')
      .attr('points', '0,15 20,30 18,20 45,22 43,15 45,8 18,10 20,0')
      .attr('transform', 'translate(-27,86) rotate(-60)')
      .attr('fill', 'white')
      .attr('stroke', '#222')
      .attr('stroke-width', 1);

    arrow.transition()
      .delay(durations.animSum + 300)
      .duration(300)
      .attr('opacity', 0)
  }

  animateBars() {
    const {mainGroup, chartHeight, durations} = this;

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    mainGroup.selectAll('.selection')
      .transition()
      .duration(durations.anim1)
      .attr('height', d => chartHeight - scaleY(d.random1))
      .attr('y', d => scaleY(d.random1))
      .transition()
      .duration(durations.anim2)
      .attr('height', d => chartHeight - scaleY(d.random2))
      .attr('y', d => scaleY(d.random2))
      .transition()
      .duration(durations.anim3)
      .attr('height', d => chartHeight - scaleY(d.value))
      .attr('y', d => scaleY(d.value))

    mainGroup.selectAll('.label-top')
      .transition()
      .duration(durations.anim1)
      .attr('y', d => scaleY(d.random1))
      .on("start", function () {
        d3.active(this)
          .tween("text", d => {
            const that = d3.select(this);
            const i = d3.interpolateNumber(that.text().replace(/%/g, "") / 100, d.random1);
            return t => that.text(d3.format('.0%')(i(t)));
          })
      })
      .transition()
      .duration(durations.anim2)
      .attr('y', d => scaleY(d.random2))
      .on("start", function () {
        d3.active(this)
          .tween("text", d => {
            const that = d3.select(this);
            const i = d3.interpolateNumber(that.text().replace(/%/g, "") / 100, d.random2);
            return t => that.text(d3.format('.0%')(i(t)));
          })
      })
      .transition()
      .duration(durations.anim3)
      .attr('y', d => scaleY(d.value))
      .on("start", function () {
        d3.active(this)
          .tween("text", d => {
            const that = d3.select(this);
            const i = d3.interpolateNumber(that.text().replace(/%/g, "") / 100, d.value);
            return t => that.text(d3.format('.0%')(i(t)));
          })
      });

    this.mainGroup.selectAll('.label-answer-left')
      .classed('on-hover-only', false)
      .transition()
      .attr('opacity', 1)
      .duration(durations.anim1)
      .attr('y', d => scaleY(d.random1))
      .transition()
      .duration(durations.anim2)
      .attr('y', d => scaleY(d.random2))
      .transition()
      .duration(durations.anim3)
      .attr('y', d => scaleY(d.value))
      .attr('opacity', 0)

    this.mainGroup.selectAll('.handle-bar')
      .classed('on-hover-only', false)
      .transition()
      .attr('opacity', 1)
      .duration(durations.anim1)
      .attr('y', d => scaleY(d.random1))
      .transition()
      .duration(durations.anim2)
      .attr('y', d => scaleY(d.random2))
      .transition()
      .duration(durations.anim3)
      .attr('y', d => scaleY(d.value))
      .attr('opacity', 0)

    setTimeout(() => {
      this.mainGroup.selectAll('.handle-bar, .label-answer-left')
        .classed('on-hover-only', true)
    }, durations.animSum)
  }

  showAnswer() {
    const {data} = this.props;
    let chartHeight = 300;

    const scaleY = d3.scaleLinear()
      .domain([0, this.maxScaleValue])
      .rangeRound([chartHeight, 0]);

    this.mainGroup.selectAll('.selection')
      .data(data)
      .transition()
      .duration(2000)
      .attr('height', d => chartHeight - scaleY(d.maxInPct))
      .attr('y', d => scaleY(d.maxInPct));

    this.mainGroup.selectAll('.label-top')
      .transition()
      .duration(2000)
      .attr('y', d => scaleY(d.maxInPct))
      .on("start", function () {
        d3.active(this)
          .tween("text", d => {
            const that = d3.select(this);
            const i = d3.interpolateNumber(that.text().replace(/%/g, "") / 100, d.maxInPct);
            return t => that.text(d3.format('.0%')(i(t)));
          })
      });

    const textLeft = this.mainGroup.selectAll('.label-answer-left, .handle-bar')
      .classed('header-small', false)
      .classed('on-hover-only', false)
      .attr('opacity', 1);

    textLeft.selectAll('tspan').remove();
    textLeft.append('tspan')
      .attr('dy', 8)
      .text(d => d3.format('.0%')(d.value));

    this.mainGroup.selectAll('*').attr('pointer-events', 'none')
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    const showAnswer = this.props.showAnswer;
    const isAnimating = this.props.isAnimating;

    if (showAnswer) this.showAnswer();
    if (!showAnswer && isAnimating) {
      this.animateBars();
      this.animateExplanationLabel();
    }
  }

  render() {
    return (
      <div className='DraggableBarChart'>
        <div className='chart-container'/>
      </div>
    )
  }
}