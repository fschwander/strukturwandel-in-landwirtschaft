import QuizPage from "./components/QuizPage";
import * as React from "react";
import DataService from "./services/DataService";
import FarmsCountChart from "./components/FarmsCountChart";

class App extends React.Component {

  constructor(params) {
    super(params);

    this.state = {
      data: undefined
    }
  }

  componentWillMount() {
    this.initData()
  }

  render() {
    const {quizData, data} = this.state;
    let quizDataIsLoaded = quizData !== undefined;
    let farmsDataIsLoaded = data !== undefined;

    return (
      <div className="App">
        {quizDataIsLoaded ? <QuizPage quizData={quizData}/> : null}
        {/*{farmsDataIsLoaded ? <FarmsCountChart data={data}/> : null}*/}
      </div>
    )
  }

  async initData() {
    const farmsData = await DataService.getFarmsData();
    const quizDataReduced = DataService.getReducedQuizData(farmsData);
    const quizDataFull = DataService.getFullQuizData(farmsData);

    this.setState({
      quizData: quizDataReduced,
      data: farmsData
    })
  }
}

export default App;
