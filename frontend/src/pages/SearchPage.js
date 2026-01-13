import React, { useEffect, useState } from 'react'
import PublicLayout from '../Components/PublicLayout';
import { Link, useLocation } from 'react-router-dom';
import "../styles/Home.css";


const SearchPage = () => {
    const query = new URLSearchParams(useLocation().search).get("q") || '';
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        if (query) {
            fetch(`http://127.0.0.1:8000/api/food_search/?q=${query}`)
                .then(res => res.json())
                .then(data => {
                    setFoods(data)

                })
        }

    }, [query]);

    return (
        <PublicLayout>
            <div className='container py-4'>
                <h3 className='text-center text-primary'>Results For :'{query}'</h3>

                <div className='row mt-4'>
                    {foods.length === 0 ? (
                        <p className='text-center'>
                            No good found
                        </p>
                    ) : (
                        foods.map((food,index)=>(
                        <div className='col-md-4 mb-4'>
                            <div className='card'>
                                <img src={`http://127.0.0.1:8000${food.image}`} className="card-img-top border-rounded " style={{ height: "180px" }} alt='Not defined' />                </div>
                            <div className='card-body hovereffect'>
                                <h5 className='card-title'>
                                    <Link to="#">{food.Item_name}</Link></h5>
                                <p className='card-text text-muted'>{food.Description?.slice(0,40)}...</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='fw-bold' >₹{food.Price}</span>
                                    {food.is_available ? (
                                    <Link className='btn btn-outline-primary btn-sm'>
                                        <i className='fas fa-shopping-basket me-1'></i> Order Now
                                    </Link>): (
                                        <div title='This item is not available right now'>
                                            <button className='btn btn-outline-secondary btn-sm'>
                                        <i className='fas fa-times-circle me-1'></i> Currently Unavailable
                                    </button>
                                             </div>
                                    ) }
                                </div>


                            </div>
                        </div>

                    ))
                    )}
                    </div>
            </div>
        </PublicLayout>
    )
}

export default SearchPage;