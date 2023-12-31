import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ContentList.css";

const ContentList = () => {
    const [contents, setContent] = useState([]);
    const [flipStates, setFlipStates] = useState([]);

    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user._id;

    useEffect(() => {
        getContent();
    }, []);

    const getContent = async () => {
        let result = await fetch(`https://bulletin-main-api.vercel.app/contents`);
        result = await result.json();
        setContent(result);
        setFlipStates(new Array(result.length).fill(false));
    };

    const toggleFlip = (index) => {
        const newFlipStates = [...flipStates];
        newFlipStates[index] = !newFlipStates[index];
        setFlipStates(newFlipStates);
    };

    const deleteContent = async (id) => {
        let result = await fetch(`https://bulletin-main-api.vercel.app/deleteContent/${userId}/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            alert("Item deleted");
            getContent();
        }
        let count = user.count;
        console.log(user['count'], count);
        user['count'] = count - 1;
        localStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <div className="content-list-div">
            <h1>Content List</h1>
            <div className="row">
                {contents.length > 0 ? contents.map((item, index) => (
                    <div className="cards" key={item._id}>
                        <div className={`flip-card-inner ${flipStates[index] ? "flipped" : ""}`} onClick={() => toggleFlip(index)}>
                            <div className="flip-card-front">
                                <div className="card_content">
                                    <div className="content-contaier">
                                        <h2 className="card_title">{item.title}</h2>
                                        <h4 className="posted_by">{item.category}</h4>
                                    </div>
                                    <div className="button-container">
                                        {userId == item.userId ? (<input
                                            type="button"
                                            value="Delete"
                                            className="del-button"
                                            onClick={() => deleteContent(item._id)}
                                        />) : (<></>)}
                                        <Link to={"/update/" + item._id} className="update-link">Update</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <h4 className="card_text">{item.content}</h4>
                            </div>
                        </div>
                    </div>
                )) : (
                    <h1>No Result Found </h1>
                )}
            </div>
        </div>
    );
};

export default ContentList;
