import * as React from "react";
import DraggableBarChart from "./DraggableBarChart";

export default class QuizPage extends React.Component {

  render() {
    return (
      <div className='QuizPage background-container-outer'>
        <div className='background-container-inner'>

          <DraggableBarChart quizData={this.props.quizData}/>

        </div>
      </div>
    )
  }
}