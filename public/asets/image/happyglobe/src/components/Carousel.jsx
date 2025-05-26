import React from 'react'
import cleaning from './assets/images/cleaning.jpg'
import flowertriming from './assets/images/flowertriming.jpg'
import grass from './assets/images/grass.jpg'
import header from'./assets/images/header.jpg'


const Carousel = () => {
  return (
    <div>
      <section class="row">
            <div class="col-md-12">
                <div class="carousel slide" data-bs-ride="carousel" id="mycarousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={flowertriming} alt="" class="d-block w-100" width="1500px" height="400px"/>
                        </div>
                        <div class="carousel-item">
                            <img src={grass} alt="" class="d-block " width="1700px" height="400px"/>
                        </div>
                        <div class="carousel-item">
                            <img src={header} alt="" class="d-block " width="1700px" height="400px"/>
                        </div>
                        <div class="carousel-item">
                        <img src={cleaning} alt="" class="d-block " width="1700px" height="400px"/>
                        </div>
                    </div>
                    
                      <a href="#mycarousel" class="carousel-control-prev " data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-danger"></span>
                      </a>
                      <a href="#mycarousel" class="carousel-control-next " data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-danger"></span>
                      </a>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Carousel
