import * as React from "react";
import * as d3 from "d3";
import dataSource from "../res/data/farm-sizes.csv";


export default class DataService extends React.Component {

  static getReducedQuizData(data) {
    const yearMin = data[0];
    const yearMax = data[data.length - 1];

    let minSmall = yearMin.area_size_0_1
      + yearMin.area_size_1_3
      + yearMin.area_size_3_5
      + yearMin.area_size_5_10
      + yearMin.area_size_10_20;
    let minMedium = yearMin.area_size_20_30
      + yearMin.area_size_30_50;
    let minLarge = yearMin.area_size_50_n;

    let maxSmall = yearMax.area_size_0_1
      + yearMax.area_size_1_3
      + yearMax.area_size_3_5
      + yearMax.area_size_5_10
      + yearMax.area_size_10_20;
    let maxMedium = yearMax.area_size_20_30
      + yearMax.area_size_30_50;
    let maxLarge = yearMax.area_size_50_n;

    return [
      {value: 1, label: "Kleine Bauernhöfe", size: "bis 20 ha", minYearData: minSmall, maxYearData: maxSmall, maxInPct: maxSmall / minSmall},
      {value: 1, label: "Mittlere Bauernhöfe", size: "20 bis 50 ha", minYearData: minMedium, maxYearData: maxMedium, maxInPct: maxMedium / minMedium},
      {value: 1, label: "Grosse Bauernhöfe", size: "ab 50 ha", minYearData: minLarge, maxYearData: maxLarge, maxInPct: maxLarge / minLarge}
    ]
  }

  static getFullQuizData(data) {
    const yearMin = data[0];
    const yearMax = data[data.length - 1];

    let min_0_1 = yearMin.area_size_0_1;
    let min_1_3 = yearMin.area_size_1_3;
    let min_3_5 = yearMin.area_size_3_5;
    let min_5_10 = yearMin.area_size_5_10;
    let min_10_20 = yearMin.area_size_10_20;
    let min_20_30 = yearMin.area_size_20_30;
    let min_30_50 = yearMin.area_size_30_50;
    let min_50_n = yearMin.area_size_50_n;

    let max_0_1 = yearMax.area_size_0_1;
    let max_1_3 = yearMax.area_size_1_3;
    let max_3_5 = yearMax.area_size_3_5;
    let max_5_10 = yearMax.area_size_5_10;
    let max_10_20 = yearMax.area_size_10_20;
    let max_20_30 = yearMax.area_size_20_30;
    let max_30_50 = yearMax.area_size_30_50;
    let max_50_n = yearMax.area_size_50_n;

    return [
      {value: 1, minYearData: min_0_1, maxYearData: max_0_1, maxInPct: max_0_1 / min_0_1},
      {value: 1, minYearData: min_1_3, maxYearData: max_1_3, maxInPct: max_1_3 / min_0_1},
      {value: 1, minYearData: min_3_5, maxYearData: max_3_5, maxInPct: max_3_5 / min_3_5},
      {value: 1, minYearData: min_5_10, maxYearData: max_5_10, maxInPct: max_5_10 / min_5_10},
      {value: 1, minYearData: min_10_20, maxYearData: max_10_20, maxInPct: max_10_20 / min_10_20},
      {value: 1, minYearData: min_20_30, maxYearData: max_20_30, maxInPct: max_20_30 / min_20_30},
      {value: 1, minYearData: min_30_50, maxYearData: max_30_50, maxInPct: max_30_50 / min_30_50},
      {value: 1, minYearData: min_50_n, maxYearData: max_50_n, maxInPct: max_50_n / min_50_n}
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