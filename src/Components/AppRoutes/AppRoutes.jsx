import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Inventory from '../Pages/Inventory/Inventory';
import Orders from '../Pages/Orders/Orders';
import Customers from '../Pages/Customers/Customers';

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/inventory' element={<Inventory/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/customers' element={<Customers/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes;