import React, { useEffect, useState } from 'react'
import { FaCogs, FaHeart, FaHome, FaServicestack, FaShoppingBag, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle, FaUserPlus, FaUserShield } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Layout.css";


    const PublicLayout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')
    const name = localStorage.getItem('userName');
    useEffect(() => {
        if (userId) {
            setIsLoggedIn(true);
            setUserName(name);

        }
    }, [userId])
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        navigate('/login');
    }
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand fw-bold" to="#"><FaShoppingCart className='me-1' />Groapp</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/"><FaHome className='me-1' />Home</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to=""><FaShoppingBag className='me-1' />Products</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to=""><FaServicestack className='me-1' />Track</Link>
                                </li>
                                {!isLoggedIn ? (
                                    <>
                                        <li className="nav-item mx-1">
                                            <Link className="nav-link" to="/register"><FaUserPlus className='me-1' />Register</Link>
                                        </li>
                                        <li className="nav-item mx-1">
                                            <Link className="nav-link" to="/login"><FaSignInAlt className='me-1' />Login</Link>
                                        </li>
                                        <li className="nav-item mx-1">
                                            <Link className="nav-link" to="/adminlogin"><FaUserShield className='me-1' />Admin Login</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item mx-1">
                                            <Link className="nav-link" to="/my-orders"><FaUser className='me-1' />My Orders</Link>
                                        </li>
                                        <li className="nav-item mx-1">
                                            <Link className="nav-link" to="/cart"><FaShoppingCart className='me-1' />My Cart</Link>
                                        </li>
                                        <li className="nav-item mx-1">
                                            <Link className="nav-link" to="/adminlogin"><FaHeart className='me-1' />WishList</Link>
                                        </li>
                                        
                                        <li className="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle text-capitalize" href="#" id="navbarDropdown"role="button" data-bs-toggle="dropdown">
                                              <FaUserCircle className='me-1'/>  {userName}
                                            </a>
                                            <ul class="dropdown-menu" >
                                                <li><Link className="dropdown-item" to='profile' ><FaUser className='me-1'/>Profile</Link></li>
                                                <li><Link className="dropdown-item" to='changepassword'><FaCogs className='me-1'/>Settings</Link></li>
                                                <li><hr className="dropdown-divider"></hr></li>
                                                <li><button className="dropdown-item" onClick={handleLogout} ><FaSignOutAlt className='me-1'/>Logout</button></li>
                                            </ul>
                                            
                                        </li>
                                    
                                    </>

                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="text-primary" >
                    {children}
                </div>

                <footer className='text-center py-3 mt-5'>
                    <div className='container'>
                        <p>
                            &copy;2026 Food Ordering System .All rights reserved
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default PublicLayout