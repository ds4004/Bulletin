import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`https://e-dashboard-api.vercel.app/products`);
    result = await result.json();
    setProducts(result);
  };
  console.log(products);

  const deleteProduct = async (id) => {
    let result = await fetch(`https://e-dashboard-api.vercel.app/product/${id}`, {
      method: "Delete"
    });
    result = result.json();
    if (result) {
      alert("Item deleted");
      getProducts();
    }
  };

  return (
    <div className="product-list-div">
      <h1>Product List</h1>
      <ul className="cards">
      {products.length > 0 ? products.map((item, index) =>
        <li className="product-list" key={item._id}>
        <div className="card">
        <div className="card_content">
          <h2 classNmae="card_title">{item.title}</h2>
          <h4 className="posted_by">{item.category}</h4>
          <p className="card_text">{item.content}</p>
          <input type="button" value="DELETE" className="del-button" onClick={() => deleteProduct(item._id)} />
          <Link to={"/update/" + item._id}>Update</Link>
        </div>
        </div>
        </li>
      ) : (
        <h1>No Result Found </h1>
      )}
      </ul>
    </div>
  );
};

export default ProductList;
