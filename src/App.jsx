import Chart from './allCharts/Chart'
import StatusPieChart from './allCharts/StatusPieChart'
import './App.css'

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
    { id: 15, status: 'c' },
    { id: 15, status: 'd' },
    { id: 15, status: 'e' },
    { id: 15, status: 'f' },
    { id: 15, status: 'g' },
    { id: 15, status: 'h' },
    { id: 15, status: 'i' },
    { id: 15, status: 'j' },
    { id: 15, status: 'k' },
    { id: 15, status: 'l' },
    { id: 15, status: 'm' },
    { id: 15, status: 'n' },
    { id: 15, status: 'o' },
    { id: 15, status: 'p' },
    { id: 15, status: 'q' },
    { id: 15, status: 'r' },
    { id: 15, status: 's' }

  ];
  return (
    <>
      <h1>h</h1>
      <Chart data={rawData}/>
      <StatusPieChart rawData={rawData}/>

    </>
  )
}

export default App
