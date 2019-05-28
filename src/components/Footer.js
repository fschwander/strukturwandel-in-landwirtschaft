import * as React from "react";
import SvgImage from "../res/imgs/SvgImage";
import {Icons} from "../res/imgs/Icons";


export default class Footer extends React.Component {

  render() {
    return (
      <div className='Footer'>
        <h2>Credits</h2>
        <p>Konzept, Design, Code: Fabian Schwander</p>
        <p>Daten: Bundesamt für Statistik
          <a target='_blank' rel="noopener noreferrer"
             href='https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/tabellen.assetdetail.8346709.html'> ></a>
        </p>

        <div className='horizontal-container centered'>
            <SvgImage className='farmOrig' src={Icons.farmOriginal} width={80} vbWidth={155} vbHeight={110}/>
            <SvgImage className='cow' src={Icons.cow} width={60} vbWidth={96} vbHeight={80}/>
            <SvgImage className='wheat' src={Icons.wheat} width={70} vbWidth={38} vbHeight={80}/>
        </div>

        <div className='horizontal-container'>
          <p>Symbolon (modifiziert)</p>
          <p>Dumitriu Robert</p>
          <p>Rose Alice Design</p>
        </div>
        <p>...alle Icons vom the Noun Project</p>

      </div>
    )
  }
}