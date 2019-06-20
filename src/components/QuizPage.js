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
    const animStartPos = offsetTop + elementHeight * 0.75 - window.innerHeight;

    if (scrollTop > animStartPos && scrollTop < offsetTop + elementHeight / 2) {
      if (this.state.isAnimating !== true) {
        this.setState({isAnimating: true});
      }
    } else {
      if (this.state.isAnimating !== false) {
        this.setState({isAnimating: false});
      }
    }
  };

  render() {
    const data = DataService.getQuizData(this.props.data);
    const showAnswer = this.state.showAnswer;

    return (
      <div className='QuizPage' ref={this.componentRef} onScroll={this.handleScroll}>
        <h2>Quiz</h2>

        <p>Ausgehend vom Jahr 1985, wo der Bestand 100% betrug: Wie viele kleine, mittlere und grosse Bauernhöfe gibt
          es heute?</p>

        <div>
          <DraggableBarChart showAnswer={showAnswer}
                             isAnimating={this.state.isAnimating}
                             data={data}/>

          <div className='toggle-container'>
            <p className={showAnswer ? 'show' : 'hide'}>Tatsächlich ist es so, dass besonders kleine Betriebe leiden:
              Ihr Land und die Höfe werden von grösseren Betrieben übernommen. Auch mittelgrosse Betriebe haben
              Schwierigkeiten. Nur grosse und zusammengelegte Höfe können sich behaupten: Ihre Anzahl ist um das
              Mehrfache gestiegen.</p>
            <Button className={!showAnswer ? 'show fade-in' : 'hide'}
                    onClick={() => this.setState({showAnswer: true})}
                    variant="dark">Antwort zeigen</Button>
          </div>

        </div>
      </div>
    )
  }
}