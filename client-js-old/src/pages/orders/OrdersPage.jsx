import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { OrderGrid } from "./OrderGrid";

export function OrdersPage({ cart, loadCart }) {
  const [orders, SetOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      SetOrders(response.data);
    };
    fetchOrderData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrderGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
