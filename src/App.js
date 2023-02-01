import './App.css';
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import BodyAllOrders from './components/BodyAllOrders'
import BodyAllUsers from './components/BodyAllUsers'
import OrderDetail from './pages/OrderDetail'
import NotFound from './pages/Dashboard'

import { Routes, Route, Switch } from 'react-router-dom'
import AllOrdersUsers from './components/AllOrdersUsers';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/order' element={<Order />}></Route>
          <Route path='/admin' element={<Dashboard />}></Route>
          <Route path='/admin/orders' element={<BodyAllOrders />}></Route>
          <Route path='/admin/users' element={<BodyAllUsers />}></Route>
          <Route path='/admin/orders/:id' element={<OrderDetail />}></Route>
          <Route path='/admin/users/orders/:id' element={<AllOrdersUsers/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
       </Routes>
    </div>
  );
}

export default App;
