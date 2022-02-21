import DataService from "./services/DataService";
import RelativeLineChart from "./components/RelativeLineChart";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import QuizPage from "./components/QuizPage";
import FarmsCountStackedAreaChart from "./components/FarmsCountStackedAreaChart";
import Footer from "./components/Footer";
import GrowPossibilities from "./components/GrowPossibilities";
import {useEffect, useState} from "react";
import {FullPage, Slide} from "react-full-page";

const App = () => {
  const [data, setData] = useState();
  const [lineChartData, setLineChartData] = useState()
  const [labelMap, setLabelMap] = useState()

  useEffect(() => {
    DataService.getFullData().then(data => {
      const normalized = DataService.getNormalizedLineChartData(data)
      const labels = DataService.getLabelMap()
      setData(data)
      setLineChartData(normalized);
      setLabelMap(labels)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className="App">
      <FullPage>
        <Slide>
          <Header/>
        </Slide>

        <Slide>
          <GrowPossibilities/>
        </Slide>

        <Slide>
          <Introduction/>
        </Slide>

        <Slide>
          {data && <QuizPage data={data}/>}
        </Slide>

        <Slide>
          {data && <FarmsCountStackedAreaChart data={data}/>}
        </Slide>

        <Slide>
          {lineChartData && <RelativeLineChart data={lineChartData} labelMap={labelMap}/>}
        </Slide>

        <Slide>
          <Footer/>
        </Slide>
      </FullPage>
    </div>
  )
}

export default App;
