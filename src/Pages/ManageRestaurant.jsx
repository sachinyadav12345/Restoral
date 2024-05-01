import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveRestoData,
  getRestoData,
  patchRestoData,
  putRestoData,
} from "../RestoSlice/RestoSlice";
import { Box, Modal, Typography } from "@mui/material";
import { Button, InputLabel, TextField } from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Editstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
};
function ManageRestaurant() {
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const data = useSelector((state) => state.RestoData.ApiData);
  const editData = useSelector((state) => state.RestoData.EditApiData);
  useEffect(() => {
    dispatch(getRestoData());
  }, [dispatch]);
  useEffect(() => {
    if (editData !== null) {
      // Set form values when editData changes
      formik.setValues(editData);
    }
  }, [editData]);

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
  const onSubmit = (values) => {
    const { id, ...rest } = values;
    dispatch(putRestoData(id, rest));
    dispatch(getRestoData());
    toast.success("Restaurant Edit successfully!", {
      position: "top-center",
      autoClose: 1000,
      // theme:"dark"
    });
    setOpenEdit(false);
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  const handleView = (item) => {
    setViewData(item);
    setOpenView(true);
  };
  const handleViewClose = () => {
    setOpenView(false);
  };
  const handleEdit = (id) => {
    dispatch(patchRestoData(id));
    if (editData !== null) {
      formik.setValues(editData);
    }
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleDelete = (id) => {
    dispatch(RemoveRestoData(id));
  };

  const { values, errors, touched, handleSubmit } = formik;

  return (
    <div>
      <div className="Restaurant">
        <ToastContainer />
           <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 table-responsive">
              <table className="table table-hover  ">
                <thead>
                  <tr>
                    <th scope="col">Restaurant Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    <th scope="col">City</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data?.length > 0 &&
                    data?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.country}</td>
                        <td>{item.state}</td>
                        <td>{item.city}</td>
                        <td>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            className="me-2 responsive"
                            onClick={() => handleView(item)}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            className="me-2 responsive"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="view-model">
          <Modal
            open={openView}
            onClose={handleViewClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, maxHeight: "100vh" }} className="mobile-view">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Restaurant Details
                <IoIosCloseCircleOutline
                  onClick={handleViewClose}
                  className="float-end"
                  style={{ cursor: "pointer", fontSize: "30px", color: "red" }}
                />
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Restaurant Name : {viewData.name} <hr />
                Email : {viewData.email} <hr />
                Phone Number : {viewData.phone_number} <hr />
                Country : {viewData.country} <hr />
                State : {viewData.state} <hr />
                City : {viewData.city} <hr />
                Address : {viewData.address} <hr />
                Restaurant Rating : {viewData.rating}
              </Typography>
            </Box>
          </Modal>
        </div>
        <div className="Edit-model">
          <Modal
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{ ...Editstyle, maxHeight: "100vh" }}
              className="mobile-view"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Restaurant Data
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="container">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="restaurant-name">
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
                            Country{" "}
                            <span className="text-danger fw-bold">*</span>
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
                            Rating{" "}
                            <span className="text-danger fw-bold">*</span>
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
                      <div className="col-md-6 mt-3">
                        <div className="Phone-number">
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
                            Phone Number{" "}
                            <span className="text-danger fw-bold">*</span>
                          </InputLabel>
                          <TextField
                            name="phone_number"
                            placeholder="Enter Your Phone Number"
                            label="Phone Number"
                            value={values.phone_number}
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            helperText={
                              touched.phone_number && errors.phone_number
                            }
                            error={touched.phone_number && errors.phone_number}
                          />
                        </div>
                      </div>
                      <div className="col-md-3 mt-3">
                        <div className="Password">
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
                            Password{" "}
                            <span className="text-danger fw-bold">*</span>
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
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
                            helperText={
                              touched.confirmpassword && errors.confirmpassword
                            }
                            error={
                              touched.confirmpassword && errors.confirmpassword
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className="Address">
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
                            Address{" "}
                            <span className="text-danger fw-bold">*</span>
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
                          <InputLabel
                            htmlFor=""
                            className="text-start pb-2 text-dark"
                          >
                            Description{" "}
                            <span className="text-danger fw-bold">*</span>
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
                            helperText={
                              touched.description && errors.description
                            }
                            error={touched.description && errors.description}
                          />
                        </div>
                      </div>

                      <div className="button mt-4">
                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          className="ms-2"
                          onClick={handleEditClose}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ManageRestaurant;
