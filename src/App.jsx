import { HomePage } from './pages/home/HomePage';
import { OrderPage } from './pages/orders/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { Routes, Route } from 'react-router'
import { NotFoundPage } from './pages/NotFoundPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  const laodCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
    }

  useEffect(() => {
    laodCart();
  }, []);
  
  return (
    <Routes>
      <Route index element={
          <HomePage 
          cart={cart} 
          laodCart={laodCart} 
        />} 
      />

      <Route path="checkout" element={<CheckoutPage 
      cart={cart} />} />
      <Route path="orders" element={<OrderPage cart={cart}/>} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
    
  )
}

export default App
