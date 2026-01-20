import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const EditCategory = () => {
    const [categoryName, setcategoryName] = useState('');
    const { id } = useParams();
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/category/${id}/`)


            .then(res => res.json())
            .then(data => setcategoryName(data.category_name))




            .catch(err => console.error(err));

    }, [id]);
    const handleUpdate = (e) => {
        e.preventDefault()

        fetch(`http://127.0.0.1:8000/api/category/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: categoryName })



        })


            .then(res => res.json())
            .then(data => {
                toast.success(data.message);
                
                setTimeout(() => {
                    navigate('/manage-category')
                }, 2000);
            })
            .catch(err => console.error(err));


    }



    return (
        <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='row'>
                <div className='col-md-12'>
                    <div className='p-4 shadow-sm rounded'>
                        <h4 className='mb-4'>
                            <i className='fa fa-pen-square text-primary me-2'></i>Edit Category
                        </h4>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className='mb-3'>
                            <label className='form-label'>
                                <div className="me-3 icon-fix" /> Category Name </label>
                            <div>
                                <input type="text" className='form-control' value={categoryName} onChange={(e) => setcategoryName(e.target.value)} placeholder='Enter Category Name' required />
                            </div>

                        </div>

                        <button type="submit" className='btn btn-primary  mt-2'>
                            <i className='fas fa-save'></i> Update Category</button>

                    </form>

                </div>
            </div>
        </AdminLayout>
    )
}

export default EditCategory