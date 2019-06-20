import * as React from "react";
import DataService from "./services/DataService";
import RelativeLineChart from "./components/RelativeLineChart";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import QuizPage from "./components/QuizPage";
import FarmsCountStackedAreaChart from "./components/FarmsCountStackedAreaChart";
import Footer from "./components/Footer";
import GrowPossibilities from "./components/GrowPossibilities";

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
        <Header/>
        <GrowPossibilities/>
        <Introduction/>
        {dataReady ? <QuizPage data={data}/> : null}
        {dataReady ? <FarmsCountStackedAreaChart data={data}/> : null}
        {dataReady ? <RelativeLineChart data={lineChartData} labelMap={labelMap}/> : null}
        <Footer/>
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
