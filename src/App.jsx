import Chart from './allCharts/Chart'
import StatusPieChart from './allCharts/StatusPieChart'
import './App.css'
import PieChart from './PieChart';

function App() {
  const rawData = [
    { id: 1, status: 'Completed' },
    { id: 2, status: 'in progress' },
    { id: 3, status: 'COMPLETED' },
    { id: 4, status: 'Pending' },
    { id: 5, status: 'in_progress' },
    { id: 13, status: 'cancelled' },
    { id: 14, status: 'COMPLETED' },
    { id: 15, status: 'a' },
    { id: 15, status: 'b' },

  ];
    const chartData = [
      // { label: "b", value: 75, color: "#cc65fe" },
      { label: "c", value: 40, color: "#ff6384" },
      { label: "D", value: 10, color: "#ffce56" },
      { label: "e", value: 25, color: "#ffae26" },
      { label: "agerf", value: 25, color: "#36a2eb" },
  ];
  return (
    <div style={{backgroundColor:'gray'}}>
      {/* <Chart data={rawData}/> */}
      <StatusPieChart rawData={rawData}/>
      <hr />
        <PieChart data={chartData} radius={100}  innerRadius={60}/>

    </div>
  )
}

export default App
