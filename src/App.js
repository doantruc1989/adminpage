import './App.css'
import React from 'react';
import User from './components/User/User';
import Product from './components/Product/Product';
import { Routes, Route } from 'react-router-dom';
import Chart from './components/Chart/Chart';
import AddProduct from './components/Product/AddProduct';
import AddUser from './components/User/AddUser';
import Order from './components/Order/Order';
import Blog from './components/Blog/Blog';
import RequireAuth from './other/RequireAuth'
import Addblog from './components/Blog/Addblog';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

const ROLES = {
  "Admin": 'admin'
}

const App = () => {
  return (
    <Routes>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path='user' element={<User />} />
          <Route path='user/addnewUser' element={<AddUser />} />
          <Route path='product' element={<Product />} />
          <Route path='product/addnewProduct' element={<AddProduct />} />
          <Route path='order' element={<Order />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/addnewblog' element={<Addblog />} />
          <Route path='chart' element={<Chart />} />
        </Route>
      </Route>
      <Route path='login' element={<Login />} />
    </Routes>
  )
};
export default App;
