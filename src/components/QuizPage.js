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

  handleScroll = e => {
    const scrollTop = e.target.scrollingElement.scrollTop;
    const offsetTop = this.componentRef.current.offsetTop;
    const elementHeight = this.componentRef.current.offsetHeight;

    if (scrollTop > offsetTop - 400 && scrollTop < offsetTop + elementHeight / 2) {
      if(this.state.isAnimating !== true) {
        this.setState({isAnimating: true});
      }
    } else {
      if(this.state.isAnimating !== false) {
        this.setState({isAnimating: false});
      }
    }
  };

  render() {
    const data = DataService.getQuizData(this.props.data);
    const showAnswer = this.state.showAnswer;
    const quizStarted = this.state.quizStarted;

    return (
      <div className='QuizPage' ref={this.componentRef} onScroll={this.handleScroll}>
        <h2>Quiz</h2>

        <p>Ausgehend vom Jahr 1985, wo der Bestand 100% betrug: Wie viele kleinere, mittlere und grosse Bauernhöfe gibt
          es heute?</p>

        {/*<p>Schätze, wie sich die Anzahl der Bauernhöfe verändert hat!</p>*/}

        <Button className={!quizStarted ? 'show quizButton' : 'hide'}
                onClick={() => this.setState({quizStarted: true})}
                variant="dark">Quiz starten!</Button>

        <div className={quizStarted ? 'show' : 'hide'}>
          {quizStarted ? <DraggableBarChart showAnswer={showAnswer} data={data}/> : null }

          <p className={showAnswer ? 'show' : 'hide'}>Tatsächlich ist es so, dass besonders unter den kleineren
            Bauernhöfen ein regelrechtes Massensterben beobachtet werden kann. Auch mittelgrosse Betriebe haben
            Schwierigkeiten. Nur grosse oder zusammengelegte Höfe können sich behaupten: Ihre Anzahl ist um das
            Mehrfache
            gestiegen.</p>
        </div>

        <Button className={quizStarted && !showAnswer ? 'show' : 'hide'}
                onClick={() => this.setState({showAnswer: true})}
                variant="dark">Antwort zeigen</Button>
      </div>
    )
  }
}