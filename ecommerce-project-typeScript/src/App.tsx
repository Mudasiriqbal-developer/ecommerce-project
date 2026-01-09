import { HomePage } from './pages/home/HomePage';
import { OrderPage } from './pages/orders/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
    }

  useEffect(() => {
    loadCart();
  }, []);
  
  return (
    <Routes>
      <Route index element={
          <HomePage 
          cart={cart} 
          loadCart={loadCart} 
        />} 
      />

      <Route path="checkout" element={<CheckoutPage 
          cart={cart} 
          loadCart={loadCart}
        />} 
      />
      <Route path="orders" element={<OrderPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
    
  )
}

export default App
