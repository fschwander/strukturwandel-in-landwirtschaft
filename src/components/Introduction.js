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
      areaSize: 8,
      sizeState: 0,
      staticObj: Icons.farmSmall,
      staticObjBackground: Icons.farmSmallBackground,
      staticObjFill: '#4ec291'
    }
  }

  render() {
    const {areaSize, sizeState, staticObj, staticObjBackground, staticObjFill} = this.state;
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
            <p>Bauernhöfe, die eine Betriebsfläche von weniger als 10 Hektar haben.</p>
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
                             animObjCount={areaSize * 2} animObjW={40} animObjH={27}
                             staticObj={staticObj}
                             staticObjBackground={staticObjBackground}
                             staticObjW={109} staticObjH={66} staticObjFill={staticObjFill}/>

          <div className='label-container'>
            <p>{this.getExplanationText(sizeState)}</p>
          </div>

          <div className='slider-container'>
            <input id='elements-slider' type='range'
                   min={0} max={50}
                   value={areaSize}
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
    const {areaSize} = this.state;
    switch (sizeState) {
      case 0:
        return `Auf einem kleinen Hof mit ${areaSize} Hektar können ${areaSize * 2} Kühe gehalten werden. Auf der gleichen Fläche wäre es auch möglich ${areaSize * 6} Tonnen Weizen angebaut werden.`;
      case 1:
        return `Bei einer mittleren Bauernhofsgrösse können bereits beachtliche Erträge erzielt werden: ${areaSize} reichen aus, um entweder ${areaSize * 2} Kühe zu halten oder ${areaSize * 6} Tonnen Weizen zu ernten.`;
      case 2:
        return `Schweizer Grossbetriebe sind zwar nicht mit Grossbetrieben wie jenen aus den USA vergleichbar. Doch auch in der Schweiz übertreffen die Grossbetriebe die Anbaumöglichkeiten von kleinen Höfen um das x-fache.`
      default:
        return '?'
    }
  }

  changeElementsCount() {
    const newValue = document.getElementById('elements-slider').valueAsNumber;
    if (newValue <= 20) {
      this.setState({
        sizeState: 0,
        staticObj: Icons.farmSmall,
        staticObjBackground: Icons.farmSmallBackground,
        staticObjFill: '#4ec291'
      })
    } else if (newValue > 10 && newValue < 30) {
      this.setState({
        sizeState: 1,
        staticObj: Icons.farmMedium,
        staticObjBackground: Icons.farmMediumBackround,
        staticObjFill: '#42a3f1'
      })
    } else {
      this.setState({
        sizeState: 2,
        staticObj: Icons.farmLarge,
        staticObjBackground: Icons.farmLargeBackround,
        staticObjFill: '#e396d1'
      })
    }
    this.setState({areaSize: newValue})

  }

  printIcons(name, type, count) {
    let container = [];
    for (let i = 0; i < count; i++) {
      container[i] = <Image src={type} key={name + i}/>
    }
    return <div className={name}>{container}</div>;
  }
}