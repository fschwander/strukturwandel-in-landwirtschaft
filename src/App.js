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
    this.loadData()
  }

  render() {
    const {data} = this.state;
    const dataReady = data !== undefined;

    return (
      <div className="App">
        <Header/>
        {dataReady ? <QuizPage data={data}/> : null}
        {dataReady ? <FarmSizeRelationsChart data={data}/> : null}
        {dataReady ? <FarmsCountChart data={data}/> : null}
      </div>
    )
  }

  async loadData() {
    const data = await DataService.getFullData();
    this.setState({data: data})
  }
}

export default App;
