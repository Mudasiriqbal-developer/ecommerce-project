import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { Routes, Route } from 'react-router'
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrderPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
  )
}

export default App
