import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const prodSubmit = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    // console.warn(name, price, category, company);

    let userId = JSON.parse(localStorage.getItem("user"));
    console.log(userId._id);
    userId = userId._id;
    let result = await fetch("https://e-dashboard-api.vercel.app/addProduct", {
      method: "POST",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    console.log(name);
  };

  return (
    <div className="prod-form">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="prod-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name ? (
        <span className="invalid-input">Enter valid name</span>
      ) : (
        <></>
      )}
      <input
        type="text"
        placeholder="Enter product price"
        className="prod-input"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price ? (
        <span className="invalid-input">Enter valid price</span>
      ) : (
        <></>
      )}
      <input
        type="text"
        placeholder="Enter product category name"
        className="prod-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category ? (
        <span className="invalid-input">Enter valid category</span>
      ) : (
        <></>
      )}
      <input
        type="text"
        placeholder="Enter product company name"
        className="prod-input"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company ? (
        <span className="invalid-input">Enter valid company</span>
      ) : (
        <></>
      )}
      <input
        type="button"
        value="Add Product"
        id="prod-submit"
        onClick={prodSubmit}
      />
    </div>
  );
};

export default AddProduct;
