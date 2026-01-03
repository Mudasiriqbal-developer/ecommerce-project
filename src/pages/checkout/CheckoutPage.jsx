import axios from "axios";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { useState, useEffect } from "react";
import { PaymentSummary } from "./PaymentSummary";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutPage({ cart, laodCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutPageData = async () => {
      let response =  await axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
        setDeliveryOptions(response.data);

     response = await axios.get("/api/payment-summary")
      setPaymentSummary(response.data);
    }
    fetchCheckoutPageData();

  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <OrderSummary 
            cart={cart} 
            deliveryOptions={deliveryOptions} 
            laodCart={laodCart}
          />

          <PaymentSummary 
            paymentSummary={paymentSummary} 
            laodCart={laodCart}
          />

        </div>
      </div>
    </>
  );
}