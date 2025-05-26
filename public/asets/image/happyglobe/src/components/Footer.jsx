import React from 'react'
import x from './assets/images/x.png'
import ig from './assets/images/ig.png'
import fb from './assets/images/fb.png'


const Footer = () => {
  return (
    <div>
      <div class="row bg-light text-dark p-5">
        <div class="col-md-4 text-dark">
            <h3>About Us</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, iure.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio aut deserunt ullam nostrum cum atque sapiente quidem quas quae facere provident, maiores dolorem nam quisquam ipsam esse eligendi quasi velit.</p>
        </div>
        <div class="col-md-4">
            <h3>contact us</h3>
            <form action="">
                <input type="email" name="email" placeholder="Enter Email" class="form-control"/><br/>
                <textarea name="comment" id="" placeholder="leave a comment" class="form-control" rows="5"></textarea><br/>
                <input type="text" value="send massege" class="btn bg-danger text-light"/>
            </form>

        </div> 
        <div class="col-md-4">
            <h3 class="text-dark">stay connected</h3>
            <img src={fb} alt="facebook" width="48"/>
            <img src={ig} alt="instagram" width="48"/>
            <img src={x} alt="x" width="48"/>
            <p class="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam molestias obcaecati recusandae at architecto! Tenetur iusto impedit a similique? Reiciendis porro impedit at, commodi sint ullam neque nemo illum culpa!</p>
        </div>
    </div>
    <footer class="bg-dark text-center text-light">
        <p>Developed by Ernest Wanjala. &copy. All rights reserved &trade;</p>

    </footer>
    </div>
  )
}

export default Footer
