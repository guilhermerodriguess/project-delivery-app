import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/comum/login/LoginPage';
import RegisterPage from './pages/comum/register/RegisterPage';
import ProductsPage from './pages/customer/products/ProductsPage';
import CheckoutPage from './pages/customer/checkout/CheckoutPage';
import OrdersPage from './pages/customer/orders/OrdersPage';
import SellerOrdersPage from './pages/seller/orders/SellerOrdersPage';
import OrderDetail from './components/OrderDetail/OrderDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={ RegisterPage } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/customer/orders" component={ OrdersPage } />
        <Route exact path="/customer/orders/:id" component={ OrderDetail } />
        <Route exact path="/seller/orders" component={ SellerOrdersPage } />
        <Route exact path="/seller/orders/:id" component={ OrderDetail } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
