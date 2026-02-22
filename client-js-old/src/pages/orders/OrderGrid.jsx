import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react";
import { formatMoney } from "../../utils/money";
import buyAgainImg from "../../assets/images/icons/buy-again.png";

export function OrderGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{formatMoney(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              {order.products.map((orderProduct) => {
                const orderId = order.id;
                const productId = orderProduct.product.id;

                const addToCart = async () => {
                  await axios.post("/api/cart-items", {
                    productId: orderProduct.product.id,
                    quantity: 1,
                  });
                  await loadCart();
                };

                return (
                  <Fragment key={orderProduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderProduct.product.image} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderProduct.product.name}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                          "MMMM D",
                        )}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>
                      <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src={buyAgainImg} />
                        <span className="buy-again-message" onClick={addToCart}>
                          Add to Cart
                        </span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <a href={`/tracking/${orderId}/${productId}`}>
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
  );
}
