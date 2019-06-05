import * as React from "react";
import * as d3 from "d3";


export default class AnimatedRelations extends React.Component {

  constructor(params) {
    super(params);

    const {animObjW, animObjH} = this.props;

    this.width = 700;
    this.height = 300;
    this.padding = {top: 0, right: animObjW, bottom: animObjH, left: animObjW};
    this.innerWidth = this.width - this.padding.left - this.padding.right;
    this.innerHeight = this.height - this.padding.top - this.padding.bottom;
  }

  drawAnimatedSvg() {
    const {width, height, padding, innerWidth, innerHeight} = this;
    const {name, animObj, staticObj, staticObjW, staticObjH, staticObjFill} = this.props;

    const svg = d3.select('.AnimatedRelations')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const mainGroup = svg.append('g')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('transform', `translate(${padding.left},${padding.top})`);

    mainGroup.append('path')
      .attr('transform', `translate(${innerWidth / 2 - staticObjW / 2},${innerHeight / 2 - staticObjH / 2})`)
      .attr('class', name)
      .attr('d', staticObj)
      .attr('fill', staticObjFill);

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
      .attr('d', animObj)
  }

  prepareData() {
    const {innerWidth, innerHeight} = this;
    const {animObjCount, animObjName} = this.props;

    let data = [];

    for (let i = 0; i < animObjCount; i++) {
      data.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
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