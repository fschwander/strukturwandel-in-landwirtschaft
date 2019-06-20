import * as React from "react";
import SvgImage from "../res/imgs/SvgImage";
import {Icons} from "../res/imgs/Icons";
import AnimatedRelations from "./AnimatedRelations";

export default class Introduction extends React.Component {

  constructor(params) {
    super(params);

    this.state = {
      areaSize: 10,
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
            <p>bis 10 Hektar</p>
          </div>
          <div>
            <h3>mittlere Betriebe</h3>
            <p>zwischen 10 und 30 Hektar</p>
          </div>
          <div>
            <h3>Grossbetriebe</h3>
            <p>50 Hektar und mehr</p>
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
                   min={1} max={50}
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
              <p>50+ ha</p>
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
        return `Auf einem kleinen Hof mit ${areaSize} Hektar können ${areaSize * 2} Kühe gehalten werden. Auf der gleichen Fläche wäre es auch möglich ${areaSize * 6} Tonnen Weizen anzubauen.`;
      case 1:
        return `Bei einer mittleren Bauernhofsgrösse können bereits beachtliche Erträge erzielt werden: ${areaSize} reichen aus, um entweder ${areaSize * 2} Kühe zu halten oder ${areaSize * 6} Tonnen Weizen zu ernten.`;
      case 2:
        return `Schweizer Grossbetriebe sind zwar nicht mit Grossbetrieben wie jenen aus den USA vergleichbar. Ein Hof mit ${areaSize} Hektar übertrifft die Wirtschaftlichkeit von kleinen Betrieben aber um das x-fache.`
      default:
        return '?'
    }
  }

  changeElementsCount() {
    const newValue = document.getElementById('elements-slider').valueAsNumber;
    if (newValue <= 10) {
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
}