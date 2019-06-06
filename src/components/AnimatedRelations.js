import * as React from "react";
import * as d3 from "d3";
import {Icons} from "../res/imgs/Icons";


export default class AnimatedRelations extends React.Component {

  constructor(params) {
    super(params);

    const {animObjW, animObjH} = this.props;
    this.data = [];

    this.width = 800;
    this.height = 300;
    this.padding = {top: 0, right: animObjW * 2, bottom: animObjH, left: animObjW * 2};
    this.innerWidth = this.width - this.padding.left - this.padding.right;
    this.innerHeight = this.height - this.padding.top - this.padding.bottom;
  }

  drawStaticSvg() {
    const {width, height, padding, innerWidth, innerHeight} = this;
    const {staticObjW, staticObjH} = this.props;

    const svg = d3.select('.AnimatedRelations')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.mainGroup = svg.append('g')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('class', 'main-group')
      .attr('transform', `translate(${padding.left},${padding.top})`);

    const backgroundGroup = this.mainGroup.append('g')
      .attr('class', 'background-group')
    for (let i = 0; i < 30; i++) {
      backgroundGroup.append('path')
        .attr('d', Icons.grass)
        .attr('fill', '#c2eedc')
        .attr('transform', `translate(${this.getRandomInRange(0, innerWidth)},${this.getRandomInRange(0, innerHeight)})`)
    }
    backgroundGroup.append('rect')
      .attr('width', 150)
      .attr('height', 140)
      .attr('fill', 'white')
      .attr('transform', `translate(${innerWidth / 2 - staticObjW / 2},${innerHeight / 2 - staticObjH / 2})`);


    this.mainGroup.append('g')
      .attr('class', 'static-obj-group')
      .attr('transform', `translate(${innerWidth / 2 - staticObjW / 2},${innerHeight / 2 - staticObjH / 2})`);

    this.mainGroup.append('g')
      .attr('class', 'anim-obj-group')
  }

  drawStaticObjects() {
    const {name, staticObj, staticObjFill} = this.props;

    const staticGroup = this.mainGroup.selectAll('.static-obj-group')
    staticGroup.selectAll('path').remove()
    staticGroup
      .append('path')
      .attr('class', name)
      .attr('d', staticObj)
      .attr('fill', staticObjFill);
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

    this.data = [];

    for (let i = 0; i < animObjCount; i++) {
      this.data.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        fill: '#' + 111 * this.getRandomInRange(1, 11),
        class: animObjName,
        randomDuration: this.getRandomInRange(3000, 6000)
      })
    }
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
    this.drawStaticObjects();
  }

  render() {
    return (
      <div className='AnimatedRelations'/>
    )
  }
}