import * as React from "react";
import FarmImg from "../res/imgs/FarmImg";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import {Image} from "react-bootstrap";

export default class Header extends React.Component {

  render() {
    return (
      <div className='Header'>
        <h1>Strukturwandel in der Landwirtschaft</h1>

        <p>Seit Jahren spricht man über einen Rückgang von Bauernhöfen: Für viele Bäuerinnen und Bauern lohnt sich
          offenbar der Landwirtschaftsbetrieb nicht mehr und sie geben ihre Höfe auf.</p>
        <p>Die folgenden Visualisierungen zeigen, wie sich die Schweizer Landwirtschaft in den letzten 35 Jahren
          tatsächlich verändert hat.</p>

        <div>
          <h2>Anbaumöglichkeiten pro Hektar</h2>

          <div className='horizontal-container'>
            <div>
              {this.printIcons('cow', cowImg, 2)}
              <p>In der Schweiz reicht ein Hektar Land zur Ernährung von rund 2 Kühen.</p>
            </div>

            <div>
              {this.printIcons('wheat', wheatImg, 6)}
              <p>Auf einem Hektar Ackerland können 6 Tonnen Weizen angebaut werden.</p>
            </div>

          </div>
        </div>

        <h2>Grössenkategorien</h2>

        <div className='horizontal-container top'>
          <FarmImg width={'80px'} fill={'#4ec291'}/>
          <FarmImg width={'100px'} fill={'#42a3f1'}/>
          <FarmImg width={'120px'} fill={'#e396d1'}/>
        </div>

        <div className='horizontal-container bottom'>
          <div>
            <h3>kleine Betriebe</h3>
            <p>Beuernhöfe, die eine Betriebsfläche von weniger als 10 Hektar haben.</p>
          </div>
          <div>
            <h3>mittlere Betriebe</h3>
            <p>Mittelgrosse Höfe haben eine Fläche zwischen 10 und 30 Hektar.</p>
          </div>
          <div>
            <h3>Grossbetriebe</h3>
            <p>Die grössten Betriebe haben eine Fläche von 30 Hektar oder mehr.</p>
          </div>
        </div>

        <div className='capacity-container'>
          <div className='horizontal-container'>
            <div className='arrow'>
              <i className='up'/>
              <div className='line'/>
            </div>
            <div className='arrow'>
              <i className='up'/>
              <div className='line'/>
            </div>
          </div>

          <div className='horizontal-container'>
            <div className='relations-container'>
              <p>In Kleinbetrieben können demnach bis zu 20 Kühe pro Hof gehalten werden.</p>
              {this.printIcons('cowImg', cowImg, 20)}
            </div>
            <div className='relations-container'>
              <p>Auf Grossbetrieben können Herden von 60 Tieren oder mehr gehalten.</p>
              {this.printIcons('cowImg', cowImg, 60)}
            </div>
          </div>

          <div className='horizontal-container'>
            <div className='relations-container'>
              <p>Kleinbetriebe reichen um bis zu 60 Tonnen Weizen anzubauen.</p>
              {this.printIcons('wheatImg', wheatImg, 60)}
            </div>
            <div className='relations-container'>
              <p>Grossbetriebe ermöglichen den Anbau von über 180 Tonnen.</p>
              {this.printIcons('wheatImg', wheatImg, 180)}
            </div>
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