import React from 'react'
// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Editor from './components/Editor'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/write" element={<Editor />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
