import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  function login(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then().catch();
    setEmail("");
    setPassword("");
    history.push("/");
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={login} action={/*login route */ ""} method="post">
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          name="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New to bashkbano?
        <Link to="/signup">
          <span className="link"> Sign Up</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
