import * as React from "react";
import DataService from "./services/DataService";
import FarmsCountBarChart from "./components/FarmsCountBarChart";
import FarmsCountStackedAreaChart from "./components/FarmsCountStackedAreaChart";
import Introduction from "./components/Introduction";
import QuizPage from "./components/QuizPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
        <Introduction/>
        {dataReady ? <QuizPage data={data}/> : null}
        {dataReady ? <FarmsCountBarChart data={data}/> : null}
        {dataReady ? <FarmsCountStackedAreaChart data={data}/> : null}
        <Footer/>
      </div>
    )
  }

  async loadData() {
    const data = await DataService.getFullData();
    this.setState({data: data})
  }
}

export default App;
