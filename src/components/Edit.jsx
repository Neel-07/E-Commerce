import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from "../utils/Context";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const ChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const foundProduct = products.find((p) => p.id == id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Every field must have at least 4 characters");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };
    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={ChangeHandler}
        value={product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={ChangeHandler}
        value={product.title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={ChangeHandler}
          value={product.category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={ChangeHandler}
          value={product.price}
        />
      </div>
      <textarea
        placeholder="enter product description here..."
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="description"
        onChange={ChangeHandler}
        value={product.description}
        rows="10"
      ></textarea>
      <div className="w-1/2">
        <button className="py-3 px-5 border rounded border-blue-200 text-blue-300">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
