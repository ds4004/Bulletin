import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`https://localhost:5000/contents`);
    result = await result.json();
    setProducts(result);
  };
  console.log(products);

  const deleteProduct = async (id) => {
    let result = await fetch(`https://localhost:5000/content/${id}`, {
      method: "Delete"
    });
    result = result.json();
    if (result) {
      alert("Item deleted");
      getProducts();
    }
  };

  const searchResult = async (event) => {
    let key = event.target.value;
    if (key) {
      // let result = await fetch(`${process.env.api}` + `/search/${key}`);
      let result = await fetch(`https://localhost:5000/search/${key}`);
      result = await result.json();
      if (result)
        setProducts(result);
    }
    else {
      getProducts();
    }
  }
  return (
    <div className="product-list-div">
      <h1>Product List</h1>
      <input type="text" onChange={searchResult} />
      <ul className="product-list">
        <li className="product-list-item">Sr. no.</li>
        <li className="product-list-item">Name</li>
        <li className="product-list-item">Price</li>
        <li className="product-list-item">Category</li>
        <li className="product-list-item">Company</li>
        <li className="product-list-item">Operation</li>
      </ul>
      {products.length > 0 ? products.map((item, index) =>
        <ul className="product-list" key={item._id}>
          <li className="product-list-item">{index + 1}</li>
          <li className="product-list-item">{item.name || "name"}</li>
          <li className="product-list-item">{item.price}</li>
          <li className="product-list-item">{item.category}</li>
          <li className="product-list-item">{item.company}</li>
          <li className="product-list-item">
            <input type="button" value="DELETE" className="del-button" onClick={() => deleteProduct(item._id)} />
            <Link to={"/update/" + item._id}>Update</Link>
          </li>
        </ul>
      ) : (
        <h1>No Result Found </h1>
      )}
    </div>
  );
};

export default ProductList;
