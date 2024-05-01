import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Navbar from './Components/Navbar';
import Restaurant from "./Pages/Restaurant";
import AddRestaurant from "./Pages/AddRestaurant";
import Login from "./Pages/Login";
import ManageRestaurant from "./Pages/ManageRestaurant";
import Layout from "./Pages/Layout";
import Nav from "./Components/Nav";
import Protected from "./Components/Protected";
import Footer from "./Pages/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/addRestaurant" element={<Protected component={AddRestaurant} />} />
          <Route path="/manageRestaurant" element={<Protected component={ManageRestaurant} />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
