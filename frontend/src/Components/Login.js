
import PublicLayout from './PublicLayout'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';


const Login = () => {
    const [formData, setformData] = useState({
        Emailcont: '',
        Password: '',
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value

        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Emailcont, Password } = formData

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Emailcont, Password })
            });
            const result = await response.json();
            if (response.status === 200) {
                toast.success(result.message || 'Login Successful');
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('userName', result.userName);
                setformData({
                    Emailcont: '',
                    Password: '',
                });
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            } else {
                toast.error(result.message || 'Invalid Credentials');
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
          <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='container py-5'>
                <div className='row align-items-center'>
                    <div className='col-md-6 p-4'>
                        <h3 className='text-center mb-4'>
                            <FaSignInAlt className=' me-2'/>  User Login</h3>

                        <form className='card p-4 shadow' onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <input name='Emailcont' type='text' className="form-control" value={formData.Email} onChange={handleChange} placeholder='Enter Email or MobileNo' required />
                            </div>
                            <div className='mb-3'>
                                <input name='Password' type='password' className="form-control" value={formData.RepeatPassword} onChange={handleChange} placeholder=' Password' required />
                            </div>
                            <div className='d-flex justify-content-between'>
                            <button className='btn btn-primary'>
                                <FaSignInAlt className=' me-2'/>Login</button>
                                <button className='btn btn-outline-warning 'onClick={()=>navigate('/register')}>
                                <FaUserPlus className=' me-2'/>Register Now</button>
                                </div>


                        </form>

                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                            <img src="/images/first.jpg" className='img-fluid rounded-3 w-75' style={{ maxHeight: '400px' }} alt="registration" />
                        </div>

                    </div>
                </div>
        </PublicLayout>
    )
}

export default Login