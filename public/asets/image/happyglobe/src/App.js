
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import'bootstrap/dist/js/bootstrap.js'
import Footer from './components/Footer';
import Carousel  from './components/Carousel'
import Jobsavailable from './components/Jobsavailable';
import Postajob from './components/Postajob';
import Apply from './components/Apply';



function App() {
  
  return (

    
     <Router>
      <div className="App container-fluid">
        <header className="App-header">
          <h1>
          <span className='imgspan'>
              <img src="/work-from-home.jpg" alt="basket" className='headerimg' />
            </span>
            HAPPY GLOBE - living better days of job satisfactory
          </h1>
        </header>

       <Navbar/>
       <Carousel/>
        <Routes>
          <Route path='/signup'Component={Signup}></Route>
          <Route path='/Footer'Component={Footer}></Route>
          <Route path='/Apply'Component={Apply}></Route>
          <Route path='/signin'Component={Signin}></Route>
          <Route path='/Jobsavailable' Component={Jobsavailable}></Route>
          <Route path='/Postajob' Component={Postajob}></Route>



        </Routes>
        
        
        <Footer/>
      </div>

     </Router>
    
    

  );
}

export default App;
