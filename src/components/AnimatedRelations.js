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

    const animObjGroup = mainGroup.append('g');

    for (let i = 0; i < animObjCount; i++) {
      animObjGroup.append('g')
        .attr('transform', `translate(${Math.random() * width},${Math.random() * height}) scale(0.5)`)
        .attr('class', 'animIcon ' + animObjName + Math.floor(Math.random() * 3))
        .append('g')
        .append('path')
        .attr('transform-origin', 'center')
        .transition()
        .delay(Math.random() * 4000)
        .attr('d', animObj)
    }

    mainGroup.append('path')
      .attr('transform', `translate(${width / 2 - 50},${height / 2 - 30})`)
      .attr('class', name)
      .attr('d', staticObj)
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