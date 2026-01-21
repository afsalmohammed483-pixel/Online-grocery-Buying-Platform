import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const EditFood = () => {
       const { id } = useParams();
        const adminUser = localStorage.getItem('adminUser');
        const navigate = useNavigate();
          const [categories, setCategories] = useState([])
            const [formData, setformData] = useState({
                Category: '',
                Item_name: '',
                Description: '',
                Quantity: '',
                Price: '',
                image: '',
                is_available: '',
                
            })
           useEffect(() => {
                if (!adminUser) {
                    navigate('/admin-login');
                    return;
                }
                fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`)
        
        
                    .then(res => res.json())
                    .then(data => setformData(data))
                    .catch(err => console.error(err));
        
                fetch('http://127.0.0.1:8000/api/categories/')      
                    .then(res => res.json())
                    .then(data => setCategories(data))
        
                    .catch(err => console.error(err));
        
            }, [id]);
             const handleChange = (e) => {
                    const { name, value } = e.target;
                    setformData((prev) => ({
                        ...prev,
                        [name]: value
            
                    }));
            
            
                }
                const handleFileChange = (e) => {
                    setformData((prev) => ({
                        ...prev,
                        image: e.target.files[0]
            
                    }));
                }
            
                const handleSubmit = async (e) => {
                    e.preventDefault();
                    const data = new FormData();
                    data.append("Category", formData.Category);
                    data.append("Item_name", formData.Item_name);
                    data.append("Description", formData.Description);
                    data.append("Price", formData.Price);
                    data.append("Quantity", formData.Quantity);
                    data.append("image", formData.image);
                    data.append("is_available", formData.is_available ? 'true' : 'false');
                    try {
                        const response = await fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`, {
                            method: 'PUT',
                            body: data,
                        });
                        const result = await response.json();
                        if (response.status === 200) {
                            toast.success(result.message);
                        }
                        else {
                            toast.error(result.message);
                        }
                    }
                    catch (error) {
                        toast.error("An error occurred. Please try again.");
                    }
                };
    
  return (
      <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='row'>
                <div className='col-md-12'>
                    <div className='p-4 shadow-sm rounded'>
                        <h4 className='mb-4'>
                            <i className='fa fa-pen-square text-outline me-2'></i>Edit Product
                        </h4>
                    </div>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Product Category</label>
                            <select name='Category' className="form-select" value={formData.Category} onChange={handleChange}>
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.category_name}</option>
                                ))}
                            </select>


                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Product Name</label>
                            <input name='Item_name' className="form-control" value={formData.Item_name} onChange={handleChange} placeholder='Enter the Product Name' />

                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Description</label>
                            <textarea name='Description' className="form-control" value={formData.Description} onChange={handleChange} placeholder='Enter About the Product' />


                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Quantity</label>
                            <input name='Quantity' type='text' className="form-control" value={formData.Quantity} onChange={handleChange} placeholder='e.g. 2pcs/kgs' />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Price(₹)</label>
                            <input name='Price' type='number' step=".01" className="form-control" value={formData.Price} onChange={handleChange} placeholder='Enter the price' />
                        </div>
                        <div className='mb-3 form-check form-switch'>
                            
                                  
                            <input name='is_available' type='checkbox'className="form-check-input" 
                            checked={formData.is_available}

                             onChange={(e) => setformData({...formData, is_available: e.target.checked})} />
                             <label className='form-check-label'>
                                {formData.is_available ? 'available' : 'not available'}
                             </label>
                        </div>
                                
                        <div className='mb-3'>
                            <label className='form-label'>
                                Image</label>
                           <div className='row'>
                            <div className='col-md-6'>
                                 <input name='image' multiple type='file' accept='image/*' className="form-control" onChange={handleFileChange} placeholder='Enter the price' />

                            </div>
                            <div className='col-md-6'>
                                {formData.is_available && (
                                    <img src={`http://127.0.0.1:8000/${formData.image}`} alt="Preview" className="img-fluid" />
                                )}
                            </div>

                           </div>


                        </div>


                        <button type="submit" className='btn btn-primary  mt-2'>
                            <i className='fa fa-edit'></i> Edit</button>

                    </form>

                </div>
            </div>
        </AdminLayout>


  )
}

export default EditFood
