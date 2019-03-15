import * as React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import ch from '../res/ch'


export default class MapOfSwitzerland extends React.Component {

  /**
   * code from http://bl.ocks.org/herrstucki/4327678
   * */
  drawMapWithCantonsAndMunicipalities() {
    let width = 960,
      height = 500;

    const path = d3.geoPath()
      .projection(null);

    const svg = d3.select('.MapOfSwitzerland')
      .append('g').attr('class', 'cantons-and-municipalities')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.append('path')
      .datum(topojson.feature(ch, ch.objects.country))
      .attr('class', 'country')
      .attr('d', path);

    svg.append('path')
      .datum(topojson.mesh(ch, ch.objects.municipalities, function (a, b) {
        return a !== b;
      }))
      .attr('class', 'municipality-boundaries')
      .attr('d', path);

    svg.append('path')
      .datum(topojson.mesh(ch, ch.objects.cantons, function (a, b) {
        console.log(a, b);
        return a !== b;
      }))
      .attr('class', 'canton-boundaries')
      .attr('d', path);
  }

  render() {
    return <div className='MapOfSwitzerland'/>
  }

  componentDidMount() {
    this.drawMapWithCantonsAndMunicipalities();
  }

}