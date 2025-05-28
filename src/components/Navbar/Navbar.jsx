import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../App.css';
import './Navbar.css';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartItemCount } = useCart();

  useEffect(() => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarMenu) {
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navbarMenu.classList.remove('show');
        });
      });
    }
    
    return () => {
      if (navbarToggler) {
        navbarToggler.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 navbar-gradient">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <span className="text-warning">Drift</span>,Trip & Drip
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <Link to="/" className="nav-link">
                Home
                <div className="nav-underline"></div>
              </Link>
            </li>
           
            <li className="nav-item px-2">
              <Link to="/Getproducts" className="nav-link">
                Products
                <div className="nav-underline"></div>
              </Link>
            </li>
            
            <li className="nav-item px-2">
              <Link to="/ChatComponent" className="nav-link">
                <img className='chat' src="/asets/image/chatbot.png" alt="" />
                <div className="nav-underline"></div>
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/UploadProduct" className="nav-link">
                Upload
                <div className="nav-underline"></div>
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link to="/cart" className="nav-link position-relative">
              <img className='peg' src="/asets/image/cart.jpeg" alt="" />
                <i className="fs-5"></i>
                {cartItemCount > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    style={{
                      fontSize: '0.6rem',
                      padding: '0.25rem 0.4rem',
                      minWidth: '1.25rem',
                      animation: cartItemCount > 0 ? 'bounce 0.5s' : 'none'
                    }}
                  >
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
          
          <div className="d-flex ms-lg-3 mt-3 mt-lg-0 auth-buttons">
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="btn btn-outline-danger btn-sm mx-1"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/Login" 
                  className="btn btn-outline-secondary btn-sm mx-1 text-white border-white"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-outline-warning btn-sm mx-1"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;