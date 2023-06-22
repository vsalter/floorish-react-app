import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import OrderListPage from './pages/OrderListPage';
import ProductList from './pages/ProductList';
import ProductEditPage from './pages/ProductEditPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/placeorder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListPage />} />
        <Route path='/admin/productlist' element={<ProductList />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductList />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
        <Route path='/admin/userslist' element={<UsersListPage />} />
        <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
