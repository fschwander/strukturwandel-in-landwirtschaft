import * as React from "react";

export default class Header extends React.Component {
  render() {
    return(
      <div className='Header'>

        <div className='screen-size-warn-container'>
          Diese Website ist nicht für kleine Bildschirme optimiert. Daheim auf dem grossen Bildschirm macht sie wesentlich mehr Spass. :)
        </div>

        <h1>Strukturwandel in der Landwirtschaft</h1>

        <p>Seit Jahren spricht man über einen Rückgang von Bauernhöfen: Für viele Bäuerinnen und Bauern lohnt sich
          offenbar der Landwirtschaftsbetrieb nicht mehr und sie geben ihre Höfe auf.</p>
        <p>Die folgenden Visualisierungen zeigen, wie sich die Schweizer Landwirtschaft in den letzten 35 Jahren
          tatsächlich verändert hat.</p>
      </div>
    )
  }
}