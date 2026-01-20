import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { data, Link } from 'react-router-dom'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ManageCategory = () => {
    const [categories, setCategories] = useState([])
    const [allcategories, setAllCategories] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')

            .then(res => res.json())
            .then(data => {
                setCategories(data)
                setAllCategories(data)
            })

    }, []);
    const handleSerach = (s) => {
        const keyword = s.toLowerCase();
        if (!keyword) {
            setCategories(allcategories);

        }
        else {
            const filtered = allcategories.filter((c) => c.category_name.toLowerCase().includes(keyword))
            setCategories(filtered);
        }

    }
      const handleDelete= (id) => {
        
        if (window.confirm("Are you Sure Want to Delete")) {
            fetch(`http://127.0.0.1:8000/api/category/${id}/`,{
                method:'DELETE',

            })
            .then(res=>res.json())
            .then(data => {
                 toast.success(data.message);
                 setCategories(categories.filter(category=>category.id!==id));
            })
            .catch(err => console.error(err));

        }
       
    }
    return (
        <AdminLayout>
            <div>
                <h3 className='text-center text-primary mb-4'>
                    <i className='fas fa-list-alt me-1'></i>Manage Category
                </h3>
                <h5 className='text-end text-muted'>
                    <i className='fas fa-database me-2'></i>Total Categories
                    <span className='ms-2 badge bg-success'>{categories.length}</span>
                </h5>
                <div className='mb-3'>
                    <input type='text' className='form-control w-50' placeholder='Search For Product' onChange={(e) => handleSerach(e.target.value)}></input></div>
                <table className='table table-bordered table-hover table-striped'>
                    <thead className='table-dark' >

                        <tr>
                            <th>S.no</th>
                            <th>Category Name</th>
                            <th>Creation_date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>{category.category_name}</td>
                                <td>{new Date(category.Creation_date).toLocaleString()} </td>

                                <td>
                                    <Link to={`/edit_category/${category.id}`} className='btn btn-sm btn-primary me-2'>
                                        <i className='fas fa-edit me-1 '></i> EDIT</Link>

                                    <button onClick={() => handleDelete(category.id)} className='btn btn-sm btn-danger'>
                                        <i className='fas fa-trash-alt me-1 '></i>DELETE</button>
                                </td>
                            </tr>
                        ))}




                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default ManageCategory