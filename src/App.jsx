import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <>
      <Navbar color="pink" textColor="#301934 " />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<Details />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
