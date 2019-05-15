import * as React from "react";
import * as d3 from "d3";
import DataService from "../services/DataService";

export default class FarmSizeRelationsChart extends React.Component {

  constructor(params) {
    super(params);
    this.state = {
      activeYear: 1990,
      min: 1985,
      max: 2017,
    };
    this.margin = {top: 20, right: 60, bottom: 40, left: 100};
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  /**
   * Based on https://bl.ocks.org/mbostock/3887051
   */
  drawChart() {
    const data = DataService.getReducedData(this.props.fullData, this.state.activeYear);

    this.processedData = [
      data.map(d => d.minYearData),
      data.map(d => d.maxYearData)
    ];

    this.colorScale = d3.scaleOrdinal()
      .range(['#c2eedc', '#7fd1af', '#1cb373', '#168c5a',
        '#66bbff', '#1e8cd3',
        '#ebb0dd', '#d674c0']);

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.processedData, oldData => d3.max(oldData))])
      .range([this.height, 0]);

    this.xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .rangeRound([0, this.width]);

    this.scaleWidth = d3.scaleBand()
      .domain(d3.range(this.processedData.length))
      .range([0, this.xScale.bandwidth()])
      .paddingInner(0.02)
      .paddingOuter(0.2);

    const {width, height, margin, xScale, yScale, scaleWidth, colorScale, processedData} = this;

    d3.select(".chartContainer").selectAll("svg").remove('svg');

    this.svg = d3.select(".chartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = this.svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.mainGroup = mainGroup;

    const barGroup = mainGroup.append("g")
      .attr('class', 'bars-container')
      .selectAll("g")
      .data(processedData)
      .enter().append("g")
      .attr('class', (d, i) => `bars${i}`)
      .attr("transform", (d, i) => "translate(" + scaleWidth(i) + ",0)")

    barGroup.selectAll("rect")
      .data(d => d)
      .enter().append('g')
      .append("rect")
      .attr("width", scaleWidth.bandwidth())
      .attr("height", d => height - yScale(d))
      .attr("x", (d, i) => xScale(data[i].label))
      .attr("y", d => yScale(d))
      .attr("fill", d => colorScale(d));

    barGroup.append('text')
      .text((d, i) => {
        switch (i) {
          case 0:
            return data[0].minYear;
          case 1:
            return data[0].maxYear;
          default:
            return '?';
        }
      })
      .attr('class', 'header-small')
      .attr('x', scaleWidth.bandwidth() / 2)
      .attr('y', height - 6)
      .attr('text-anchor', 'middle');

    mainGroup.append('g')
      .attr('class', 'x-axis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    mainGroup.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(5));

    mainGroup.append('text')
      .attr('class', 'header')
      .text('Anz. Bauernhöfe')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(-65,${height / 2}) rotate(-90)`)
  }

  initLabels() {
    const data = DataService.getReducedData(this.props.fullData, this.state.activeYear);
    const {xScale, yScale, scaleWidth} = this;

    let sectorWidth = xScale.bandwidth();
    let barWidth = scaleWidth.bandwidth() / 2;

    const formatInPct = d3.format('.0%');

    d3.select('.FarmSizeRelationsChart')
      .select('.bars1')
      .selectAll('g')
      .append('text')
      .attr('x', (d, i) => sectorWidth * i + barWidth)
      .attr('y', d => yScale(d) - 4)
      .attr('text-anchor', 'middle')
      .text((d, i) => {
        const pctValue = -1 + data[i].maxInPct;
        if (pctValue >= 0) {
          return "+" + formatInPct(pctValue)
        } else {
          return "–" + formatInPct(pctValue * -1);
        }
      })
  }

  initLegend() {
    const {fullData} = this.props;

    const legendEntries = [fullData[0].year, fullData[fullData.length - 1].year];

    const lineHeight = 24;
    const padding = 18;

    const legendWidth = 70 + 2 * padding;
    const legendHeight = legendEntries.length * lineHeight + padding;

    const legend = this.mainGroup.append('g')
      .attr('class', 'legend')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('transform', `translate(${this.width - legendWidth - padding},${padding})`);

    legend.append('rect')
      .attr('class', 'background')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'white');

    const legendEntry = legend.append('g')
      .attr('class', 'entries')
      .attr('transform', `translate(${padding},${padding})`)
      .selectAll('rect')
      .data(legendEntries)
      .enter();

    for (let j = 0; j < this.colorScale.length; j++) {
      const scale = this.colorScale[j];

      legendEntry.append('rect')
        .attr('x', j * 14)
        .attr('y', (d, i) => lineHeight * i)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', (d, i) => scale(i));
    }

    legendEntry.append('text')
      .attr('x', 48)
      .attr('y', (d, i) => lineHeight * i + 10)
      .text((d, i) => legendEntries[i]);
  }

  componentDidMount() {
    this.drawChart();
    // this.initLegend();
    this.initLabels();
  }

  componentDidUpdate() {
    this.drawChart();
    this.initLabels();
  }

  setActiveYear() {
    let slider = document.getElementById('yearSlider');
    let activeYear = parseInt(slider.value);
    this.setState({activeYear: activeYear})
  }

  getSliderDataListOptions() {
    const data = this.props.fullData;
    const options = data.map(d => {
      return <option value={d.year}
                     key={d.year}
                     label={d.year % 5 === 0 ? d.year : ''}
      >{d.year % 5 === 0 ? d.year : ''}</option>
    });
    return <datalist id="tickMarks">{options}</datalist>
  }

  getSliderLabels() {
    const data = this.props.fullData;
    const labels = [];
    for (let i = data[0].year; i < data[data.length - 1].year; i++) {
      if (i % 5 === 0) {
        labels.push(<li key={i}>{i}</li>)
      }
    }
    return <ul>{labels}</ul>
  }

  render() {
    return <div className='FarmSizeRelationsChart'>
      <h2>Veränderung der Bauernhöfe im Jahresvergleich</h2>

      <div className='chartContainer'/>

      <div className='sliderContainer'>
        <input className="slider"
               id='yearSlider'
               type="range"
               min={this.state.min}
               max={this.state.max}
               value={this.state.activeYear}
               list='tickMarks'
               onChange={() => this.setActiveYear()}/>
        {this.getSliderDataListOptions()}
        {this.getSliderLabels()}
      </div>
    </div>
  }
}