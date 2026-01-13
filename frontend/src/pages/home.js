import React,{useEffect,useState} from 'react'
import {  FaHome, FaServicestack, FaShoppingBag, FaShoppingCart, FaSignInAlt, FaUserPlus, FaUserShield } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import PublicLayout from '../Components/PublicLayout';
import '../styles/Home.css'
const Home = () => {
  const[foods,setFoods]=useState([]);
      useEffect(() => {
          
              fetch(`http://127.0.0.1:8000/api/random_foods/`)
                  .then(res => res.json())
                  .then(data => {
                      setFoods(data)
  
                  })
          
  
      }, []);
  return (
    <PublicLayout>
     <section className=' hero py-5 text-center' style={{backgroundImage:"url('/images/first.jpg')"}}>
      <div style={{
        backgroundColor:"rgba(0,0,0,0.5)",padding:"40px 20px",
        borderRadius: "10px",
        }}>

<h1 className='display-4'>We Are Here for you </h1>
<p className='lead'>For Your Grocery Needs</p>
<form method='GET' action="/search" className='d-flex mt-3'style={{maxWidth:"600px",margin:'0 auto'}}>
<input type='text' name='q' placeholder='I am Here For... 'className='form-control'
style={{borderTopRightRadius:0,borderBottomRightRadius:0}}/>
<button className='btn btn-warning px-4'
style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>Search</button>

</form>
        </div>
        </section>
        <section className='py-5'>
        <div className='container'>
          <h2 className='text-center mb-4'> Most Dealing Products of the Month
            <span className='badge bg-danger ms-3'>Top Picks</span>
          </h2>
              <div className='row mt-4'>
                              {foods.length === 0 ? (
                                  <p className='text-center'>
                                      No Items found
                                  </p>
                              ) : (
                                  foods.map((food,index)=>(
                                  <div className='col-md-4 mb-4'>
                                      <div className='card'>
                                          <img src={`http://127.0.0.1:8000${food.image}`} className="card-img-top border-rounded " style={{ height: "180px" }} alt='Not defined' />                </div>
                                      <div className='card-body hovereffect'>
                                          <h5 className='card-title'>
                                              <Link to={`/food/${food.id}`}>{food.Item_name}</Link></h5>
                                          <p className='card-text text-muted'>{food.Description?.slice(0,40)}...</p>
                                          <div className='d-flex justify-content-between align-items-center'>
                                              <span className='fw-bold' >₹{food.Price}</span>
                                              {food.is_available ? (
                                              <Link to={`/food/${food.id}`} className='btn btn-outline-primary btn-sm'>
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

        </section>
        <section className='py-5 bg-dark text-white'>
          <div className='container text-center'>
            <h2>
              Ordering in 3 Simple Steps
              <div className='row mt-4'>
                <div className='col-md-4'>
                  <h2>
                    1.Pick the Item You Want
                  </h2>
                  <h5>
                    Explore Hundreds of Daily essential items
                  </h5>

                </div>
                 <div className='col-md-4'>
                  <h2>
                    2.Share Your Location
                  </h2>
                  <h5>
                    Tell Us Where You Want to Get the Item
                  </h5>

                </div>
                 <div className='col-md-4'>
                  <h2>
                    3. Enjoy Door Step Delivery
                  </h2>
                  <h5>
                    Fast and Fresh Items at Minutes!
                  </h5>

                </div>
                



              </div>
            </h2>


          </div>

        </section>
        <section className='py-5 bg-warning text-center text-dark'>
          <h4>Ready When You Clicked</h4>
          <Link to=""className='btn btn-dark btn-lg'>
        Browse Items
          </Link>

        </section>

    </PublicLayout>
  
  )
}

export default Home;