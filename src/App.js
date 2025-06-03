import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import GetProducts from './components/Getproducts';
import MakePayments from './components/Makepayment';
import UploadProduct from './components/UploadProduct';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { CartProvider } from './components/contexts/CartContext';
import CartCheckout from './components/cartCheckout';
import { AuthProvider } from './components/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ChatComponent from './components/bot/ChatComponent';
import AuthWrapper from './components/AuthWrapper';
import PaymentSuccess from './components/PaymentSuccess';


function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product_id === product.product_id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
  };

  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>
                <span><img src="/asets/image/shoe22.jpeg" alt="headerimg" className='Trip' /></span>
                <b className='xo'>Drift,Trip</b><b className='text'>& Drip</b> Collection
              </h1>
            </header>
            <Navbar cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Signup' element={<Signup />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/PaymentSuccess' element={<PaymentSuccess/>} />
              

              <Route 
                path='/UploadProduct' 
                element={
                  <AuthWrapper>
                    <UploadProduct />
                  </AuthWrapper>
                } 
              />
              <Route path='/ChatComponent' element={<ChatComponent/>}/>
              <Route 
                path='/Getproducts' 
                element={<GetProducts addToCart={addToCart} />} 
              />
              <Route 
                path='/MakePayments' 
                element={
                  <ProtectedRoute>
                    <MakePayments cartItems={cartItems} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path='/Cart' 
                element={
                  <ProtectedRoute>
                    <Cart 
                      cartItems={cartItems} 
                      removeFromCart={removeFromCart} 
                    />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path='/cartcheckout' 
                element={
                  <ProtectedRoute>
                    <CartCheckout />
                  </ProtectedRoute>
                }
              />
            </Routes>
            
            <hr />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;