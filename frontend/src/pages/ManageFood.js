import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { Link } from 'react-router-dom'


const ManageFood = () => {
    const [foods, setFoods] = useState([])
    const [allfoods, setAllFoods] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/foods/')

            .then(res => res.json())
            .then(data => {
                setFoods(data)
                setAllFoods(data)
            })

    }, []);
    const handleSerach = (s) => {
        const keyword = s.toLowerCase();
        if (!keyword) {
            setFoods(allfoods);

        }
        else {
            const filtered = allfoods.filter((c) => c.Item_name.toLowerCase().includes(keyword))
            setFoods(filtered);
        }

    }
    return (
        <div>

            <AdminLayout>
                <div>
                    <h3 className='text-center text-primary mb-4'>
                        <i className='fas fa-list-alt me-1'></i>Manage Products
                    </h3>
                    <h5 className='text-end text-muted'>
                        <i className='fas fa-database me-2'></i>Total Products
                        <span className='ms-2 badge bg-success'>{foods.length}</span>
                    </h5>
                    <div className='mb-3'>
                        <input type='text' className='form-control w-50' placeholder='Search For Product' onChange={(e) => handleSerach(e.target.value)}></input></div>
                    <table className='table table-bordered table-hover table-striped'>
                        <thead className='table-dark' >

                            <tr>
                                <th>S.no</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food, index) => (
                                <tr key={food.id}>
                                    <td>{index + 1}</td>
                                    <td>{food.category_name}</td>
                                    <td>{food.Item_name} </td>
                                    <td>
                                        <Link className='btn btn-sm btn-primary me-2'>
                                            <i className='fas fa-edit me-1 '></i> EDIT</Link>

                                        <button className='btn btn-sm btn-danger'>
                                            <i className='fas fa-trash-alt me-1 '></i>DELETE</button>
                                    </td>
                                </tr>
                            ))}




                        </tbody>
                    </table>
                </div>
            </AdminLayout>

        </div>
    )
}

export default ManageFood