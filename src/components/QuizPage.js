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
    const showAnswer = this.state.showAnswer;

    return (
      <div className='QuizPage'>
        <h1>Quiz</h1>

        <DraggableBarChart showAnswer={this.state.showAnswer}
                           data={this.props.data}/>
        <p className={showAnswer ? 'show' : 'hide'}>Du bist entweder genau richtig gelegen – oder daneben. Passende
          Nachricht muss noch implementiert
          werden</p>
        <Button className={showAnswer ? 'hide' : 'show'} variant="dark"
                onClick={() => this.showAnswer()}>Fertig geraten? Lösung zeigen</Button>
      </div>
    )
  }
}