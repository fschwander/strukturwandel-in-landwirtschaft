import * as React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import ch from '../res/ch'
import swiss from '../res/ch-cantons'


export default class MapOfSwitzerland extends React.Component {

  drawMapWithCantonsAndLabels() {
    let width = 960,
      height = 600;

    const projection = d3.geoAlbers()
      .rotate([0, 0])
      .center([8.3, 46.8])
      .scale(16000)
      .translate([width / 2, height / 2])
      .precision(.1);

    const path = d3.geoPath()
      .projection(projection);

    const svg = d3.select('.MapOfSwitzerland')
      .append('g').attr('class', 'cantons-and-labels')
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const cantons = topojson.feature(swiss, swiss.objects.cantons);

    svg.append("path")
      .datum(cantons)
      .attr("class", "canton")
      .attr("d", path);

    svg.append("path")
      .datum(topojson.mesh(swiss, swiss.objects.cantons, function (a, b) {
        return a !== b;
      }))
      .attr("class", "canton-boundary")
      .attr("d", path);

    svg.selectAll("text")
      .data(cantons.features)
      .enter().append("text")
      .attr("transform", function (d) {
        return "translate(" + path.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .text(function (d) {
        return d.properties.name;
      });
  }

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
      .datum(topojson.mesh(ch, ch.objects.municipalities, (a, b) => a !== b))
      .attr('class', 'municipality-boundaries')
      .attr('d', path);

    svg.append('path')
      .datum(topojson.mesh(ch, ch.objects.cantons, (a, b) => a !== b))
      .attr('class', 'canton-boundaries')
      .attr('d', path);
  }

  render() {
    return <div className='MapOfSwitzerland'/>
  }

  componentDidMount() {
    // this.drawMapWithCantonsAndLabels();
    this.drawMapWithCantonsAndMunicipalities();
  }

}