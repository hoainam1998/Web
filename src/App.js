import React from 'react';
import SideMenu from './Sidemenu/sideMenu.js';
import Footer from './Footer/footer.js';
import Home from './Home/home.js';
import Shop from './Shop/shop.js';
import Product from './Product/product.js';
import Cart from './Cart/cart.js';
import Checkout from './Checkout/checkout.js';
import './App.css';
import {BrowserRouter as Router, Switch ,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <section>
        <SideMenu></SideMenu>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/shop" component={Shop}></Route>
          <Route path="/product/:id" component={Product}></Route>
          <Route path="/cart" exact component={Cart}></Route>
          <Route path="/cart/:id/:quantity" component={Cart}></Route>
          <Route path="/checkout/:total/:quantity" component={Checkout}></Route>
        </Switch>
        <div className="clearfix"></div>
      </section>
      <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
