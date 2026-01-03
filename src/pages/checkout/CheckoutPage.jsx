import axios from "axios";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { useState, useEffect } from "react";
import { PaymentSummary } from "./PaymentSummary";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutPage({ cart, laodCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  // Fetch data for the whole checkout page.
  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response =  await axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
        setDeliveryOptions(response.data);
    }
    fetchCheckoutData();

  }, []);

  // Fetch data for the payment summary.
  useEffect(() => {
    const fetchPaymentSummary = async () => {

      const response = await axios.get("/api/payment-summary")
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();

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