// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NoPage from './pages/nopage/NoPage'; // Make sure the path is correct
import SellDashboard from './pages/Sell/SellDashboard';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Cart from './pages/cart/Cart';
import MyState from './context/Data/MyState';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ProductInfo from './pages/productinfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/Sell/UpdateProduct';
import { ToastContainer, toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css'; 
import ChatRoom from './pages/ChatRoom/ChatRoom';


export default function App() {
  return (
    <MyState>
      <Router>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/sell' element={
              <ProtectedRoute><SellDashboard /></ProtectedRoute>
          } />
          <Route path='/dashboard' element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/cart' element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          } />
          <Route path='/chat' element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup'   element={<Signup />} />
          <Route path='/productinfo/:id' element={<ProductInfo />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute> 
          } />
          <Route path='*' element={<NoPage />} /> 
        </Routes>
      </Router>
      <ToastContainer />
    </MyState>
  );
}

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  else {
    return children;
  }
}

const ProtectedRouteForAdmin = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  else {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.email === 'abhinavbbis@gmail.com') {
      return children;
    }
    else {
      window.location.href = '/login';
      return null;
    }
  }
}


