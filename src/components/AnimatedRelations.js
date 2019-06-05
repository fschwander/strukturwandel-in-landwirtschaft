import * as React from "react";
import * as d3 from "d3";


export default class AnimatedRelations extends React.Component {

  constructor(params) {
    super(params);

    this.width = 700;
    this.height = 400;
  }

  drawAnimatedSvg() {
    const {width, height} = this;
    const {name, animObj, animObjCount, animObjName, staticObj} = this.props;

    const svg = d3.select('.AnimatedRelations')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const mainGroup = svg.append('g')
      .attr('width', width)
      .attr('height', height);

    const animObjGroup = mainGroup.append('g')
      .selectAll('g')
      .data(this.state.data)
      .enter();

    animObjGroup.append('g')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .attr('class', d => 'animIcon ' + d.class)
        .append('g')
        .append('path')
        .attr('transform-origin', 'center')
      .attr('opacity', 0)
        .transition()
        // .delay(Math.random() * 2000)
      .attr('opacity', 1)
        .attr('d', animObj)

    mainGroup.append('path')
      .attr('transform', `translate(${width / 2 - 50},${height / 2 - 30})`)
      .attr('class', name)
      .attr('d', staticObj)
  }

  prepareData() {
    const {width, height} = this;
    const {name, animObj, animObjCount, animObjName, staticObj} = this.props;

    let data = [];

    for(let i = 0; i < animObjCount; i++) {
      data.push({
        x: Math.random() * width,
        y: Math.random() * height,
        class: animObjName + Math.floor(Math.random() * 3)
      })
    }
    console.log(data);
    this.setState({data: data})
  }

  componentWillMount() {
    this.prepareData()
  }

  componentDidUpdate() {
    this.drawAnimatedSvg();
  }

  render() {
    return (
      <div className='AnimatedRelations'/>
    )
  }
}