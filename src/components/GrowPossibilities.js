import React from "react";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import {Image} from "react-bootstrap";

export default class GrowPossibilities extends React.Component {

  render() {
    return (
      <div className='GrowPossibilities'>
        <h2>Anbaumöglichkeiten pro Hektar</h2>

        <div className='horizontal-container relations-container'>
          <div>
            {this.printIcons('cow', cowImg, 2)}
            <p>In der Schweiz reicht ein Hektar Land zur Ernährung von rund 2 Kühen</p>
          </div>

          <div>
            {this.printIcons('wheat', wheatImg, 6)}
            <p>Auf einem Hektar Ackerland können 6 Tonnen Weizen angebaut werden</p>
          </div>

        </div>
      </div>
    )
  }

  printIcons(name, type, count) {
    let container = [];
    for (let i = 0; i < count; i++) {
      container[i] = <Image src={type} key={name + i}/>
    }
    return <div className={name}>{container}</div>;
  }
}
