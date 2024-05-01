import { Button, InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ChangeStatus, getRestoData } from "../RestoSlice/RestoSlice";
import { useNavigate } from "react-router-dom";

const initialValue = {
  email: "",
  password: "",
};
function Login() {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const RestoData = useSelector((state)=>state.RestoData.ApiData)

      useEffect(() => {
        dispatch(getRestoData());
      }, [dispatch]);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Enter Your Email"),
    password: Yup.string().required("Enter Your Password"),
  });

  const onSubmit = (values) => {
    const user = RestoData.find((user)=>user.email === values.email && user.password === values.password)
    if(user){
     dispatch(ChangeStatus(false))
      navigate("/")

    }
    else {
      alert('Invalid email or password');
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const { values, errors, touched, handleSubmit } = formik;
  return (
    <>
      <div className="login-page">
        <div className="container">
          <div className="login-contain  mx-auto">
            <div className="login-hading">
              <h2>Login Your Restaurant</h2>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="Email mt-5">
                <TextField
                  name="email"
                  variant="filled"
                  color="success"
                  placeholder="Enter Your Email"
                  label="Email"
                  value={values.email}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.email && errors.email}
                  error={touched.email && errors.email}
                />
              </div>

              <div className="Password mt-4">
                <TextField
                  name="password"
                  placeholder="Enter Your Password"
                  label="Password"
                  variant="filled"
                  color="success"
                  value={values.password}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.password && errors.password}
                  error={touched.password && errors.password}
                />
              </div>
              <div className="button mt-3">
                <Button variant="contained" color="success" type="submit">
                  LOGIN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
