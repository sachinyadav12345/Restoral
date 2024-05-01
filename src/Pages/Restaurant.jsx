import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestoData } from "../RestoSlice/RestoSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import sorryNoimg from '../Assets/Img/Sorry_No_Image_Currently_Available6439.jpg'
function Restaurant() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.RestoData.ApiData);
  useEffect(() => {
    dispatch(getRestoData());
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <div className="row d-flex mt-4">
          {data?.length > 0 &&
            data?.map((item, index) => (
              <div className="col-md-3 mb-3">
                <Card  key={index} className="me-1">
                  <CardMedia
                    sx={{ height: 130, }}
                    className="mx-auto"
                    image={item.file ? item.file : sorryNoimg}
                    
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email : {item.email} <br />
                      Phone Number : {item.phone_number} <br />
                      Country : {item.country} <br />
                      Rating : {item.rating}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Restaurant;
