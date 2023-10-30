import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      Navigate("/");
    }
  });

  const check = async () => {
    console.log(name, email, password);

    let result = await fetch("https://e-dashboard-api.vercel.app/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
    
    if (result) {
      Navigate("/");
    }
  };
  
  return (
    <div className="reg-form">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        className="reg-input"
      />
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        className="reg-input"
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        className="reg-input"
      />
      <input type="button" value="Register" id="reg-submit" onClick={check} />
    </div>
  );
};

export default SignUp;
