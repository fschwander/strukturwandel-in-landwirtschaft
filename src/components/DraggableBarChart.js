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
      anim1: 2000,
      anim2: 1500,
      anim3: 2000,
      animSum: 5500
    }
  }

  formatChangeInPct(value) {
    return d3.format('+.0%')(value - 1)
  }

  tweenFormattedPctValue(d, i, nodes, value) {
    d3.active(nodes[i])
      .tween("text", (d, i, nodes) => {
        const node = d3.select(nodes[i]);
        const interpolate = d3.interpolateNumber(node.text().replace(/%/g, "") / 100, value - 1);
        return t => node.text(d3.format('+.0%')(interpolate(t)))
      })
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
      .text(d => this.formatChangeInPct(d.value));

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

    function brushmove(event) {
      console.log(event);
      if (!event.sourceEvent) return;
      if (event.sourceEvent.type === 'brush') return;
      if (!event.selection) return;

      const d0 = event.selection.map(scaleY.invert);
      const d = d3.select(this).select('.selection');

      d0[0] > 0 ? d.datum().value = d0[0] : d.datum().value = 0.01; // Change the value of the original data

      update();
    }

    function brushend(event) {
      if (!event.sourceEvent) return;
      if (event.sourceEvent.type === 'brush') return;
      if (!event.selection) { // just in case of click with no move
        barContainer.call(brushY.move, d => [d.value, 0].map(scaleY))
      }
    }

    const update = () => {
      barContainer
        .call(brushY.move, d => [d.value, 0].map(scaleY))
        .selectAll('.label-top, .label-answer-left, .handle-bar')
        .attr('y', d => scaleY(d.value));
      barContainer.selectAll('.label-top')
        .text(d => this.formatChangeInPct(d.value));

      drawHandleNorth();
    }

    function drawHandleNorth() {
      barContainer.selectAll('.handle--n')
        .attr('height', 30)
        .on('mousedown', () => {
          barContainer.attr('cursor', 'grabbing');
        })
        .on('mouseup', () => {
          barContainer.attr('cursor', 'grab');
        });
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
      .attr('transform', d => `translate(140, ${scaleY(d.value) - 40})`)
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
      .attr('transform', d => `translate(140, ${scaleY(d.random1) - 40})`)
      .transition()
      .duration(durations.anim2)
      .attr('transform', d => `translate(140, ${scaleY(d.random2) - 40})`)
      .transition()
      .duration(durations.anim3)
      .attr('transform', d => `translate(140, ${scaleY(d.value) - 40})`)
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

    const arrow = explanationContainer.append('g')
      .attr('stroke', 'black')
      .attr('transform', 'translate(300,200) scale(0.8)')

    arrow.append('path')
      .attr('d', "M6.663,24.7598 C6.095,24.0418 5.405,22.5738 4.177,20.7918 C3.481,19.7838 1.755,17.8858 1.241,16.9218 C0.795,16.0698 0.843,15.6878 0.949,14.9818 C1.137,13.7258 2.425,12.7478 3.799,12.8798 C4.837,12.9778 5.717,13.6638 6.509,14.3118 C6.987,14.7018 7.575,15.4598 7.929,15.8878 C8.255,16.2798 8.335,16.4418 8.683,16.9058 C9.143,17.5198 9.287,17.8238 9.111,17.1478 C8.969,16.1558 8.737,14.4618 8.401,12.9638 C8.145,11.8278 8.083,11.6498 7.839,10.7778 C7.581,9.8498 7.449,9.1998 7.207,8.2158 C7.039,7.5198 6.737,6.0978 6.655,5.2978 C6.541,4.2038 6.481,2.4198 7.183,1.5998 C7.733,0.9578 8.995,0.7638 9.777,1.1598 C10.801,1.6778 11.383,3.1658 11.649,3.7598 C12.127,4.8278 12.423,6.0618 12.681,7.6818 C13.009,9.7438 13.613,12.6058 13.633,13.2078 C13.681,12.4698 13.497,10.9158 13.625,10.2078 C13.741,9.5658 14.281,8.8198 14.957,8.6178 C15.529,8.4478 16.199,8.3858 16.789,8.5078 C17.415,8.6358 18.075,9.0838 18.321,9.5058 C19.045,10.7538 19.059,13.3038 19.089,13.1678 C19.261,12.4158 19.231,10.7098 19.657,9.9998 C19.937,9.5318 20.651,9.1098 21.031,9.0418 C21.619,8.9378 22.341,8.9058 22.959,9.0258 C23.457,9.1238 24.131,9.7158 24.313,9.9998 C24.749,10.6878 24.997,12.6338 25.071,13.3158 C25.101,13.5978 25.219,12.5318 25.657,11.8438 C26.469,10.5658 29.343,10.3178 29.453,13.1218 C29.503,14.4298 29.493,14.3698 29.493,15.2498 C29.493,16.2838 29.469,16.9058 29.413,17.6538 C29.351,18.4538 29.179,20.2618 28.929,21.1378 C28.757,21.7398 28.187,23.0938 27.625,23.9058 C27.625,23.9058 25.477,26.4058 25.243,27.5318 C25.007,28.6558 25.085,28.6638 25.039,29.4618 C24.993,30.2578 25.281,31.3058 25.281,31.3058 C25.281,31.3058 23.677,31.5138 22.813,31.3758 C22.031,31.2498 21.063,29.6938 20.813,29.2178 C20.469,28.5618 19.735,28.6878 19.449,29.1718 C18.999,29.9378 18.031,31.3118 17.347,31.3978 C16.011,31.5658 13.239,31.4598 11.069,31.4378 C11.069,31.4378 11.439,29.4158 10.615,28.7218 C10.005,28.2038 8.955,27.1538 8.327,26.6018 L6.663,24.7598 Z")
      .attr('fill', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('stroke', 'black')
    arrow.append('line')
      .attr('x1', 23.1328)
      .attr('y1', 25.4688)
      .attr('x2', 23.1328)
      .attr('y2', 18.5508)
    arrow.append('line')
      .attr('x1', 19.1016)
      .attr('y1', 25.4922)
      .attr('x2', 19.0696)
      .attr('y2', 18.5462)
    arrow.append('line')
      .attr('x1', 15.1094)
      .attr('y1', 18.6094)
      .attr('x2', 15.1514)
      .attr('y2', 25.4614)

    arrow.transition()
      .duration(1000)
      .attr('transform', 'translate(-25,40)')
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
      .on("start", (d, i, nodes) => this.tweenFormattedPctValue(d, i, nodes, d.random1))
      .transition()
      .duration(durations.anim2)
      .attr('y', d => scaleY(d.random2))
      .on("start", (d, i, nodes) => this.tweenFormattedPctValue(d, i, nodes, d.random2))
      .transition()
      .duration(durations.anim3)
      .attr('y', d => scaleY(d.value))
      .on("start", (d, i, nodes) => this.tweenFormattedPctValue(d, i, nodes, d.value))

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
      .on("start", (d, i, nodes) => this.tweenFormattedPctValue(d, i, nodes, d.maxInPct));

    const textLeft = this.mainGroup.selectAll('.label-answer-left, .handle-bar')
      .classed('header-small', false)
      .classed('on-hover-only', false)
      .attr('opacity', 1);

    textLeft.selectAll('tspan').remove();
    textLeft.append('tspan')
      .attr('dy', 8)
      .text(d => this.formatChangeInPct(d.value));

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
