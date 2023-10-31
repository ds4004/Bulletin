import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [contents, setContent] = useState([]);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    let result = await fetch(`http://localhost:5000/contents`);
    result = await result.json();
    setContent(result);
  };
  console.log(contents);

  const deleteContent = async (id) => {
    let result = await fetch(`http://localhost:5000/deleteContent/${id}`, {
      method: "Delete"
    });
    result = result.json();
    if (result) {
      alert("Item deleted");
      getContent();
    }
  };

  return (
    <div className="product-list-div">
      <h1>Content List</h1>
      <ul className="cards">
      {contents.length > 0 ? contents.map((item, index) =>
        <li className="product-list" key={item._id}>
        <div className="card">
        <div className="card_content">
          <h2 classNmae="card_title">{item.title}</h2>
          <h4 className="posted_by">{item.category}</h4>
          <p className="card_text">{item.content}</p>
          <input type="button" value="DELETE" className="del-button" onClick={() => deleteContent(item._id)} />
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
