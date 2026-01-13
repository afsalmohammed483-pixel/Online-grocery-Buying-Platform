
import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';



const AddFood = () => {
    const [categories, setCategories] = useState([])
    const [formData, setformData] = useState({
        Category: '',
        Item_name: '',
        Description: '',
        Quantity: '',
        Price: '',
        image: null,
    })
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')

            .then(res => res.json())
            .then(data => {
                setCategories(data)
                if (data && data.length > 0) {
                    setformData(prev => ({ ...prev, Category: String(data[0].id) }));
                }

            })

    }, []);
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
        try {
            const response = await fetch('http://127.0.0.1:8000/api/add-product/', {
                method: 'POST',
                body: data,
            });
            const result = await response.json();
            if (response.status === 201) {
                toast.success(result.message);
                setformData({
                    Category:'',
                    Item_name: '',
                    Description: '',
                    Quantity: '',
                    Price: '',
                    image: null,
                })
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
                            <i className='fa fa-plus-circle text-primary me-2'></i>Add Product
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
                        <div className='mb-3'>
                            <label className='form-label'>
                                Image</label>
                            <input name='image' multiple type='file' accept='image/*' className="form-control" onChange={handleFileChange} placeholder='Enter the price' />


                        </div>


                        <button type="submit" className='btn btn-primary  mt-2'>
                            <i className='fa fa-cart-arrow-down'></i> Add Product</button>

                    </form>

                </div>
            </div>
        </AdminLayout>
    )
}

export default AddFood