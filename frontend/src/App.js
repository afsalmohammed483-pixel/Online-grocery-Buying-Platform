import {BrowserRouter ,Routes,Route} from 'react-router-dom'; 
import Home from './pages/home';
import AdminLogin  from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory';
import ManageCategory from './pages/ManageCategory';
import AddFood from './pages/AddFood';
import ManageFood from './pages/ManageFood';
import SearchPage from './pages/SearchPage';
import Register from './Components/Register';
import Login from './Components/Login';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import PaymentPage from './pages/PaymentPage';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
           <Route path="/adminlogin" element={<AdminLogin/>}></Route>
            <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
            <Route path="/add-category" element={<AddCategory/>}></Route>
            <Route path="/manage-category" element={<ManageCategory/>}></Route>
            <Route path="/add-food" element={<AddFood/>}></Route>
            <Route path="/manage-food" element={<ManageFood/>}></Route>
            <Route path="/search" element={<SearchPage/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/food/:id" element={<FoodDetail/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/payment" element={<PaymentPage/>}></Route>
            <Route path="/my-orders" element={<MyOrders/>}></Route>
             <Route path="/order-details/:order_number" element={<OrderDetails/>}></Route>






        </Routes>
      </BrowserRouter>
    </div>
     
  );
}

export default App;
