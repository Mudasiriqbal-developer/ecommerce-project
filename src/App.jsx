import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrderPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
    
  )
}

export default App
