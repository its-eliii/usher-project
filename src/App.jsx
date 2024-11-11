import { useState } from 'react'
import Header from './header-footer/Header'
import Footer from './header-footer/Footer'
import Graph1 from './Graph1'
import Graph2 from './Graph2'
import Graph3 from './Graph3'
import Graph4 from './Graph4'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <div className="graph-list">
        <Graph1 />
        <Graph2 />
        <Graph3 />
        <Graph4 />
      </div>

      <Footer />
    </> 
  )
}

export default App
