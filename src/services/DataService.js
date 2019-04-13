import * as React from "react";
import * as d3 from "d3";
import dataSource from "../res/data/farm-sizes.csv";


export default class DataService extends React.Component{

  static getQuizData() {
    return [
        {index: 0, value: 3},
        {index: 1, value: 5},
        {index: 2, value: 12}
      ]
  }

  static getFarmsData() {
    return d3.csv(dataSource,
      d => ({
        year: +d.year,
        total_farms_count: +d.total_farms_count,
        area_valley_in_percent: +d.area_valley_in_percent,
        area_mountain_in_percent: +d.area_mountain_in_percent,
        area_size_0_1: +d.area_size_0_1,
        area_size_1_3: +d.area_size_1_3,
        area_size_3_5: +d.area_size_3_5,
        area_size_5_10: +d.area_size_5_10,
        area_size_10_20: +d.area_size_10_20,
        area_size_20_30: +d.area_size_20_30,
        area_size_30_50: +d.area_size_30_50,
        area_size_50_n: +d.area_size_50_n
      }))
  }

  static getLabelMap() {
    return {
      year: 'Jahr',
      total_farms_count: 'Total Anz. Farmen',
      area_valley_in_percent: 'Talgebiet in %',
      area_mountain_in_percent: 'Berggebiet in %',
      area_size_0_1: '< 1 ha',
      area_size_1_3: '1 bis 3 ha',
      area_size_3_5: '3 bis 5 ha',
      area_size_5_10: '5 bis 10 ha',
      area_size_10_20: '10 bis 20 ha',
      area_size_20_30: '20 bis 30 ha',
      area_size_30_50: '30 bis 50 ha',
      area_size_50_n: '> 50 ha'
    };
  }

  static getFilteredFarmsKeys(data) {
    return Object.keys(data[0]).filter(d =>
      d === 'area_size_0_1' ||
      d === 'area_size_1_3' ||
      d === 'area_size_3_5' ||
      d === 'area_size_5_10' ||
      d === 'area_size_10_20' ||
      d === 'area_size_20_30' ||
      d === 'area_size_30_50' ||
      d === 'area_size_50_n');
  }
}