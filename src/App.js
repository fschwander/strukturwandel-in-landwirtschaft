import * as React from "react";
import DataService from "./services/DataService";
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
    const {fullData} = this.state;

    let fullDataIsLoaded = fullData !== undefined;

    return (
      <div className="App">
        {/*<Header />*/}
        {/*{reducedDataIsLoaded ? <QuizPage data={reducedData}/> : null}*/}
        {fullDataIsLoaded ?
          <FarmSizeRelationsChart fullData={fullData} /> : null}
        {/*{fullDataIsLoaded ? <FarmsCountChart data={fullData}/> : null}*/}
      </div>
    )
  }

  async initData() {
    const fullData = await DataService.getFullData();

    this.setState({
      fullData: fullData
    })
  }
}

export default App;
