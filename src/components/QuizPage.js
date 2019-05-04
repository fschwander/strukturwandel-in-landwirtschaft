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

        <p>Immer wieder liest man davon, dass für die Schweizer Bäuerinnen und Bauer die Existenz gefährdet ist:
          Für viele Betriebe lohnt sich die Landwirtschft nicht mehr und sie verschwinden.</p>
        <p>Aber wie sieht die Wirklichkeit aus? Wie viele Betriebe sind verschwunden?</p>
        <p>Ausgehend vom Jahr 1985, wo der Bestand 100% betrug: Schätze wie sich die Anzahl der Bauernhöfe verändert
          hat.</p>

        <DraggableBarChart showAnswer={this.state.showAnswer}
                           data={this.props.data}/>
        <p className={showAnswer ? 'show' : 'hide'}>Tatsächlich ist es so, dass besonders unter den kleineren
          Bauernhöfen ein regelrechtes Massensterben beobachtet werden kann. Auch mittelgrosse Betriebe haben
          Schwierigkeiten. Nur grosse oder zusammengelegte Höfe können sich behaupten: Ihre Anzahl ist um das Mehrfache
          gestiegen.</p>
        <Button className={showAnswer ? 'hide' : 'show'} variant="dark"
                onClick={() => this.showAnswer()}>Fertig geraten? Lösung zeigen</Button>
      </div>
    )
  }
}