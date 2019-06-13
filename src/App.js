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
    const {data, lineChartData} = this.state;
    const dataReady = data !== undefined;

    return (
      <div className="App">
        {/*<Header/>*/}
        {/*<Introduction/>*/}
        {/*{dataReady ? <QuizPage data={data}/> : null}*/}
        {/*/!*{dataReady ? <FarmsCountBarChart data={data}/> : null}*!/*/}
        {/*{dataReady ? <FarmsCountStackedAreaChart data={data}/> : null}*/}
        {dataReady ? <RelativeLineChart data={lineChartData}/> : null}
        {/*<Footer/>*/}
      </div>
    )
  }

  async loadData() {
    const data = await DataService.getFullData();
    const lineChartData = DataService.getNormalizedLineChartData(data);

    this.setState({data: data, lineChartData: lineChartData})
  }
}

export default App;
