import * as React from "react";
import DataService from "./services/DataService";
import FarmSizeRelationsChart from "./components/FarmSizeRelationsChart";
import FarmsCountChart from "./components/FarmsCountChart";
import Header from "./components/Header";
import QuizPage from "./components/QuizPage";

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
        <Header />
        {fullDataIsLoaded ? <QuizPage data={fullData}/> : null}
        {fullDataIsLoaded ? <FarmSizeRelationsChart fullData={fullData} /> : null}
        {fullDataIsLoaded ? <FarmsCountChart data={fullData}/> : null}
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
