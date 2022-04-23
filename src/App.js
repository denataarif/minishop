import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './Layout/Layout'
import Product from './Page/Product';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home</h1>} />
            <Route path="login" element={<h1>Login</h1>} />
            <Route path="products" element={<Product />} />
            <Route path="catagories" element={<h1>Catagories</h1>} />
            <Route path="shoping-card" element={<h1>Shoping Card</h1>} />
            <Route path="order-history" element={<h1>Order History</h1>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
