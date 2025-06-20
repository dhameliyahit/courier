import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Branch from './pages/Branch'

const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/branch/:name" element={<Branch/>}/>
        </Routes>
    </>
  )
}

export default App