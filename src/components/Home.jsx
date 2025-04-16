import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'bootstrap/dist/css/bootstrap.min.css'


const Home = () => {
  return (
      <div className="App">
        <header>
        <h2 className='test'>Our best Selling shoes</h2>
        </header>

        <section class="row"> 
        <div class="col-md-12">
                <div class="carousel slide" data-bs-ride="carousel" id="mycarousel" data-bs-interval="10000">
                    
                     <div class="carousel-inner">
                        <div class="carousel-item active">
                         <img src="/asets/image/shoe7.jpeg" alt="" class="w-50" />
                        </div>
                        <div class="carousel-item">
                        <img src="/asets/image/shoe8.jpeg" alt="" class="w-50"  />
                        </div>
                        <div class="carousel-item">
                        <img src="/asets/image/shoe9.jpeg" alt="" class="w-50"  />
                        </div>
                        <div class="carousel-item">
                        <img src="/asets/image/shoe10.jpeg" alt=""  class="w-50" />
                        </div>
                        <div class="carousel-item">
                        <img src="/asets/image/shoe11.jpeg" alt="" class="w-50"  />
                        </div>
                        <div class="carousel-item">
                        <img src="/asets/image/shoe12.jpeg" alt="" class="w-50"  />
                        </div>
                        <div class="carousel-item">
                        <img src="/asets/image/shoe13.jpeg" alt=""  class="w-50" />
                        </div>
                     </div>
                     <a href="#mycarousel" className="prev" class="carousel-control-prev" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-success"></span>

                        <a href="#mycarousel" className="next" class="carousel-control-next" data-bs-slide="next">
                            <span class="carousel-control-next-icon bg-info"></span>
                        </a>
                      </a>
                </div>
            </div>
        </section>
    <section class="row text-center">
    <div class="col-md-4">
        <div class="card card shadow ">
            <div class="card-header">
                <h5>Jordan 4 </h5>
            </div>
            <div class="card-body">
            <img src="/asets/image/shoe3.jpeg" alt=""  className='brick'/>
            <p>The Jordan 4 brickl by brick</p>
            <h6 class="text-danger">3,500</h6>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card card shadow">
            <div class="card-header">
                <h5>Jordan 1</h5>
            </div>
            <div class="card-body">
            <img src="/asets/image/shoe4.jpeg" alt="" className='jordan' />
            <p>Jordan 1 univasity blue</p>
            <h6 class="text-danger">2,500</h6>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card card shadow">
            <div class="card-header">
                <h5>Air Force 1</h5>
            </div>
            <div class="card-body">
            <img src="/asets/image/shoe5.jpeg" alt="" className='venom' />
            <p>AirForce 1 venom</p>
            <h6 class="text-danger">2,600</h6>
            </div>
        </div> 
    </div>
    </section>
    <div class="row bg-secondary">
    <div class="col md-4 text-center">
        <h4>About Us</h4>
        <p>Drift,Trip and Drip is a shoe store that sells high end shoes of all sizes that are legit and approved by stoke x </p>
        <div class="col md-4">
        <h5>Leave a comment</h5>
        <form action="">
          <input type="text"
          placeholder='Leave your comment' 
          
          />
          <div class="col md-4">
          <h4>Contact Us</h4>
             <img src="/asets/image/fb.jpeg" alt="" className='logo' />
             <img src="/asets/image/ig.jpeg" alt="" className='logo' />
             <img src="/asets/image/x.jpeg" alt="" className='logo' />
             <p>At all social media handles contact as @ Drift,Trip& Drip</p>

          </div>
        </form>
        </div>
    </div>
    <footer class="bg-muted text-center text-white"><marquee behavior="alternate" direction="right">Come on come to the best shoe store in town</marquee></footer>
  </div>
    </div>
    
    

    
  )
}

export default Home



















































 


