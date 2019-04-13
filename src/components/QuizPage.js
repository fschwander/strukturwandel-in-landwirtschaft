import * as React from "react";
import DraggableBarChart from "./DraggableBarChart";
import Button from "react-bootstrap/Button";

export default class QuizPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false
    }
  }

  showAnswer() {
    this.setState({showAnswer: true})
  }

  render() {
    return (
      <div className='QuizPage background-container-outer'>
        <div className='background-container-inner'>
          <DraggableBarChart showAnswer={this.state.showAnswer}
                             quizData={this.props.quizData}/>
          <Button onClick={() => this.showAnswer()}>Antwort zeigen</Button>
        </div>
      </div>
    )
  }
}