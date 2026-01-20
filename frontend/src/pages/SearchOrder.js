import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SearchOrder = () => {
    const [searchTerm,setsearchTerm] = useState('');
     const [orders,setOrders] = useState([]);
     const [submitted,setSubmitted] = useState(true);
        const adminUser= localStorage.getItem('adminUser');
        const navigate = useNavigate();
    
        useEffect(() => {
            if (!adminUser){
                navigate('/admin-login');
                return;
            }
       
    },[]);
   
     const handleSearch = async (e)=>{
               e.preventDefault();
               if(!searchTerm.trim()) return;
               try{
                const response=await fetch(`http://127.0.0.1:8000/api/search-orders/?q=${searchTerm}`);
                
                const data = await response.json();
                
                   setOrders(data);
                   setSubmitted(true)
                
                }
            
            catch(error){
                toast.error("An error occurred. Please try again.");
            } };
    
  return (
     <AdminLayout>
        <ToastContainer position='top-right' autoClose={2000}/>
            <div className='container mt-4'>
                <h3 className='text-center text-primary mb-4'>
                   <i className='fas fa-search me-1'></i> Search Orders
                </h3>
                
                <form onSubmit={handleSearch} className='d-flex mt-3'style={{maxWidth:"600px",margin:'0 auto'}}>
<input type='text'onChange={(e)=> setsearchTerm(e.target.value)} name='q' placeholder='Enter Order Number 'className='form-control'
style={{borderTopRightRadius:0,borderBottomRightRadius:0}}/>
<button type='submit' className='btn btn-warning px-4'
style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>Search</button>

</form>
                {submitted && (
                    <table className='table table-bordered table-hover table-striped mt-5'>
                    <thead className='table-dark' >

                        <tr>
                            <th>S.no</th>
                            <th>Order Number</th>
                            <th>Order date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders.length>0?(
                             orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.order_number}</td>
                                <td>{new Date(order.order_time).toLocaleString()} </td>

                                <td>
                                    <a  href={`/admin-view-order-detail/${order.order_number}`}className='btn btn-sm btn-info me-2'>
                                        <i className='fas fa-edit me-1 '></i> VIEW DETAILS</a>

                                    </td>
                                    </tr>
                        ))
):(
    <tr>
        <td colSpan='4' className='text-center text-muted'>No Record Found </td>
    </tr>
)
                   



}
                    </tbody>
                </table>

                )}
                
            </div>
        </AdminLayout>
  )
  
}

export default SearchOrder