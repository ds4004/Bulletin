import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`https://e-dashboard-api.vercel.app/product/${params.id}`);
        result = await result.json();
        // console.log(result);

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProd = async () => {
        console.log(name, price, category, company);

        let result = await fetch(`https://e-dashboard-api.vercel.app/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({name, price, category, company}),
            headers:{
                "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.log(result);

        Navigate("/");
    };
    
    return (
        <div className="prod-form">
            <h1>Update Product</h1>
            <input
                type="text"
                placeholder="Enter product name"
                className="prod-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter product price"
                className="prod-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter product category name"
                className="prod-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter product company name"
                className="prod-input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
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