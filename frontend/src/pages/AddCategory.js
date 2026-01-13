import React,{useState} from 'react'
import AdminLayout from '../Components/AdminLayout'
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';

const AddCategory = () => {
    const [categoryName,setCategoryName]=useState('');
    const handleSubmit = async (e)=>{
           e.preventDefault();
           try{
            const response=await fetch('http://127.0.0.1:8000/api/add-category/',{
              method:'POST',
                headers:{
                    'Content-Type':'application/json'},
                    body:JSON.stringify({category_name:categoryName}),
            });
          const data = await response.json();
            if(response.status===201){
                toast.success(data.message);
            }      
            else{
                toast.error("Something wenr wrong");
            }
        }
        catch(error){
            toast.error("An error occurred. Please try again.");
        } };
  return (
    <AdminLayout>
        <ToastContainer position='top-right' autoClose={2000}/>
      <div className='row'>
        <div className='col-md-12'>
            <div className='p-4 shadow-sm rounded'>
                <h4 className='mb-4'>
                    <i className='fa fa-plus-circle text-primary me-2'></i>Add Category
                    </h4>
                            </div>
         <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <label className='form-label'>
                                             <div className="me-3 icon-fix" /> Category Name </label>
                                            <div>
                                            <input type="text" className='form-control'value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder='Enter Category Name' required/>
                                            </div>
                    
                                    </div>

                                      <button type="submit" className='btn btn-primary  mt-2'> 
                                         <i className='fas fa-plus'></i> Add Category</button>
                    
                                </form>
           
            </div>
      </div>
    </AdminLayout>
  )
}

export default AddCategory