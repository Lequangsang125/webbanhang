import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <Outlet></Outlet>
      <Footer/>
    </>
  )
}

export default App
