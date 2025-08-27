import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={< Dashboard />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
