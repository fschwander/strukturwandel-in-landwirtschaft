import * as React from "react";
import cowImg from "../res/imgs/cow.svg";
import wheatImg from "../res/imgs/wheat.svg";
import farmImg from "../res/imgs/farm.svg";
import Image from "react-bootstrap/Image";


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
        <div className='horizontal-container'>
          <div>
            <Image src={farmImg}/>
            <p>by Symbolon (abgeändert)</p>
          </div>
          <div>
            <Image src={cowImg} className='cowImg'/>
            <p>by Dumitriu Robert</p>
          </div>
          <div>
            <Image src={wheatImg}/>
            <p>by Rose Alice Design</p>
          </div>

        </div>
        <p>All icons from the Noun Project</p>

      </div>
    )
  }
}