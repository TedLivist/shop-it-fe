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
import Orders from './components/brands/Orders'
import OrderItem from './components/common/OrderItem'
import Metrics from './components/brands/Metrics'

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
        <Route path="/orderItem/:id" element={<OrderItem />} />

        {userRole === 'brand' && (
          <>
            <Route path="/brand-dashboard" element={<BrandDashboard />} />
            <Route path="/products/new" element={<NewProductForm />} />
            <Route path="/products/:productId/edit" element={<EditProductForm />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/metrics" element={<Metrics />} />
          </>
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
