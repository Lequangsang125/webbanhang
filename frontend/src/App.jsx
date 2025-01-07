import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import ScrollToTop from './component/ScrollToTop'

function App() {
  return (
    <>
      <Navbar/>
      <Outlet></Outlet>
      <ScrollToTop/>
      <Footer/>
    </>
  )
}

export default App
