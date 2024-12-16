import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <Outlet></Outlet>
    </>
  )
}

export default App
