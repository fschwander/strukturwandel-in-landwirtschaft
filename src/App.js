import * as React from "react";
import DataService from "./services/DataService";
import RelativeLineChart from "./components/RelativeLineChart";

class App extends React.Component {

  constructor(params) {
    super(params);
    this.state = {}
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    const {data, lineChartData, labelMap} = this.state;
    const dataReady = data !== undefined;

    return (
      <div className="App">
        {/*<Header/>*/}
        {/*<Introduction/>*/}
        {/*{dataReady ? <QuizPage data={data}/> : null}*/}
        {/*/!*{dataReady ? <FarmsCountBarChart data={data}/> : null}*!/*/}
        {/*{dataReady ? <FarmsCountStackedAreaChart data={data}/> : null}*/}
        {dataReady ? <RelativeLineChart data={lineChartData} labelMap={labelMap}/> : null}
        {/*<Footer/>*/}
      </div>
    )
  }

  async loadData() {
    const data = await DataService.getFullData();
    const lineChartData = DataService.getNormalizedLineChartData(data);
    const labelMap = DataService.getLabelMap()


    this.setState({
      data: data,
      lineChartData: lineChartData,
      labelMap: labelMap
    })
  }
}

export default App;
