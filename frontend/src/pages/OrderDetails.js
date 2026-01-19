import React, { useEffect, useState } from 'react';
import PublicLayout from '../Components/PublicLayout';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const userId = localStorage.getItem('userId');
  const [orderItems, setOrderItems] = useState([]);
  const [orderAddress, setOrderAddress] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const { order_number } = useParams();

  // 🔹 Fetch order items
  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    fetch(`http://127.0.0.1:8000/api/orders/by_order_number/${order_number}/`)
      .then(res => res.json())
      .then(data => {
        setOrderItems(data);
        const totalAmount = data.reduce((sum, item) => {
  const price = Number(item.food.Price) || 0;
  const qty = Number(item.quantity) || 0;
  return sum + price * qty;
}, 0);

        setTotal(totalAmount);
      })
      .catch(err => console.error(err));
  }, [userId, order_number, navigate]);

  // 🔹 Fetch order address
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/orders/by_order_address/${order_number}/`)
      .then(res => res.json())
      .then(data => {
        setOrderAddress(data);
      })
      .catch(err => console.error(err));
  }, [order_number]);

  return (
    <PublicLayout>
      <div className="container py-5">
        <h3 className="mb-4 text-primary">
          <i className="fas fa-receipt me-2"></i>
          Order #{order_number} Details
        </h3>

        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-md-8">
            {orderItems.map((item, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={`http://127.0.0.1:8000${item.food.image}`}
                      className="img-fluid rounded-start"
                      style={{ minHeight: '200px', height: '250px' }}
                      alt={item.food.Item_name}
                    />
                  </div>
                  <div className="col-md-8 p-3">
                    <h5>{item.food.Item_name}</h5>
                    <p>{item.food.Description}</p>
                    <p><strong>Price:</strong> ₹ {item.food.Price}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-4">
            {orderAddress && (
              <div className="card p-4 shadow-sm border-0 bg-light">
                <h5 className="fw-semibold mb-3">
                  <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                  Delivery Details
                </h5>

                <p><strong>Date:</strong> {new Date(orderAddress.order_time).toLocaleString()}</p>
                <p><strong>Address:</strong> {orderAddress.address}</p>
                <p><strong>Status:</strong> {orderAddress.order_final_status || 'Waiting For Shop Confirmation'}</p>
                <p>
                  <strong>Payment Mode:</strong>
                  <span className="badge bg-info text-dark ms-2">
                    {orderAddress.payment_mode}
                  </span>
                </p>
                <p><strong>Total:</strong> ₹ {total}</p>

                <button className="btn btn-danger w-100">
                  <i className="fas fa-times-circle me-2"></i>
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default OrderDetails;
