import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import ShopAllPage from './Pages/ShopAllPage';
import ProductDetailPage from './Pages/ProductPage';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import Register from './Pages/Register';
import ApprovalMsg from './Components/ApprovalMsg';
import Cart from './Pages/Cart';
import CheckoutAddress from './Pages/CheckoutAddress';
import CheckoutPayment from './Pages/CheckoutPayment';
import Orders from './Pages/Orders';
import Contact from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import Terms from './Pages/Terms';
import Profile from './Pages/Profile';
import OrderDetails from './Pages/OrderDetails';
import { AuthProvider } from './Components/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
      <Router>
        <NavBar />
        <div className="flex-grow">
          <Routes>

            <Route path="/msg" element={<ApprovalMsg message="Item(s) successfully added to your cart!" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute/>}>
              <Route path="/checkout_payment" element={<CheckoutPayment />} />
              <Route path="/checkout_address" element={<CheckoutAddress />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order_details/:order_id" element={<OrderDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<Homepage />} />
            <Route path="/shopAll" element={<ShopAllPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/terms" element={<Terms />} />


          </Routes>
        </div>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;