import QuizPage from "./components/QuizPage";
import * as React from "react";
import * as d3 from "d3";
import data from "./res/data/farm-sizes.csv";

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      data: undefined
    }
  }

  loadData() {
    d3.csv(data,
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
      })).then(data => this.setState({data: data}))
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    const {data} = this.state;
    let dataIsLoaded = data !== undefined;

    return (
      <div className="App">
        {dataIsLoaded ? <QuizPage data={data}/> : null}
      </div>
    )
  }
}

export default App;
