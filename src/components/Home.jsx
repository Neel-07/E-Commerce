import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1] || "");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if(!filteredProducts)
    //   setFilteredProducts(products);
        
    if (category !== "undefined" && category !== "") {
      // getProductsByCategory();
      setFilteredProducts(products.filter(p => p.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return products ? (
    <>
      <Navbar />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="card mr-3 mb-3 p-3 border shadow rounded h-[30vh] w-[18%] flex flex-col justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${p.image})` }}
              ></div>
              <h1 className="hover:text-blue-300">{p.title}.</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
