import * as d3 from "d3";
import dataSource from "../res/data/farm-sizes.csv";

export default class DataService {

  static getReducedData(data) {
    const yearMin = data[0];
    const yearMax = data[data.length - 1];

    let minSmall = yearMin.area_size_0_1
      + yearMin.area_size_1_3
      + yearMin.area_size_3_5
      + yearMin.area_size_5_10;

    let minMedium = yearMin.area_size_20_30 + yearMin.area_size_10_20;

    let minLarge = yearMin.area_size_50_n + yearMin.area_size_30_50;

    let maxSmall = yearMax.area_size_0_1
      + yearMax.area_size_1_3
      + yearMax.area_size_3_5
      + yearMax.area_size_5_10;

    let maxMedium = yearMax.area_size_20_30 + yearMax.area_size_10_20;

    let maxLarge = yearMax.area_size_50_n + yearMax.area_size_30_50;

    return [
      {
        value: 1,
        label: "Kleine Bauernhöfe",
        size: "bis 20 ha",
        minYearData: minSmall,
        maxYearData: maxSmall,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: maxSmall / minSmall
      },
      {
        value: 1,
        label: "Mittlere Bauernhöfe",
        size: "20 bis 50 ha",
        minYearData: minMedium,
        maxYearData: maxMedium,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: maxMedium / minMedium
      },
      {
        value: 1,
        label: "Grosse Bauernhöfe",
        size: "ab 50 ha",
        minYearData: minLarge,
        maxYearData: maxLarge,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: maxLarge / minLarge
      }
    ]
  }

  static getFullData() {
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