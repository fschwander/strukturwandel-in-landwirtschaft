import * as d3 from "d3";
import dataSource from "../res/data/farm-sizes.csv";

export default class DataService {

  static getQuizData(data) {
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
        random1: 1.4,
        random2: 0.1,
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
        random1: 0.6,
        random2: 3.5,
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
        random1: 1.2,
        random2: 3.0,
        maxInPct: maxLarge / minLarge
      }
    ]
  }

  static getCompareYearData(data, year) {
    let activeIndex = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].year < year) {
        // setting yer on last available data entry
        activeIndex = i;
      } else if (data[i].year === year) {
        // returning when exact same year was found
        activeIndex = i;
        break;
      }
    }

    const yearMin = data[0];
    const yearMax = data[activeIndex];

    return [
      {
        size: "0-1",
        label: "0–1 ha",
        minYearData: yearMin.area_size_0_1,
        maxYearData: yearMax.area_size_0_1,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_0_1 / yearMin.area_size_0_1
      },
      {
        size: "1-3",
        label: "1–3 ha",
        minYearData: yearMin.area_size_1_3,
        maxYearData: yearMax.area_size_1_3,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_1_3 / yearMin.area_size_1_3
      },
      {
        size: "3-5",
        label: "3–5 ha",
        minYearData: yearMin.area_size_3_5,
        maxYearData: yearMax.area_size_3_5,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_3_5 / yearMin.area_size_3_5
      },
      {
        size: "5-10",
        label: "5–10 ha",
        minYearData: yearMin.area_size_5_10,
        maxYearData: yearMax.area_size_5_10,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_5_10 / yearMin.area_size_5_10
      },
      {
        size: "10-20",
        label: "10–20 ha",
        minYearData: yearMin.area_size_10_20,
        maxYearData: yearMax.area_size_10_20,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_10_20 / yearMin.area_size_10_20
      },
      {
        size: "20-30",
        label: "20–30 ha",
        minYearData: yearMin.area_size_20_30,
        maxYearData: yearMax.area_size_20_30,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_20_30 / yearMin.area_size_20_30
      },
      {
        size: "30-50",
        label: "30–50 ha",
        minYearData: yearMin.area_size_30_50,
        maxYearData: yearMax.area_size_30_50,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_30_50 / yearMin.area_size_30_50
      },
      {
        size: "50+",
        label: "50 ha+",
        minYearData: yearMin.area_size_50_n,
        maxYearData: yearMax.area_size_50_n,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_50_n / yearMin.area_size_50_n
      }
    ];
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