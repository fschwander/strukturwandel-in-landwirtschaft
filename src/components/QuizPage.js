import * as React from "react";
import DraggableBarChart from "./DraggableBarChart";
import Button from "react-bootstrap/Button";
import DataService from "../services/DataService";

export default class QuizPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      quizStarted: false,
      showAnswer: false,
      isAnimating: false
    };
    this.componentRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const data = DataService.getQuizData(this.props.data);
    const showAnswer = this.state.showAnswer;

    return (
      <div className='QuizPage page' ref={this.componentRef}>
        <h2>Das Bauernhof-Quiz</h2>

        <div>
          <DraggableBarChart showAnswer={showAnswer}
                             isAnimating={this.props.isAnimating}
                             data={data}/>

          <div className='toggle-container'>
            <p className={showAnswer ? 'show' : 'hide'}>Antwort: Tatsächlich ist es so, dass besonders kleine Betriebe
              leiden. Ihr Land und die Höfe werden von grösseren Betrieben übernommen. Auch mittelgrosse Betriebe haben
              Schwierigkeiten. Nur grosse und zusammengelegte Höfe können sich behaupten: Ihre Anzahl ist um das
              Mehrfache gestiegen.</p>
            <Button className={!showAnswer ? 'show fade-in' : 'hide'}
                    onClick={() => this.setState({showAnswer: true})}
                    variant="dark">Hast du fertig geraten? Lösung zeigen!</Button>
          </div>

        </div>
      </div>
    )
  }
}
