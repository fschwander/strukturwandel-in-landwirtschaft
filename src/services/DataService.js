import * as React from "react";
import * as d3 from "d3";
import dataSource from "../res/data/farm-sizes.csv";


export default class DataService extends React.Component {

  static getReducedQuizData(data) {
    console.log(data);
    let startSmall = data[0].area_size_0_1
      + data[0].area_size_1_3
      + data[0].area_size_3_5
      + data[0].area_size_5_10
      + data[0].area_size_10_20;
    let startMedium = data[0].area_size_20_30
      + data[0].area_size_30_50;
    let startLarge = data[0].area_size_50_n;

    let endSmall = data[data.length - 1].area_size_0_1
      + data[data.length - 1].area_size_1_3
      + data[data.length - 1].area_size_3_5
      + data[data.length - 1].area_size_5_10
      + data[data.length - 1].area_size_10_20;
    let endMedium = data[data.length - 1].area_size_20_30
      + data[data.length - 1].area_size_30_50;
    let endLarge = data[data.length - 1].area_size_50_n;

    return [
      {value: 1, startInNo: startSmall, answerInNo: endSmall, answerInPct: endSmall / startSmall},
      {value: 1, startInNo: startMedium, answerInNo: endMedium, answerInPct: endMedium / startMedium},
      {value: 1, startInNo: startLarge, answerInNo: endLarge, answerInPct: endLarge / startLarge}
    ]
  }

  static getFullQuizData(data) {
    console.log(data);
    let start_0_1 = data[0].area_size_0_1;
    let start_1_3 = data[0].area_size_1_3;
    let start_3_5 = data[0].area_size_3_5;
    let start_5_10 = data[0].area_size_5_10;
    let start_10_20 = data[0].area_size_10_20;
    let start_20_30 = data[0].area_size_20_30;
    let start_30_50 = data[0].area_size_30_50;
    let start_50_n = data[0].area_size_50_n;

    let end_0_1 = data[data.length - 1].area_size_0_1;
    let end_1_3 = data[data.length - 1].area_size_1_3;
    let end_3_5 = data[data.length - 1].area_size_3_5;
    let end_5_10 = data[data.length - 1].area_size_5_10;
    let end_10_20 = data[data.length - 1].area_size_10_20;
    let end_20_30 = data[data.length - 1].area_size_20_30;
    let end_30_50 = data[data.length - 1].area_size_30_50;
    let end_50_n = data[data.length - 1].area_size_50_n;

    return [
      {value: 1, startInNo: start_0_1, answerInNo: end_0_1, answerInPct: end_0_1 / start_0_1},
      {value: 1, startInNo: start_1_3, answerInNo: end_1_3, answerInPct: end_1_3 / start_0_1},
      {value: 1, startInNo: start_3_5, answerInNo: end_3_5, answerInPct: end_3_5 / start_3_5},
      {value: 1, startInNo: start_5_10, answerInNo: end_5_10, answerInPct: end_5_10 / start_5_10},
      {value: 1, startInNo: start_10_20, answerInNo: end_10_20, answerInPct: end_10_20 / start_10_20},
      {value: 1, startInNo: start_20_30, answerInNo: end_20_30, answerInPct: end_20_30 / start_20_30},
      {value: 1, startInNo: start_30_50, answerInNo: end_30_50, answerInPct: end_30_50 / start_30_50},
      {value: 1, startInNo: start_50_n, answerInNo: end_50_n, answerInPct: end_50_n / start_50_n}
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