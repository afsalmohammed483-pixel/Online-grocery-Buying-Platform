import React, { useState, useEffect } from 'react';
import AdminLayout from '../Components/AdminLayout';
import { useNavigate } from 'react-router-dom';

const OrderCancelled = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const adminUser = localStorage.getItem('adminUser');

  useEffect(() => {
    if (!adminUser) {
      navigate('/admin-login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/order-cancelled/');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };

    fetchOrders();
  }, [adminUser, navigate]);

  return (
    <AdminLayout>
      <div>
        <h3 className='text-center text-primary mb-4'>
          <i className='fas fa-list-alt me-1'></i> Cancelled Orders
        </h3>

        <h5 className='text-end text-muted'>
          <i className='fas fa-database me-2'></i>Total
          <span className='ms-2 badge bg-success'>{orders.length}</span>
        </h5>

        <div className='mb-3'>
          <input
            type='text'
            className='form-control w-50'
            placeholder='Search For Order Number'
          />
        </div>

        <table className='table table-bordered table-hover table-striped'>
          <thead className='table-dark'>
            <tr>
              <th>S.no</th>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.order_number}</td>
                <td>{new Date(order.order_time).toLocaleString()}</td>
                <td>
                  <a
                    href={`/admin-view-order-detail/${order.order_number}`}
                    className='btn btn-sm btn-info me-2'
                  >
                    <i className='fas fa-edit me-1'></i> VIEW DETAILS
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrderCancelled;
