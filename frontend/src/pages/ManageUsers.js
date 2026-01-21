import React, { useState, useEffect } from 'react'
import AdminLayout from '../Components/AdminLayout'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ManageUsers = () => {
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch('http://127.0.0.1:8000/api/users/')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                return res.json();
            })
            .then(data => {
                setUsers(data)
                setAllUsers(data)
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                toast.error('Failed to load users');
            });

    }, [adminUser, navigate]);
    const handleSerach = (s) => {
        const keyword = s.toLowerCase();
        if (!keyword) {
            setUsers(allUsers);

        }
        else {
            const filtered = allUsers.filter((u) =>
                (u.first_name && u.first_name.toLowerCase().includes(keyword)) ||
                (u.Last_name && u.Last_name.toLowerCase().includes(keyword)) ||
                (u.Email && u.Email.toLowerCase().includes(keyword))
            );
            setUsers(filtered);
        }

    }
    const handleDelete = (id) => {

        if (window.confirm("Are you Sure Want to Delete")) {
            fetch(`http://127.0.0.1:8000/api/delete_user/${id}/`, {
                method: 'DELETE',

            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then(data => {
                            throw new Error(data.error || 'Failed to delete user');
                        });
                    }
                })
                .then(data => {
                    toast.success(data.message || 'User deleted successfully');
                    setUsers(users.filter(user => user.id !== id));
                    setAllUsers(allUsers.filter(user => user.id !== id));
                })
                .catch(err => {
                    console.error(err);
                    toast.error(err.message || 'Failed to delete user');
                });

        }
    }
    return (
        <div>
            <AdminLayout>
                <ToastContainer position='top-center' autoClose={2000} />
                <div>
                    <h3 className='text-center text-primary mb-4'>
                        <i className='fas fa-list-alt me-1'></i>Manage Users
                    </h3>
                    <h5 className='text-end text-muted'>
                        <i className='fas fa-database me-2'></i>Total Users
                        <span className='ms-2 badge bg-success'>{users.length}</span>
                    </h5>
                    <div className='mb-3'>
                        <input type='text' className='form-control w-50' placeholder='Search For User' onChange={(e) => handleSerach(e.target.value)}></input></div>
                    <table className='table table-bordered table-hover table-striped'>
                        <thead className='table-dark' >

                            <tr>
                                <th>S.no</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.Last_name}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.MobileNo}</td>
                                    <td>
                                        {/* <Link to={`/edit_user/${user.id}`} className='btn btn-sm btn-primary me-2'>
                                            <i className='fas fa-edit me-1 '></i> EDIT</Link> */}

                                        <button onClick={() => handleDelete(user.id)} className='btn btn-sm btn-danger'>
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

export default ManageUsers