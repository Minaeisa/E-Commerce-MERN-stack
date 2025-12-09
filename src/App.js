import { Fragment } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import AboutUs from './components/About/AboutUs';
import SingleProduct from './components/Products/SingleProduct/SingleProduct';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cart from './components/Cart/Cart';
import ContactUs from './components/Contact/ContactUs';
import Footer from './components/Footer/Footer';
import CategoryProducts from './components/Products/CategoryProducts.jsx';
import Grid from './components/Blog/Grid.jsx';
import ShopPageLayout from './components/Shop/ShopPageLayout.jsx';
import FAQ from './components/FAQ/FAQ.jsx';
import Location from './components/Location/Location.jsx';
import Terms from './components/Terms/Terms.jsx';
import Checkout from './components/CheckOut/CheckOut.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import OrderHistory from './components/OrderHistory/OrderHistory.jsx';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/fashion1" element={<Home />} />
        <Route path="/pages/aboutus" element={<AboutUs />} />
        <Route path="/pages/ContactUs" element={<ContactUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Products" element={<CategoryProducts />} />
        <Route path="/Products/:id" element={<SingleProduct />} />
        <Route path="/pages/login" element={<Login />} />
        <Route path="/pages/forgot-password" element={<ForgotPassword />} />
        <Route path="/pages/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="/blog/grids" element={<Grid />} />
        <Route path="/shop/layout" element={<ShopPageLayout />} />
        <Route path="/pages/faq" element={<FAQ />} />
        <Route path="/location" element={<Location />} />
        <Route path="/pages/terms" element={<Terms />} />
        <Route path="/pages/Checkout" element={<Checkout />} />
        <Route path="/orders-history" element={<OrderHistory />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />





      </Routes>
      <Footer/>
    </Fragment>
  );
}

export default App;
