import * as React from "react";
import SvgImage from "../res/imgs/SvgImage";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import {Image} from "react-bootstrap";
import {Icons} from "../res/imgs/Icons";
import AnimatedRelations from "./AnimatedRelations";

export default class Introduction extends React.Component {

  constructor(params) {
    super(params);

    this.state = {
      elementsCount: 10,
      sizeState: 0,
      staticObj: Icons.farmSmall,
      staticObjFill:'#4ec291'
    }
  }

  render() {
    const {elementsCount, sizeState, staticObj, staticObjFill} = this.state;
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
                             animObjCount={elementsCount} animObjW={40} animObjH={27}
                             staticObj={staticObj}
                             staticObjW={109} staticObjH={66} staticObjFill={staticObjFill}/>

          <div className='label-container'>
            <p>{this.getExplanationText(sizeState)}</p>
          </div>

          <div className='slider-container'>
            <input id='elements-slider' type='range'
                   min={1} max={50}
                   value={elementsCount}
                   list='tickMarks'
                   onChange={() => this.changeElementsCount()}/>
            <datalist id='tickMarks'>
              <option value='10'/>
              <option value='30'/>
            </datalist>
            <div className='tick-labels'>
              <p>10 ha</p>
              <p>30 ha</p>
              <p>50 ha+</p>
            </div>
          </div>

        </div>
      </div>
    )
  }

  getExplanationText(sizeState) {
    switch (sizeState) {
      case 0:
        return 'Auf einem kleinen Hof werden zwischen 0 und 20 Kühen gehalten. Der gleiche Platz mit Ackerland würde auch reichen, um 60 Tonnen Weizen anzubauen.';
      case 1:
        return 'Bei einer mittleren Bauernhofsgrösse können bereits beachtliche Erträge erzielt werden: 10 bis 30 ha reichen aus, um entweder bis zu 60 Kühe zu halten oder 180 Tonnen Weizen zu ernten.';
      case 2:
        return 'Schweizer Grossbetriebe sind zwar nicht mit Grossbetrieben wie etwa aus den USA messbar. Doch auch in der Schweiz übertreffen die Grossbetriebe die Anbaumöglichkeiten von kleinen Höfen um das x-Fache.'
      default:
        return '?'
    }
  }

  changeElementsCount() {
    const newValue = document.getElementById('elements-slider').valueAsNumber;
    console.log(newValue, this.state);
    if (newValue <= 10) {
      this.setState({
        sizeState: 0,
        staticObj: Icons.farmSmall,
        staticObjFill:'#4ec291'
      })
    } else if (newValue > 10 && newValue <= 30) {
      this.setState({
        sizeState: 1,
        staticObj: Icons.farmMedium,
        staticObjFill:'#42a3f1'
      })
    } else {
      this.setState({
        sizeState: 2,
        staticObj: Icons.farmLarge,
        staticObjFill:'#e396d1'
      })
    }
    this.setState({elementsCount: newValue})

  }

  printIcons(name, type, count) {
    let container = [];
    for (let i = 0; i < count; i++) {
      container[i] = <Image src={type} key={name + i}/>
    }
    return <div className={name}>{container}</div>;
  }
}