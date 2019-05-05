import QuizPage from "./components/QuizPage";
import * as React from "react";
import DataService from "./services/DataService";
import FarmsCountChart from "./components/FarmsCountChart";
import FarmSizeRelationsChart from "./components/FarmSizeRelationsChart";

class App extends React.Component {

  constructor(params) {
    super(params);

    this.state = {}
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
        <div>
          <h1>Das grosse Bauernsterben?</h1>
          <p>Immer wieder liest man davon, dass für die Schweizer Bäuerinnen und Bauer die Existenz gefährdet ist:
            Für viele Betriebe lohnt sich die Landwirtschft nicht mehr und sie verschwinden.</p>
        </div>

        {reducedDataIsLoaded ? <QuizPage data={reducedData}/> : null}
        {reducedDataIsLoaded && fullDataIsLoaded ?
          <FarmSizeRelationsChart fullData={fullData} data={reducedData}/> : null}
        {fullDataIsLoaded ? <FarmsCountChart data={fullData}/> : null}
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
