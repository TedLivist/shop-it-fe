import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import { useRole } from './hooks/useRole'
import BrandDashboard from './components/brands/BrandDashboard'
import Cart from './components/Cart'

function App() {
  const { userRole } = useRole()

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={< Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

        {userRole === 'brand' && (
          <Route path="/brand-dashboard" element={<BrandDashboard />} />
        )}
        
        {userRole === 'super_admin' && (
          <Route path="/admin" element={<AdminPanel />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
