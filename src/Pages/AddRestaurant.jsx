import { Button, InputLabel, TextField } from "@mui/material";
import { useFormik, } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { postRestoData } from "../RestoSlice/RestoSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValue = {
  name: "",
  phone_number: "",
  email: "",
  password: "",
  confirmpassword: "",
  address: "",
  rating: "",
  description: "",
  country: "",
  state: "",
  city: "",
  file: "",
};
function AddRestaurant() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter Your Name"),
    phone_number: Yup.string()
      .min(10)
      .max(10)
      .required("Enter Your Phone Number"),
    email: Yup.string().email().required("Enter Your Email"),
    address: Yup.string().required("Enter Your Address"),
    rating: Yup.string().required("Enter Your Company Rating"),
    description: Yup.string().required("Enter Your Description"),
    country: Yup.string().required("Enter Your Country"),
    state: Yup.string().required("Enter Your State"),
    city: Yup.string().required("Enter Your City"),
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(postRestoData(values));
    resetForm();
    toast.success("Restaurant Add Successfully!",{
      position:"top-center",
      autoClose:1000,
      // theme:"dark"

    });  };

  const filehandler = (event) => {
    let NewFile = event.target.files[0];
    let path = URL.createObjectURL(NewFile);
    formik.setValues({ ...values, [event.target.name]: path });
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValue,
    onSubmit: onSubmit,
  });
  const { values, errors, touched, setFieldValue, handleSubmit } = formik;

  return (
    <div className="add-restaurant mt-3">
      <ToastContainer />
      <div className="container">
        <h3 className="restaurant-heading mb-4">Add Restaurant</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="restaurant-name">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Name <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="name"
                  placeholder="Enter Your Restaurant Name"
                  label="Restaurant Name"
                  value={values.name}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.name && errors.name}
                  error={touched.name && errors.name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="Email">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Email <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="email"
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
            </div>
            <div className="col-md-3 mt-3">
              <div className="Country">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Country <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="country"
                  placeholder="Enter Your Country Name"
                  label="Country"
                  value={values.country}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.country && errors.country}
                  error={touched.country && errors.country}
                />
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div className="State">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  State <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="state"
                  placeholder="Enter Your State Name"
                  label="State"
                  value={values.state}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.state && errors.state}
                  error={touched.state && errors.state}
                />
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div className="City">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  City <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="city"
                  placeholder="Enter Your City Name"
                  label="City"
                  value={values.city}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.city && errors.city}
                  error={touched.city && errors.city}
                />
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div className="Rating">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Rating <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="rating"
                  placeholder="Enter Your Company Rating "
                  label="Rating"
                  value={values.rating}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.rating && errors.rating}
                  error={touched.rating && errors.rating}
                />
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div className="Phone-number">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Phone Number <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="phone_number"
                  placeholder="Enter Your Phone Number"
                  label="Phone Number"
                  value={values.phone_number}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.phone_number && errors.phone_number}
                  error={touched.phone_number && errors.phone_number}
                />
              </div>
            </div>

            <div className="col-md-3 mt-3">
              <div className="Restauratn Image">
                <InputLabel
                  className="pb-2"
                  style={{
                    color: "black",
                    textAlign:"start"
                  }}
                >
                  Image
                </InputLabel>

                <TextField
                  variant="outlined"
                  fullWidth
                  name="file"
                  type="file"
                  onChange={filehandler}
                  // value={values.file}
                  // inputProps={{
                  //   style: {
                  //     padding: "10px",
                  //     borderRadius: "5px",
                  //     border: "1px solid #E0E0E0",
                  //   },
                  //   sx: {
                  //     "&::placeholder": {
                  //       color: "#959595",
                  //       fontSize: 12,
                  //     },
                  //   },
                  // }}
                  // sx={{
                  //   "& fieldset": { border: "none" },
                  // }}
                  placeholder={"Enter Image"}
                />
              </div>
            </div>

            <div className="col-md-3 mt-3">
              <div className="Password">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Password <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="password"
                  placeholder="Enter Your Password"
                  label="Password"
                  value={values.password}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.password && errors.password}
                  error={touched.password && errors.password}
                />
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div className="Password">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Confirm Password{" "}
                  <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="confirmpassword"
                  placeholder="Enter Your Confirm Password"
                  label="Confirm Password"
                  value={values.confirmpassword}
                  fullWidth
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.confirmpassword && errors.confirmpassword}
                  error={touched.confirmpassword && errors.confirmpassword}
                />
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="Address">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Address <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="address"
                  placeholder="Enter Your Company Address "
                  label="Address"
                  value={values.address}
                  fullWidth
                  multiline
                  rows={3}
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.address && errors.address}
                  error={touched.address && errors.address}
                />
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="Address">
                <InputLabel htmlFor="" className="text-start pb-2 text-dark">
                  Description <span className="text-danger fw-bold">*</span>
                </InputLabel>
                <TextField
                  name="description"
                  placeholder="Enter Description "
                  label="Description"
                  value={values.description}
                  fullWidth
                  multiline
                  rows={3}
                  type="text"
                  onChange={formik.handleChange}
                  helperText={touched.description && errors.description}
                  error={touched.description && errors.description}
                />
              </div>
            </div>

            <div className="button mt-4">
              <Button variant="contained" color="success" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;
