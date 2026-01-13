
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PublicLayout from '../Components/PublicLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const FoodDetail = () => {
    const userId = localStorage.getItem('userId');
    const [food, setFood] = useState([null]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/api/food/${id}`)
            .then(res => res.json())
            .then(data => {
                setFood(data)

            })


    }, []);
    const handleAddToCart = async () => {
        if (!userId) {
            navigate('/login')
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart/add/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    foodId: food.id
                })
            });
            const result = await response.json();
            if (response.status === 200) {
                // show success toast when item added to cart
                toast.success(result.message || 'Item added to cart');
                setTimeout(()=>{
                    navigate('/cart');
                },2000);
            } else {
                toast.error(result.message || 'Something Went Wrong');
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }



    if (!food) return <div>
        Loading...
    </div>
    return (
        <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />

            <div className='container py-5 mb-4 md-4'>
                <div className='row'>
                    <div className='col-md-5 text-center'>
                        <img src={`http://127.0.0.1:8000${food.image}`} style={{ width: '500px', maxheight: "300px" }} alt='Not defined' />
                    </div>
                    <div className='col-md-7 '>
                        <h2>{food.Item_name}</h2>
                        <p className='text-muted'>{food.Description}</p>
                        <p><strong>Category:</strong>{food.Category_name}</p>
                        <h4>₹{food.Price}</h4>
                        <p className='mt-3'>Shippimg:<strong>Free</strong></p>
                        {food.is_available ? (
                            <button className='btn btn-outline-warning btn-lg mt-3 px-4' onClick={handleAddToCart}>
                                <i className='fas fa-cart-plus me-1'></i> Add to Cart
                            </button>) : (
                            <div title='This item is not available right now'>
                                <button className='btn btn-outline-secondary btn-sm'>
                                    <i className='fas fa-times-circle me-1'></i> Currently Unavailable
                                </button>
                            </div>
                        )}





                    </div>

                </div>

            </div>
        </PublicLayout>
    )
}

export default FoodDetail