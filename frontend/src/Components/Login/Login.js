import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/");
    }
  });

  const handleLogin = async () => {
    console.log(email, password);

    let result = await fetch("http://localhost:5000/login", {
      // mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      Navigate("/");
    } else {
      alert("Invalid Credentials");
    }

    console.log(result);
  };

  return (
    <div className="signin-form">
      <h1 className="heading">Login</h1>
      <div className="inputBox">
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="signin-input"
        />
      </div>

      <div className="inputBox">
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="signin-input"
        />
      </div>

      <input
        type="button"
        value="Sign in"
        id="signin-submit"
        onClick={handleLogin}
      />
    </div>
  );
};

export default Login;