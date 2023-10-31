import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const prodSubmit = async () => {
    if (!title || !content || !category) {
      setError(true);
      return false;
    }
    // console.warn(title, category, content);

    let userId = JSON.parse(localStorage.getItem("user"));
    console.log(userId._id);
    userId = userId._id;

    let result = await fetch("http://localhost:5000/addContent", {
      method: "POST",
      body: JSON.stringify({ title, category, content, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    setTitle("");
    setCategory("");
    setContent("");
    console.log(title);
  };

  return (
    <div className="prod-form">
      <h1 className="heading">Add Content</h1>
      <div className="inputBox">
      <input
        type="text"
        placeholder="Enter Title"
        className="prod-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && !title ? (
        <span className="invalid-input">Enter valid title</span>
      ) : (
        <></>
      )}
      </div>

      <div className="inputBox">
      <input
        type="text"
        placeholder="Enter Category"
        className="prod-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category ? (
        <span className="invalid-input">Enter category</span>
      ) : (
        <></>
      )}
      </div>

      <div className="inputBox">
      <textarea
        rows="4"
        placeholder="Enter Content"
        className="prod-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      >
      {error && !content ? (
        <span className="invalid-input">Enter valid content</span>
      ) : (
        <></>
      )}
      </textarea>
      </div>
      <input
        type="button"
        value="Publish Post"
        id="prod-submit"
        onClick={prodSubmit}
      />
    </div>
  );
};

export default AddProduct;
