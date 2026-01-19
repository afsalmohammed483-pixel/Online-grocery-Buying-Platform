import PublicLayout from './PublicLayout'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setformData] = useState({
        first_name: '',
        Last_name: '',
        MobileNo: '',
        Email: '',
        Password: '',
        RepeatPassword: ''
    });
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
        const { first_name, Last_name, MobileNo, Email, Password, RepeatPassword } = formData

        if (Password !== RepeatPassword) {
            toast.error('Password mismatch');
            return;

        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name, Last_name, MobileNo, Email, Password })
            });
            const result = await response.json();
            if (response.status === 201) {
                toast.success(result.message || 'Your Registration is Succesful');
                setformData({
                    first_name: '',
                    Last_name: '',
                    MobileNo: '',
                    Email: '',
                    Password: '',
                    RepeatPassword: ''
                })
            }
            else {
                toast.error(result.message || 'Something Went Wrong');
            }
        }
        catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='container py-5'>
                <div className='row shadow-lg rounded-4'>
                    <div className='col-md-6 p-4'>
                        <h3 className='text-center mb-4'>
                            <i className='fas fa-user-plus me-2'></i>  User Registration</h3>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <input name='first_name' className="form-control" value={formData.first_name} onChange={handleChange} placeholder='Enter Your First Name' required />
                            </div>
                            <div className='mb-3'>
                                <input name='Last_name' className="form-control" value={formData.Last_name} onChange={handleChange} placeholder='Enter Your Last Name' required />
                            </div>
                            <div className='mb-3'>
                                <input name='Email' type='email' className="form-control" value={formData.Email} onChange={handleChange} placeholder='Enter Your Email id' required />
                            </div>
                            <div className='mb-3'>
                                <input name='MobileNo' type='tel' className="form-control" value={formData.MobileNo} onChange={handleChange} placeholder='Enter Your Phone Number' required />
                            </div>
                            <div className='mb-3'>
                                <input name='Password' type='password' className="form-control" value={formData.Password} onChange={handleChange} placeholder='Enter Your Password' required />
                            </div>
                            <div className='mb-3'>
                                <input name='RepeatPassword' type='password' className="form-control" value={formData.RepeatPassword} onChange={handleChange} placeholder='Repeat Password' required />
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                <i className='fa fa-user-check me-2'></i>Submit</button>


                        </form>

                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                        <div className='p-4 text-center'>
                            <img src="/images/first.jpg" className='img-fluid' style={{ maxHeight: '400px' }} alt="registration" />
                            <h5 className='mt-3'>Registration is Fast and Secured</h5>
                            <p className='text-muted small'>Welcomes You the World of Groceries</p>
                        </div>

                    </div>
                </div>



            </div>
        </PublicLayout>
    )
}

export default Register