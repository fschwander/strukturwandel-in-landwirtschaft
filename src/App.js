import * as React from "react";
import DataService from "./services/DataService";
import RelativeLineChart from "./components/RelativeLineChart";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import QuizPage from "./components/QuizPage";
import FarmsCountStackedAreaChart from "./components/FarmsCountStackedAreaChart";
import Footer from "./components/Footer";
import GrowPossibilities from "./components/GrowPossibilities";
import {FullPage, Slide} from "react-full-page";

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
        <FullPage>
          <Slide>
            <Header/>
          </Slide>
          <Slide>
            <GrowPossibilities/>
          </Slide>
          <Slide>
            <Introduction/>
          </Slide>

          <Slide>
            {dataReady ? <QuizPage data={data}/> : null}
          </Slide>

          <Slide>
            {dataReady ? <FarmsCountStackedAreaChart data={data}/> : null}
          </Slide>

          <Slide>
            {dataReady ? <RelativeLineChart data={lineChartData} labelMap={labelMap}/> : null}
          </Slide>

          <Slide>
            <Footer/>
          </Slide>

        </FullPage>
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
