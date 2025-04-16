import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import GetProducts from './components/Getproducts';
import MakePayments from'./components/Makepayment';
import UploadProduct from './components/UploadProduct'

function App() {
  return (
<Router>
  <div className="App">
    <header className="App-header">
    <h1>
    <span><img src="/asets/image/shoe2.jpeg" alt="headerimg" className='Trip' /></span>
    <b className='xo'>Drift,Trip</b><b className='text'>& Drip</b> Collection
    </h1>
    </header>

    <nav className='text-center'>
      <Link to={'/Home'} className='btn btn-outline-success m-2 px-5'> Home page 🏠</Link>
      <Link to={'/Signup'} className='btn btn-outline-success m-2 px-5'> Sign up 🖋</Link>
      <Link to={'/Login'} className='btn btn-outline-danger m-2 px-5'>Log in 🚀</Link>
      <Link to={'/UploadProduct'} className='btn btn-outline-danger m-2 px-5'>Upload products 📤</Link>
      <Link to={'/Getproducts'} className='btn btn-outline-warning m-2 px-5'>Get Products 👟</Link>
     
    </nav>

    <Routes>
    <Route path='/Home' Component={Home}/>
    <Route path='/Signup' Component={Signup} />
    <Route path='/Login' Component={Login}/>
    <Route path='/UploadProduct' Component={UploadProduct} />
    <Route path='/Getproducts' Component={GetProducts}/>
    <Route path='/Makepayment' Component={MakePayments}/>
    </Routes>
    <hr />
    
    </div>

</Router>
);

}

export default App;


