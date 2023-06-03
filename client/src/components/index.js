import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuthentication from "../lib/hooks/useAuthentication";
import Home from "./Home";
import About from "./Misc/About";
import Help from "./Misc/Help";
import Deals from "./Misc/Deals";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Checkout from "./Checkout";
import Success from "./Checkout/Success";
import Cancel from "./Checkout/Cancel";
import Cart from "./Cart";
import Layout from "./Layout";

const App = () => {
  const dispatch = useDispatch();
  const { handleAuthentication } = useAuthentication(dispatch);

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/deals" element={<Deals />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Layout>
  );
};
export default App;
