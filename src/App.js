import DataService from "./services/DataService";
import RelativeLineChart from "./components/RelativeLineChart";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import QuizPage from "./components/QuizPage";
import FarmsCountStackedAreaChart from "./components/FarmsCountStackedAreaChart";
import Footer from "./components/Footer";
import GrowPossibilities from "./components/GrowPossibilities";
import ReactPageScroller from 'react-page-scroller';
import {useEffect, useState} from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [labelMap, setLabelMap] = useState(null);

  const [activePage, setActivePage] = useState(3);

  const loadData = () => {
    DataService.getFullData().then((data) => {
      setData(data);
      setLineChartData(DataService.getNormalizedLineChartData(data));
      setLabelMap(DataService.getLabelMap())
    });
  }

  const onPageChange = (no) => {
    setActivePage(no);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="App">
      <ReactPageScroller pageOnChange={onPageChange} customPageNumber={activePage}>
        <Header/>
        <GrowPossibilities/>
        <Introduction/>
        {data && <QuizPage data={data} isAnimating={activePage === 3}/>}
        {data && <FarmsCountStackedAreaChart data={data}/>}
        {data && <RelativeLineChart data={lineChartData} labelMap={labelMap}/>}
        <Footer/>
      </ReactPageScroller>
    </div>
  )
}

export default App;
