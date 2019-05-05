import * as React from "react";
import FarmImg from "../res/imgs/FarmImg";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import {Image} from "react-bootstrap";

export default class Header extends React.Component {

  render() {
    return (
      <div className='Header'>
        <h1>Das grosse Bauernsterben?</h1>

        <p>Immer wieder liest man davon, dass für die Schweizer Bäuerinnen und Bauer die Existenz gefährdet ist:
          Für viele Betriebe lohnt sich die Landwirtschft nicht mehr und sie verschwinden.</p>

        <h2>Grössenkategorien</h2>

        <div className='horizontal-container top'>
            <FarmImg width={'80px'} fill={'#4ec291'}/>
            <FarmImg width={'100px'} fill={'#42a3f1'}/>
            <FarmImg width={'120px'} fill={'#e396d1'}/>
        </div>

        <div className='horizontal-container bottom'>
          <div>
            <h3>kleine Höfe</h3>
            <p>Beuernhöfe, die eine Betriebsfläche von weniger als 10 Hektare haben.</p>
          </div>
          <div>
            <h3>mittlere Höfe</h3>
            <p>Mittelgrosse Höfe haben eine Fläche zwischen 10 und 30 Hektaren.</p>
          </div>
          <div>
            <h3>grosse Höfe</h3>
            <p>Die grössten Betriebe haben eine Fläche von 30 Hektaren oder mehr.</p>
          </div>
        </div>

        <h2>Anbaumöglichkeiten pro Hektar</h2>

        <h3>Kühe</h3>
        <p>In der Schweiz reicht ein Hektar zum ernähren von rund 2 Kühen.</p>

        <div className='horizontal-container'>
          <div className='relations-container'>
            <p>In Kleinbetrieben können demnach bis zu 20 Kühe pro Hof gehalten werden.</p>
            {this.printIcons('cowImg', cowImg, 20)}
          </div>
          <div className='relations-container'>
            <p>Auf Grossbetrieben werden beachtliche Herden von 60 Tieren oder mehr gehalten.</p>
            {this.printIcons('cowImg', cowImg, 60)}
          </div>
        </div>

        <h3>Weizen</h3>
        <p>Auf einem Hektar Ackerland können 6 Tonnen Weizen angebaut werden.</p>


        <div className='horizontal-container'>
          <div className='relations-container'>
            <p>Kleinbetriebe reichen demnach um bis zu 60 Tonnen Weizen anzubauen.</p>
            {this.printIcons('wheatImg', wheatImg, 60)}
          </div>
          <div className='relations-container'>
            <p>Grossbetriebe ermöglichen den Anbau von über 180 Tonnen.</p>
            {this.printIcons('wheatImg', wheatImg, 180)}
          </div>
        </div>
      </div>
    )
  }

  printIcons(name, type, count) {
    let container = [];
    for (let i = 0; i < count; i++) {
      container[i] = <Image src={type} />
    }
    return <div className={name}>{container}</div>;
  }
}