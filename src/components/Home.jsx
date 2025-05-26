import "bootstrap/dist/js/bootstrap.js"
import 'bootstrap/dist/css/bootstrap.min.css'


const Home = () => {
  return (
      <div className="Elvis">
        <div className="Elvis">
            

        </div>
        <header>
        <h2 className='test'>New arrival in the shop</h2>
        </header>


        <section className="row"> 
        <div className="col-md-12">
                <div className="carousel slide" data-bs-ride="carousel" id="mycarousel" data-bs-interval="1000">
                    
                     <div className="carousel-inner">
                        <div className="carousel-item active">
                         <img src="/asets/image/shoe28.jpeg" alt="" className="w-50" />
                        </div>
                        <div className="carousel-item">
                        <img src="/asets/image/shoe19.jpg" alt="" className="w-50"  />
                        </div>
                        <div className="carousel-item">
                        <img src="/asets/image/shoe9.jpeg" alt="" className="w-50"  />
                        </div>
                        <div className="carousel-item">
                        <img src="/asets/image/shoe26.jpeg" alt=""  className="w-50" />
                        </div>
                        <div className="carousel-item">
                        <img src="/asets/image/shoe24.jpeg" alt="" className="w-50"  />
                        </div>
                        <div className="carousel-item">
                        <img src="/asets/image/shoe22.jpeg" alt="" className="w-50"  />
                        </div>
                        <div className="carousel-item">
                        <img src="/asets/image/shoe23.jpeg" alt=""  className="w-50" />
                        </div>
                     </div>
                     
                    <a href="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-success"></span>
                    </a>

                    <a href="#mycarousel" className="carousel-control-next" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-info"></span>
                    </a>

                    <div className="carousel-indicators">
                    <button className="button active" type="button" data-bs-target="#mycarousel" data-bs-slide-to="0"></button>
                    <button className="button" type="button" data-bs-target="#mycarousel" data-bs-slide-to="1"></button>
                    <button className="button" type="button" data-bs-target="#mycarousel" data-bs-slide-to="2"></button>
                    <button className="button" type="button" data-bs-target="#mycarousel" data-bs-slide-to="3"></button>
                    <button className="button" type="button" data-bs-target="#mycarousel" data-bs-slide-to="4"></button>
                    <button className="button" type="button" data-bs-target="#mycarousel" data-bs-slide-to="5"></button>
                    <button className="button" type="button" data-bs-target="#mycarousel" data-bs-slide-to="6"></button>
                    </div>

                </div>
            </div>
        </section>
    <section className="row text-center" >
    <div className="col-md-4">
        <div className="card card shadow ">
            <div className="card-header">
                <h5>Jordan 4 </h5>
            </div>
            <div className="card-body" >
            <img  src="/asets/image/shoe3.jpeg" alt=""  className='hover-image' style={{ width: '30vh' }}  />
            <p>The Jordan 4 brickl by brick</p>
            <h6 className="text-danger">3,500</h6>
            </div>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card card shadow">
            <div className="card-header">
                <h5>Jordan 1</h5>
            </div>
            <div className="card-body">

            <img src="/asets/image/shoe4.jpeg" alt=""  className='hover-image' style={{ width: '28vh' }} />
            <p>Jordan 1 univasity blue</p>
            <h6 className="text-danger">2,500</h6>
            </div>
        </div>
    </div>

    <div className="col-md-4">
        <div className="card card shadow">
            <div className="card-header">
                <h5>Air Force 1</h5>
            </div>
            <div className="card-body">
            <img src="/asets/image/shoe5.jpeg" alt="" className='hover-image' style={{ width: '45vh' }} /> 
            <p>AirForce 1 venom</p>
            <h6 className="text-danger">2,600</h6>
            </div>
        </div> 
    </div>
    </section>
<hr />
    <section className="row text-center"> 
    <h2 className='brick'>Our best Selling shoes</h2>
        <div className="col-md-3">
             <img src="/asets/image/shoe10.jpeg" alt="" className='hover-image' style={{ width: '30vh', height:'25vh' }} />
            <h6>Jordan 4 pure Money</h6>
            <p>The shoe comes with a Box,An authetication tag from Stock ❎</p>
            <h6 className="text-danger">KES 3000</h6>
        </div>
        <div className="col-md-3">
             <img src="/asets/image/shoe13.jpeg" alt="" className='hover-image' style={{ width: '30vh', height:'25vh' }} />
            <h6>Jordan 1 OffWhite</h6>
            <p>The shoe comes with a Box AND An authetication tag from Stock ❎</p>
            <h6 className="text-danger">KES 4500</h6>
        </div>
        <div className="col-md-3">
             <img src="/asets/image/shoe12.jpeg" alt="" className='hover-image' style={{ width: '30vh', height:'25vh' }} />
            <h6>Jordan 4 PSG</h6>
            <p>The shoe comes with a Box,An authetication tag from Stock ❎</p>
            <h6 className="text-danger">KES 4500</h6>
        </div>
        <div className="col-md-3">
             <img src="/asets/image/shoe9.jpeg" alt="" className='hover-image'  style={{ width: '30vh', height:'25vh' }} />
            <h6>Jordan 6 </h6>
            <p>The shoe comes with a Box,An authetication tag from Stock ❎</p>
            <h6 className="text-danger">KES 2900</h6>
        </div>
    </section>
<hr />
    <section className="row text-center">
    <h2 className='jordan'>Most expensive shoes in the shop</h2>
            <div className="col-md-3">
            <img src="/asets/image/shoe14.jpeg" alt="" className='hover-image' style={{ width: '35vh', height:'25vh' }} />
                <h6>Nike Air Mogs Back to the future</h6>
                <p>It come with a box and an authetication tag from Stock ❎</p>
                <h6 className="text-danger">KES 50000</h6>
            </div>
            <div className="col-md-3">
            <img src="/asets/image/shoe15.jpeg" alt="" className='hover-image' style={{ width: '30vh', height:'25vh' }} />
                <h6>Nacked Wolf customized</h6>
                <p>It come with a box and an authetication tag from Stock ❎</p>
                <h6 className="text-danger">KES 45000</h6>
            </div>
            <div className="col-md-3">
            <img src="/asets/image/shoe16.jpeg" alt="" className='hover-image' style={{ width: '30vh', height:'25vh' }} />
                <h6>Verserce shoe</h6>
                <p>It come with a box and an authetication tag from Stock ❎</p>
                <h6 className="text-danger">KES 20000</h6>
            </div>
            <div className="col-md-3">
            <img src="/asets/image/shoe17.jpeg" alt="" className='hover-image' style={{ width: '30vh', height:'25vh' }} />
                <h6> Limited Editon Doc Martin</h6>
                <p>It come with a box and an authetication tag from Stock ❎</p>
                <h6 className="text-danger">KES 10000</h6>
            
            </div>
         </section>

    <div className="row bg-secondary">
    <div className="col md-4 text-center">
        <h4>About Us</h4>
        <p>Drift,Trip and Drip is a shoe store that sells high end shoes of all sizes that are legit and approved by stoke x </p>
        <div className="col md-4">
        <h5>Leave a comment</h5>
        <form action="">
          <input type="text"
          placeholder='Leave your comment' 
          /> <br /> 
          <button className="submit btn btn btn-outline-warning "> Submit</button>
          <div className="col md-4">
          <h4>Contact Us</h4>
             <img src="/asets/image/fb.jpeg" alt="" className='logo' />
             <img src="/asets/image/ig.jpeg" alt="" className='logo' />
             <img src="/asets/image/x.jpeg" alt="" className='logo' />
             <p>At all social media handles contact as @ Drift,Trip& Drip</p>

          </div>
          <div>
            <h4>Vist us at our Main shop</h4>
            <h6 className="maps">Click here 👇 to show shop location 📍</h6>
            <a href="https://maps.app.goo.gl/SGrm84nTVG9Taosx7?g_st=aw">
<img src="/asets/image/map.jpeg" alt="" className='logo'
/></a>
            
            
            <p className="map">Our shopis located in juja city mall,second floor shop B12</p>
            
   
          </div>
        </form>
        </div>
    </div>
    {/* <footer className="bg-muted text-center text-white"><marquee behavior="alternate" direction="right">Come on come to the best shoe store in town</marquee></footer> */}
  </div>
    </div>
  )
}

export default Home



















































 


