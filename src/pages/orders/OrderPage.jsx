import "./OrderPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../utils/money";
import { Header } from "../../components/Header";
import { useState, useEffect, Fragment } from "react";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

export function OrderPage({ cart }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    axios.get("/api/orders?expand=products")
      .then((response) => {
        console.log("API Response:", response.data); // Debug log
        setOrders(response.data || []);
        // Add this to see what the API actually returns
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
        setOrders([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">Your Orders</div>
          <div className="loading">Loading orders...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">Your Orders</div>
          <div className="error-message">{error}</div>
        </div>
      </>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <>
        <Header cart={cart} />
        <div className="orders-page">
          <div className="page-title">Your Orders</div>
          <div className="no-orders">You have no orders yet.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            // Check if order exists and has products
            if (!order || !order.products || !Array.isArray(order.products)) {
              return (
                <div key={order?.id || Math.random()} className="order-container">
                  <div className="error">Error loading this order</div>
                </div>
              );
            }

            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {order.orderTimeMs 
                          ? dayjs(order.orderTimeMs).format("MMMM D")
                          : "Date not available"}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents || 0)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id || "N/A"}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    // Check if product exists
                    if (!orderProduct || !orderProduct.product) {
                      return null;
                    }

                    return (
                      <Fragment key={`${order.id}-${orderProduct.product.id || Math.random()}`}>
                        <div className="product-image-container">
                          <img 
                            src={orderProduct.product.image || "/placeholder.png"} 
                            alt={orderProduct.product.name}
                          />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name || "Unknown Product"}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {orderProduct.estimatedDeliveryTimeMs
                              ? dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")
                              : "Delivery date not available"}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity || 1}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src={BuyAgainIcon}
                              alt="Buy Again"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href={`/tracking/${order.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}