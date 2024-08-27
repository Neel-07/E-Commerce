import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import axios from "../utils/axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id);
  // const getsingleproduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if(!product){
      setProduct(products.filter((p)=> p.id == id)[0]);
    }
    // getsingleproduct();
  }, []);
  
  const ProductDeleteHandler = (id) =>{
    const FilteredProducts = products.filter((p)=> p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products",JSON.stringify(FilteredProducts));
    navigate("/");
  }
  return product ? (
    <div className="w-[80%] flex h-full m-auto p-[10%] ">
      <img
        className="object-contain h-[80%] w-[40%] "
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[60%] flex flex-col mt-20 ml-10 ">
        <h1 className="text-4xl font-semibold">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">$ {product.price}</h2>
        <p className="mb-[5%]">{product.description}</p>
        <div className="flex">
          <Link to={`/edit/${product.id}`} className="mr-6 py-3 px-5 border rounded border-blue-200 text-blue-300">
            Edit
          </Link>
          <button  onClick={() => ProductDeleteHandler(product.id)
          } className=" py-3 px-5 border rounded border-red-200 text-red-300">
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
