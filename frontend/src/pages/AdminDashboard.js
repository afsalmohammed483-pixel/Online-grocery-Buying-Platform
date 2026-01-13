import React from 'react'
import AdminSidebar from '../Components/AdminSidebar';
import AdminLayout from '../Components/AdminLayout';

const AdminDashboard = () => {
  return (
    <div>
        <AdminLayout>
            <div className='text-center text-primary'>
            <h1 className='text-center'>Admin Dashboard</h1>
            </div>
        </AdminLayout>
    </div>
  )
}

export default AdminDashboard