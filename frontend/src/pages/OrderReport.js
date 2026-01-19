import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const OrderReport = () => {
const [formData,setFormData] = useState({
    from_date:'',
    to_date:'',
    status:'all',
})
const [orders,setOrders] = useState([])
    const adminUser= localStorage.getItem('adminUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser){
            navigate('/admin-login');
            return;
        }
   
},[]);
    const handleChange = (e) => {
        
        setFormData({
            ...formData,
            [e.target.name]:e.target.
            value

        });
    }
 const handleSubmit = async (e)=>{
           e.preventDefault();
           try{
            const response=await fetch('http://127.0.0.1:8000/api/order-between-dates/',{
              method:'POST',
                headers:{
                    'Content-Type':'application/json'},
                    body:JSON.stringify(formData),
            });
          const data = await response.json();
            if(response.status===200){
               setOrders(data)
            }      
            else{
                toast.error("Something went wrong");
            }
        }
        catch(error){
            toast.error("An error occurred. Please try again.");
        } };

    
  return (
    <AdminLayout>
        <ToastContainer position='top-right' autoClose={2000}/>
            <div>
                <h3 className='text-center text-primary mb-4'>
                   <i className='fas fa-list-alt me-1'></i> Between Dates Report
                </h3>
                
                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className='row mb-3'>
                        <div className='col-md-4'>
                            <label>From Date</label>
                            <input type='date' name='from_date' onChange={handleChange} className='form-control'required/>
                        </div>

                            
                        <div className='col-md-4'>
                            <label>To Date</label>
                            <input type='date' name='to_date' onChange={handleChange} className='form-control'required/>
                        </div>

                
                        <div className='col-md-4'>
                            <label>Status</label>
                            <select name='status' onChange={handleChange} className='form-control'>
                                <option value='all'>All</option>
                                <option value='not_confirmed'>Not Confirmed</option>
                                <option value='Order Confirmed'>Order Confirmed</option>
                                <option name='Food being Prepared'>Packing</option>
                                <option name='Food Pickup'>Item Ready to Pickup</option>
                                <option name='Food Delivered'>Item Delivered</option>
                                <option name='Order Cancelled'>Order Cancelled</option>
                            </select>
                           
                        </div>




                    </div>
                    <div className='text-center'>
                        <button className='btn btn-warning' type='submit'>Submit</button>

                    </div>

                </form>
                {orders.length > 0 && (
                    <table className='table table-bordered table-hover table-striped'>
                    <thead className='table-dark' >

                        <tr>
                            <th>S.no</th>
                            <th>Order Number</th>
                            <th>Order date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.order_number}</td>
                                <td>{new Date(order.order_time).toLocaleString()} </td>

                                <td>
                                    <a  href={`/admin-view-order-detail/${order.order_number}`}className='btn btn-sm btn-info me-2'>
                                        <i className='fas fa-edit me-1 '></i> VIEW DETAILS</a>

                                    </td>
                                    </tr>
                        ))}




                    </tbody>
                </table>

                )}
                
            </div>
        </AdminLayout>
  )
}

export default OrderReport
