import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrderPage />} />
    </Routes>
    
  )
}

export default App
