import * as React from "react";
import SvgImage from "../res/imgs/SvgImage";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import {Image} from "react-bootstrap";
import {Icons} from "../res/imgs/Icons";

export default class Introduction extends React.Component {

  render() {
    return (
      <div className='Introduction'>
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
          <SvgImage src={Icons.farmSmall} width={'90px'} fill={'#4ec291'}/>
          <SvgImage src={Icons.farmMedium} width={'100px'} fill={'#42a3f1'}/>
          <SvgImage src={Icons.farmLarge} width={'110px'} fill={'#e396d1'}/>
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

          <div className='horizontal-container centered'>
            <p className='color-small'>0 bis 20 Kühe</p>
            <div className='arrow'>
              <i className='up'/>
              <div className='line'/>
            </div>
            <p className='color-medium'>20 bis 60 Kühe</p>
            <div className='arrow'>
              <i className='up'/>
              <div className='line'/>
            </div>
            <p className='color-large'>60 Kühe und mehr</p>
          </div>

          <div className='horizontal-container'>
            <div className='relations-container'>
              <p>Kleinbetriebe haben wenig Platz. In mittleren Betrieben werden zwischen 20 Kühen...</p>
              {this.printIcons('cowImg', cowImg, 20)}
            </div>
            <div className='relations-container'>
              <p>...und 60 Kühen gehalten. Auf Grossbetrieben gibt es Herden von 60 Tieren und mehr.</p>
              {this.printIcons('cowImg', cowImg, 60)}
            </div>
          </div>

          <div className='horizontal-container centered'>
            <p className='color-small'>0 bis 60 t</p>
            <div className='arrow'>
              <i className='up'/>
              <div className='line'/>
            </div>
            <p className='color-medium'>60 bis 180 t</p>
            <div className='arrow'>
              <i className='up'/>
              <div className='line'/>
            </div>
            <p className='color-large'>180 t und mehr</p>
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