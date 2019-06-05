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

  drawAnimatedSvg() {
    const {width, height, padding, innerWidth, innerHeight} = this;
    const {name, animObj, animObjW, staticObj, staticObjW, staticObjH, staticObjFill} = this.props;

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
      .append('path')
      .attr('fill', d =>  d.fill)
      .attr('d', animObj);

    svg.selectAll('.cow')
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
    const {animObjCount, animObjName} = this.props;

    let data = [];

    for (let i = 0; i < animObjCount; i++) {
      data.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        fill: '#'+ 111 * (i%8),
        class: animObjName,
        randomDuration: this.getRandomInRange(3000, 6000)
      })
    }
    this.setState({data: data})
  }

  getRandomInRange(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
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