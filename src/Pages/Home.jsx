import React from "react";
import PizzaImg from '../Assets/Img/pizza image.png'
import { Button } from "@mui/material";
function Home() {
  return (
    <div className="home-img">
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-4 box">
            <div className="frist-heading">
              <div className="heading">
                <span className="new">New</span>
              </div>
              <div>
                <h1 className="pizza-text">Pizza</h1>
              </div>
              
            </div>
            <div className="second-heading">
              <h1>With seafood</h1>
            </div>
            <div className="button">
                <Button variant="contained" color="success" className="order-online">Order Online</Button>
              </div>
          </div>
          <div className="col-md-1">

          </div>
          <div className="col-md-7">
            <div className="img-contain">
              <img src={PizzaImg} alt="" className="img-fluid myimg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
