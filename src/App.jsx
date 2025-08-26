import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={} /> */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
