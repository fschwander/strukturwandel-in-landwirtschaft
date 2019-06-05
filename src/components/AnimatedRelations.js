import * as React from "react";
import * as d3 from "d3";


export default class AnimatedRelations extends React.Component {

  constructor(params) {
    super(params);

    const {animObjW, animObjH} = this.props;

    this.width = 800;
    this.height = 300;
    this.padding = {top: 0, right: animObjW * 2, bottom: animObjH, left: animObjW * 2};
    this.innerWidth = this.width - this.padding.left - this.padding.right;
    this.innerHeight = this.height - this.padding.top - this.padding.bottom;
  }

  drawStaticSvg() {
    const {width, height, padding, innerWidth, innerHeight} = this;
    const {name, staticObj, staticObjW, staticObjH, staticObjFill} = this.props;

    const svg = d3.select('.AnimatedRelations')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.mainGroup = svg.append('g')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('class', 'main-group')
      .attr('transform', `translate(${padding.left},${padding.top})`);

    this.mainGroup.append('path')
      .attr('transform', `translate(${innerWidth / 2 - staticObjW / 2},${innerHeight / 2 - staticObjH / 2})`)
      .attr('class', name)
      .attr('d', staticObj)
      .attr('fill', staticObjFill);

    this.mainGroup.append('g')
      .attr('class', 'anim-obj-group')
  }

  drawDynamicObjects() {
    const {animObj, animObjW, animObjCount} = this.props;

    const animObjGroup = this.mainGroup.selectAll('.anim-obj-group')
      .selectAll('g')
      .data(this.data)

    animObjGroup.enter()
      .filter((d, i) => i < animObjCount)
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('class', d => 'animIcon ' + d.class)
      .append('path')
      .attr('fill', d => d.fill)
      .attr('d', animObj)

    animObjGroup.exit().remove()

    this.mainGroup.selectAll('.cow')
      .transition()
      .ease(d3.easeLinear)
      .on('start', function walkAnimation() {
        d3.active(this)
          .duration(d => d.randomDuration)
          .attr('transform', d => `translate(${d.x + animObjW},${d.y}) scale(1,1)`)
          .transition()
          .duration(500)
          .attr('transform', d => `translate(${d.x + animObjW},${d.y}) scale(-1,1)`)
          .transition()
          .duration(d => d.randomDuration)
          .attr('transform', d => `translate(${d.x - animObjW},${d.y}) scale(-1,1)`)
          .transition()
          .duration(500)
          .attr('transform', d => `translate(${d.x - animObjW},${d.y}) scale(1,1)`)
          .transition()
          .on('start', walkAnimation)
      })
  }

  prepareData() {
    const {innerWidth, innerHeight} = this;
    const {animObjName, animObjCount} = this.props;

    let data = [];

    for (let i = 0; i < animObjCount; i++) {
      data.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        fill: '#' + 111 * (i % 8),
        class: animObjName,
        randomDuration: this.getRandomInRange(3000, 6000)
      })
    }
    this.data = data;
  }

  getRandomInRange(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }

  componentWillMount() {
    this.prepareData()
  }

  componentDidMount() {
    this.drawStaticSvg();
  }

  componentDidUpdate() {
    this.prepareData();
    this.drawDynamicObjects();
  }

  render() {
    return (
      <div className='AnimatedRelations'/>
    )
  }
}