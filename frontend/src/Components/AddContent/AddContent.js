import React, { useState } from "react";
import "./AddContent.css";

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const prodSubmit = async () => {
    if (!title || !content || !category) {
      setError(true);
      return false;
    }

    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user._id);
    let userId = user._id;

    let result = await fetch("https://bulletin-main-api.vercel.app/addContent", {
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

    // user = user ? user : {};
    let count = user.count;
    console.log(user['count'], count);
    user['count'] = count+1;
    localStorage.setItem('user', JSON.stringify(user));
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
          className="prod-box"
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

export default AddContent;