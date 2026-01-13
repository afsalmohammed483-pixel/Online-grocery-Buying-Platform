import React, { useEffect, useState } from 'react'
import PublicLayout from '../Components/PublicLayout';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';

const Cart = () => {

    const userId = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [userId]);

    const fetchCart = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
            if (!res.ok) return;
            const data = await res.json();
            setCartItems(data);
            recalcTotal(data);
        } catch (err) {
        
          console.error('Failed to fetch cart', err);
        }
    };
            
   

    const recalcTotal = (items) => {
        const total = items.reduce((sum, item) => {
            const price = Number(item.food.Price) || Number(item.food.item_price) || 0;
            const qty = Number(item.quantity) || 0;
            return sum + price * qty;
        }, 0);
        setGrandTotal(total);
    }

    const updateQuantity = async (orderId, newQty) => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/cart/update_quantity/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: orderId, quantity: newQty })
            });
            const result = await res.json();
            if (res.status === 200) {
                await fetchCart();
                toast.success(result.message || 'Quantity updated');
            } else {
                toast.error(result.message || 'Failed to update quantity');
            }
        } catch (err) {
            toast.error('Unable to update quantity');
        }
    }

    const handleDecrease = (orderId, currentQty) => {
        if (currentQty <= 1) return;
        updateQuantity(orderId, currentQty - 1);
    }

    const handleIncrease = (orderId, currentQty) => {
        updateQuantity(orderId, currentQty + 1);
    }

const handleRemove = async (orderId) => {
    const confirmDelete = window.confirm("Are You Sure To Remove the item")
    if (!confirmDelete) return;
    
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/cart/delete/${orderId}/`, {
            method: 'DELETE'
        });
        const result = await res.json();
        if (res.status === 200) {
            await fetchCart();
            toast.success(result.message || 'Quantity updated');
        } else {
            toast.error(result.message || 'Failed to update quantity');
        }
    } catch (err) {
        toast.error('Unable to update quantity');
    }
}

    return (
        <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />

            <div className='container py-5 '>
                <h2 className='mb-2 text-center'>
                    <FaShoppingCart className='me-2' /> Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className='text-center text-muted'>Your Cart is Empty</p>
                ) : (
                    <>
                        <div className='row'>

                            {cartItems.map((item) => (
                                <div className='col-md-6 mb-5' key={item.id}>
                                    <div className='card shadow-sm'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <img src={`http://127.0.0.1:8000${item.food.image}`} className='img-fluid rounded-start' style={{ minHeight: '200px' }} alt={item.food.Item_name} />
                                            </div>
                                            <div className='col-md-6 mb-5'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{item.food.Item_name}</h5>
                                                    <p className='card-text text-muted'>{item.food.Description}</p>
                                                    <p className='fw-bold text-success'>₹{item.food.Price}</p>
                                                    <div className='d-flex align-items-center mb-2'>
                                                        <button className='btn btn-sm btn-outline-secondary me-2' disabled={item.quantity <= 1} onClick={() => handleDecrease(item.id, item.quantity)}>
                                                            <FaMinus />
                                                        </button>
                                                        <span className='fw-bold px-2'>{item.quantity}</span>
                                                        <button className='btn btn-sm btn-outline-secondary ms-2' onClick={() => handleIncrease(item.id, item.quantity)}>
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                    <button className='btn btn-sm btn-outline-danger px-3' onClick={() => handleRemove(item.id)}>
                                                        <FaTrash className='me-2' />Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className='card p-4 tm-4 shadow-sm border-0'>
                            <h4 className='text-end'>
                                Total: ₹ {Number(grandTotal || 0).toFixed(2)}
                            </h4>
                            <div className='text-end'>
                                <button className='btn btn-primary mt-3 px-4 py-2' onClick={()=>navigate('/payment')}>
                                    <FaShoppingCart className='me-2' />  Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </PublicLayout>
    )
}

export default Cart