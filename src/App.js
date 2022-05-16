import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import userSlice from './store/user';
import Layout from './Layout/Layout'
import Login from './Page/Login';
import Product from './Page/Product';
import ProductDetail from './Page/ProductDetail';
import ShoppingCart from './Page/ShoppingCart';
import Register from './Page/Register';
import ProtectedRoute from './Component/HOC/ProtectedRoute';
import UnProtectedRoute from './Component/HOC/UnProtectedRoute';
import Logout from './Page/Logout';


function App() {

  const dispatch = useDispatch()

  useEffect( () => {
    try {
      const token = localStorage.getItem('minishopAccessToken')
      const userData = jwtDecode(token)
      axios.get(`http://localhost:4000/users/${userData.sub}`)
      .then( res => {
        dispatch( userSlice.actions.addUser( { userData: res.data } ) )
      })
    } catch{}
    
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ALL */}
              <Route index element={<h1>Home</h1>} />
              <Route path="products/">
                  <Route index element={<Product/>} />
                  <Route path=':id' element={<ProductDetail />} />
              </Route>
              <Route path="catagories" element={<h1>Catagories</h1>} />
              <Route path="shopping-cart" element={<ShoppingCart/>} />
              <Route path='logout' element={<Logout/>}/>
            
            {/* PUBLIC ONLY */}
            <Route path='/' element={<UnProtectedRoute/>}>
              <Route path='register' element={<Register/>}/>
              <Route path="login" element={<Login/>} />
            </Route>
              
            
            {/* PROTECTED */}
            <Route path='/' element={<ProtectedRoute />}>
              <Route 
                  path="order-history" 
                  render={ () => {<h1>Order History</h1>}} 
              />
            </Route>
              
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
