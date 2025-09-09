import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import { useRole } from './hooks/useRole'
import BrandDashboard from './components/brands/BrandDashboard'
import Cart from './components/Cart'
import NewProductForm from './components/brands/NewProductForm'
import EditProductForm from './components/brands/EditProductForm'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { loading } = useAuth()
  const { userRole } = useRole()

  if(loading) {
    return <div>Loading...</div>
  }

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

        {userRole === 'brand' && (
          <Route path="/products/new" element={<NewProductForm />} />
        )}

        {userRole === 'brand' && (
          <Route path="/products/:productId/edit" element={<EditProductForm />} />
        )}
        
        {userRole === 'super_admin' && (
          <Route path="/admin" element={<AdminPanel />} />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
