import React,{useState} from 'react'
import '../styles/admin.css';
import { Link } from 'react-router-dom';
import {FaChevronDown, FaChevronUp, FaCommentAlt, FaEdit, FaFile, FaList, FaSearch, FaStar, FaThLarge, FaUser, FaUsers} from 'react-icons/fa';

const AdminSidebar = () => {
 const [openMenus,setOpenMenus] = useState({
    category:false,
    item:false, 
    Orders:false

 });
const toggleMenu = (menuName)=>{
    setOpenMenus((prevState)=>({
        ...prevState,
        [menuName]:!prevState[menuName],
    }));
}

  return (
    <div className='bg-dark text-white sidebar'>
        <div className='text-center p-3 border-bottom'>
            <img src="/images/admin-icon-vector.jpg" alt="Admin" className='rounded-circle mb-2' style={{width:'80px', height:'80px'}}/>
           <h6 className='mb-0'>Admin</h6>
            </div>

            <div className='list-group list-group-flush mt-4'>
                <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                <FaThLarge className='icon-fix'/> Dashboard</Link>
            

            <div className='list-group list-group-flush mt-4'>
                <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                <FaUsers className='icon-fix'/> Registered Users</Link>
            </div>

            <button onClick={()=>toggleMenu("category")} className='list-group-item list-group-item-action bg-dark text-white border-0'>
               <FaEdit/> Product Categorys  {openMenus.category ?  <FaChevronUp/> :<FaChevronDown/>}

            </button>
            {openMenus.category && ( 

            <div  className='ps-5'>
            
                <Link to="/add-category" className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Add Category</Link>
            
                <Link to="/manage-category" className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Manage Category</Link>
                </div>

                
            )}
            <button onClick={()=>toggleMenu("item")} className='list-group-item list-group-item-action bg-dark text-white border-0'>
               <FaEdit/> Products  {openMenus.item ?  <FaChevronUp/> :<FaChevronDown/>}
               </button>
            {openMenus.item && (

            <div  className='ps-5'>
            
                <Link to="/add-food" className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Add Product</Link>   
                 <Link to="/manage-food" className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Manage Product</Link> 
             </div>
            
            )}
              <button onClick={()=>toggleMenu("Orders")} className='list-group-item list-group-item-action bg-dark text-white border-0'>
               <FaList/> Orders  {openMenus.Orders ?  <FaChevronUp/> :<FaChevronDown/>}
               </button>
            {openMenus.Orders && (

            <div  className='ps-5'>
            
                <Link  to='/order-not-confirmed' className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Not Confirmed</Link>   
                 <Link to= '/orders-confirmed' className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Confirmed</Link> 
                 <Link to='/food_being-prepared' className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Packing</Link>
                 <Link to='/foodpickup' className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Ready for Delivery</Link>
                  <Link to='/orders-delivered' className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                  Orders Delivered</Link>
                 <Link to="/order-cancelled" className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 Cancelled</Link>
                 <Link to='/all-foods' className='list-group-item list-group-item-action bg-dark text-white rounded border-0'>
                 All Orders</Link>
                 
             </div>
            
            )} 
            <div className='list-group list-group-flush mt-3'>
                <Link to='/order-report' className='list-group-item list-group-item-action bg-dark text-white'>
                <FaFile className='icon-fix'/> B/w Dates Report </Link>
            </div>
           <div className='list-group list-group-flush mt-3'>
                <Link to='/search-order' className='list-group-item list-group-item-action bg-dark text-white'>
                <FaSearch className='icon-fix'/> Search</Link>
            </div>  </div>
 <div className='list-group list-group-flush mt-3'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                <FaCommentAlt className='icon-fix'/> Manage Reviews</Link>
            </div>
    </div>

            
            


        
  )
}

export default AdminSidebar