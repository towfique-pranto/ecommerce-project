import dayjs from "dayjs";
import axios from "axios";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Link } from "react-router";
import "./Tracking.css";
import { useEffect, useState } from "react";

export function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${orderId}?expand=products`).then((response) => {
      setOrder(response.data);
    });
  }, [orderId]);

  if (!order) {
    return null;
  }
  const selectedOrder = order.products.find((product) => {
    return product.productId === productId;
  });
  //console.log(selectedOrder);
  const totaldeliveryTimeMs =
    selectedOrder.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const progressTime = (timePassedMs / totaldeliveryTimeMs) * 100;
  const deliveryPercent = Math.min(Math.max(progressTime, 0), 100);
  //console.log(progressTime);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(selectedOrder.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D",
            )}
          </div>

          <div className="product-info">{selectedOrder.product.name}</div>

          <div className="product-info">Quantity: {selectedOrder.quantity}</div>

          <img className="product-image" src={selectedOrder.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              style={{ width: `${deliveryPercent}%` }}
              className="progress-bar"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
