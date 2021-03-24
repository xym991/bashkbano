import React from "react";
import { useState } from "react";
import { auth } from "../firebase";
import "./Login.css";
import { useGlobalState } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function signUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection("users").doc(user.user.uid).set({});
      })
      .catch();
    setEmail("");
    setPassword("");
    history.push("/");
  }

  return (
    <div className="login">
      <h1>Sign Up</h1>
      <form onSubmit={signUp} action={/*Signup route */ ""} method="post">
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        already have an account?
        <Link to="/login">
          <span className="link"> Login</span>
        </Link>
      </p>
    </div>
  );
}

export default Signup;
