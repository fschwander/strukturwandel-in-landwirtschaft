import * as React from "react";
import FarmImg from "../res/imgs/FarmImg";

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
      </div>
    )
  }
}