import React,{useState,useEffect}from 'react'
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../styles/admin.css'

const AdminLayout = ({ children }) => {
  const [sidebarOpen,setSidebarOpen]=useState(true);
  useEffect(()=>{
    const HandleResize=()=>{
      if(window.innerWidth<768){
        setSidebarOpen(false);
      }
      else{
        setSidebarOpen(true);
      }
      } 
      HandleResize();
      window.addEventListener('resize',HandleResize);
      return()=>{
        window.removeEventListener('resize',HandleResize);
      }
  },[]);
  const toggleSidebar=()=>{
    setSidebarOpen(prevState=>!prevState);
  }
  return (
    <div className='d-flex'>
        {sidebarOpen && <AdminSidebar/>}
       <div id= "page-content-wrapper" className={`w-100 ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
        
        <div className='container-fluid  mt-4'>
            {children}

        </div>
        </div>
    </div>
  )
}

export default AdminLayout