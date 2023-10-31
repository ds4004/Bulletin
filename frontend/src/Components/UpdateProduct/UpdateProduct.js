import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const UpdateProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const params = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`https://localhost:5000/content/${params.id}`);
        result = await result.json();
        // console.log(result);

        setTitle(result.title);
        setCategory(result.category);
        setContent(result.content);
    }

    const updateProd = async () => {
        console.log(title, category, content);

        let result = await fetch(`https://localhost:5000/content/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ title, category, content }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.log(result);

        Navigate("/");
    };

    return (
        <div className="prod-form">
            <h1>Update Content</h1>

            <input
                type="text"
                placeholder="Enter Title"
                className="prod-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Category"
                className="prod-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type="textarea"
                placeholder="Enter Content"
                className="prod-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <input
                type="button"
                value="Update Product"
                id="prod-submit"
                onClick={updateProd}
            />
        </div>
    );
};

export default UpdateProduct;