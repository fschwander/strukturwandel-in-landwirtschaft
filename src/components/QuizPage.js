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
        <h2>Das Bauernhof-Quiz</h2>

        <div>
          <DraggableBarChart showAnswer={showAnswer}
                             isAnimating={this.state.isAnimating}
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
