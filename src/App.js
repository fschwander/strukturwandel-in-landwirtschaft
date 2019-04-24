import QuizPage from "./components/QuizPage";
import * as React from "react";
import DataService from "./services/DataService";
import FarmsCountChart from "./components/FarmsCountChart";
import FarmSizeRelationsChart from "./components/FarmSizeRelationsChart";

class App extends React.Component {

  constructor(params) {
    super(params);

    this.state = {

    }
  }

  componentWillMount() {
    this.initData()
  }

  render() {
    const {reducedData, fullData} = this.state;

    let reducedDataIsLoaded = reducedData !== undefined;
    let fullDataIsLoaded = fullData !== undefined;

    return (
      <div className="App">
        {reducedDataIsLoaded ? <QuizPage data={reducedData}/> : null}
        {fullDataIsLoaded ? <FarmsCountChart data={fullData}/> : null}
        {reducedDataIsLoaded ? <FarmSizeRelationsChart data={reducedData}/> : null}
      </div>
    )
  }

  async initData() {
    const fullData = await DataService.getFullData();
    const reducedData = DataService.getReducedData(fullData);

    this.setState({
      reducedData: reducedData,
      fullData: fullData
    })
  }
}

export default App;
