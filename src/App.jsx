import React from "react";
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";
import { Link, Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
  const { search, pathname } = useLocation();
  return (
    <div className="h-screen w-screen flex">
      {(pathname != '/' || search.length > 0 ) && (
      <Link to="/" className="absolute left-[17%] top-[3%] text-red-300">Home</Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
