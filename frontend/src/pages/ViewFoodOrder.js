import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const ViewFoodOrder = () => {
    const { orderNumber } = useParams();
    const adminUser = localStorage.getItem('adminUser')
    const navigate = useNavigate();
    const [data, setData] = useState(null);


    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/view-order-detail/${orderNumber}/`)

            .then(res => res.json())
            .then(data => {
                setData(data)

            })

    }, [orderNumber]);

    if (!data) return <AdminLayout><p className='text-center mt-5'>Loading...</p></AdminLayout>
    const { order, foods, tracking } = data;
    const statusOptions = [
        "Order Confirmed",
        "Food being Prepared",
        "Food Pickup",
        "Food Delivered",
        "Order Cancelled"
    ];
    const currentStatus = order.order_final_status || "";

    const visibleOptions = statusOptions.slice(statusOptions.indexOf(currentStatus) + 1)
    return (
        <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='container mt-4'>
                <h3 className='text-center text-primary mb-4'> Order Details # {order.order_number}</h3>
                <div className='row'>
                    <div className='col-md-6'>
                        <h5>User Info</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr><th>First Name</th><td>{order.user_first_name}</td></tr>
                                <tr><th>Last Name</th><td>{order.user_last_name}</td></tr>
                                <tr><th>Email</th><td>{order.user_email}</td></tr>
                                <tr><th>Mobile</th><td>{order.user_mobile}</td></tr>
                                <tr><th>Address</th><td>{order.address}</td></tr>
                                <tr><th>Order Time</th><td>{new Date(order.order_time).toLocaleString()}</td></tr>
                                <tr><th>Final Status</th><td>{order.order_final_status || 'Pending'}</td></tr>
                            </tbody>

                        </table>

                    </div>

                    <div className='col-md-6'>
                        <h5>Ordered Items</h5>
                        <table className='table table-bordered'>
                            <thead>
                                <tr><th>Image</th><th>Name</th><th>Price</th></tr>

                            </thead>
                            <tbody>
                                {foods.map((Item, index) => (
                                    <tr key={index}>
                                        <td><img src={`http://127.0.0.1:8000${Item.image}`} width='60' /></td>
                                        <td>{Item.item_name}</td>
                                        <td>{Item.item_price}</td></tr>
                                ))}
                            </tbody>



                        </table>



                    </div>
                    <h5 className='mt-4'>Tracking History</h5>

                    <table className='table table-bordered'>
                        <thead>
                            <tr><th>#</th><th>Status</th><th>Date</th></tr>

                        </thead>
                        <tbody>
                            {tracking.length == 0 ? (
                                <tr><td colSpan='4' className='text-center'>No Tracking History Yet</td></tr>

                            ) : (
                                tracking.map((track, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{track.status}</td>

                                        <td>{new Date(track.status_date).toLocaleString()}</td>
                                    </tr>
                                ))

                            )
                            }
                        </tbody>



                    </table>
                    {order.order_final_status !== "Food Delivered" && (
                        <div className='my-5'>
                            <h5>Update Order Status</h5>
                             <form onSubmit={(e)=>{
                                e.preventDefault();
                                const status=e.target.status.value || "";
                               
                                fetch('http://127.0.0.1:8000/api/update-order-status/',{
                            method:'POST',
                            headers:{ 'Content-Type':'application/json'},
                            body:JSON.stringify({
                                order_number: order.order_number,
                                status,
                            
                            }),
                                 })
                                 .then(res=>res.json())
                                 .then((res)=>{
                                    if(res.message){
                                        toast.success(res.message);
                                        setTimeout(()=> window.location.reload(),1000);
                                    }
                                    else{
                                        toast.error(res.error || "Failed to Update Status");

                                    }
                                 })
                                 .catch(()=>toast.error("Server Error"));
                            }} >
                                <div className='mb-3'>
                                    <select name='status' className='form-control' required>
                                        {visibleOptions.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}

                                    </select>

                                </div>
                              
                                   

                                <div className='text-center'>
                                    <button type='submit' className='btn btn-success'>Update Status</button>

                                </div>

                            </form>
            
                        </div>
                        
             


                    )}

                </div>

            </div>
        </AdminLayout>
    )
}

export default ViewFoodOrder;

