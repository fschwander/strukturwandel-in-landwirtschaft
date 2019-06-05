import * as React from "react";
import SvgImage from "../res/imgs/SvgImage";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import {Image} from "react-bootstrap";
import {Icons} from "../res/imgs/Icons";
import AnimatedRelations from "./AnimatedRelations";

export default class Introduction extends React.Component {

  render() {
    return (
      <div className='Introduction'>

        <div>
          <h2>Anbaumöglichkeiten pro Hektar</h2>

          <div className='horizontal-container relations-container'>
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
          <SvgImage className='farmSmall'
                    src={Icons.farmSmall} width={90} vbWidth={155} vbHeight={143}
                    fill={'#4ec291'}/>
          <SvgImage className='farmMedium'
                    src={Icons.farmMedium} width={100} vbWidth={155} vbHeight={143}
                    fill={'#42a3f1'}/>
          <SvgImage className='farmLarge'
                    src={Icons.farmLarge} width={110} vbWidth={155} vbHeight={143}
                    fill={'#e396d1'}/>
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
          <AnimatedRelations name='farmSmall' animObjName='cow'
                             animObj={Icons.cow}
                             animObjCount={20} animObjW={40} animObjH={27}
                             staticObj={Icons.farmSmall}
                             staticObjW={109} staticObjH={66} staticObjFill={'#4ec291'}/>
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