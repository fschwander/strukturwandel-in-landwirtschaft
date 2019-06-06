import * as React from "react";
import SvgImage from "../res/imgs/SvgImage";
import {Icons} from "../res/imgs/Icons";


export default class Footer extends React.Component {

  render() {
    return (
      <div className='Footer'>
        <h2>Credits</h2>
        <p>Konzept, Design, Code: Fabian Schwander</p>
        <p>Daten zu Bauernhofsbeständen: Bundesamt für Statistik&nbsp;
          <a target='_blank' rel="noopener noreferrer"
             href='https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/tabellen.assetdetail.8346709.html'>></a>
        </p>
        <p>
          Daten zu Anbaumöglichkeiten: Daniel Erdin, Leiter Agristat (Statistischer Verband des Schweizerischen Bauernverbands)&nbsp;
          <a target='_blank' rel='noreferrer noopener'
          href='https://www.sbv-usp.ch/de/services/agristat/'>></a>
        </p>

        <div className='horizontal-container centered'>
            <div>
              <SvgImage className='farmOrig' src={Icons.farmOriginal} width={65} vbWidth={155} vbHeight={110}/>
              <p>by Symbolon (modifiziert)</p>
            </div>
          <div>
            <SvgImage className='cow' src={Icons.cow} width={40} vbWidth={40} vbHeight={27}/>
            <p>by Dumitriu Robert</p>
          </div>
          <div>
            <SvgImage className='wheat' src={Icons.wheat} width={45} vbWidth={10} vbHeight={28}/>
            <p>by Rose Alice Design</p>
          </div>
        </div>

        <p>...alle Icons vom the Noun Project&nbsp;
        <a target='_blank' rel="noopener noreferrer"
           href='https://thenounproject.com/'>></a>
        </p>

      </div>
    )
  }
}