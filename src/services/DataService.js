import * as d3 from "d3";
import dataSource from "../res/data/farm-sizes.csv";

export default class DataService {

  static getReducedData(data, year) {
    let activeIndex = 0;
    for(let i = 0; i < data.length; i++) {
      if(data[i].year < year) {
        activeIndex = i;
        console.log(year, data[i].year);

      }
      if(data[i].year === year) {
        activeIndex = i;
        console.log(year, data[i].year);
        return;
      }
    }

    const yearMin = data[0];
    const yearMax = data[activeIndex];

    return [
      {
        label: "0-1",
        size: "0 bis 1 ha",
        minYearData: yearMin.area_size_0_1,
        maxYearData: yearMax.area_size_0_1,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_0_1 / yearMin.area_size_0_1
      },
      {
        label: "1-3",
        size: "1 bis 3 ha",
        minYearData: yearMin.area_size_1_3,
        maxYearData: yearMax.area_size_1_3,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_1_3 / yearMin.area_size_1_3
      },
      {
        label: "3-5",
        size: "3 bis 5 ha",
        minYearData: yearMin.area_size_3_5,
        maxYearData: yearMax.area_size_3_5,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_3_5 / yearMin.area_size_3_5
      },
      {
        label: "5-10",
        size: "5 bis 10 ha",
        minYearData: yearMin.area_size_5_10,
        maxYearData: yearMax.area_size_5_10,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_5_10 / yearMin.area_size_5_10
      },
      {
        label: "10-20",
        size: "10 bis 20 ha",
        minYearData: yearMin.area_size_10_20,
        maxYearData: yearMax.area_size_10_20,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_10_20 / yearMin.area_size_10_20
      },
      {
        label: "20-30",
        size: "20 bis 30 ha",
        minYearData: yearMin.area_size_20_30,
        maxYearData: yearMax.area_size_20_30,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_20_30 / yearMin.area_size_20_30
      },
      {
        label: "30-50",
        size: "30 bis 50 ha",
        minYearData: yearMin.area_size_30_50,
        maxYearData: yearMax.area_size_30_50,
        minYear: yearMin.year,
        maxYear: yearMax.year,
        maxInPct: yearMax.area_size_30_50 / yearMin.area_size_30_50
      },
      {
        label: "50+",
        size: "50 ha und mehr",
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