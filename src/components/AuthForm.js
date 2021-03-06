import React, { useState } from "react";
import { authService } from "fbase";
const AuthForm = () => {
    const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
          let data;
          if (newAccount) {
            //create account
            data = await authService.createUserWithEmailAndPassword(
              email,
              password
            );
          } else {
            //login
            data = await authService.signInWithEmailAndPassword(email, password);
          }
          console.log(data);
        } catch (error) {
          setError(error.message);
        }
      };
      const toggleAccount = () => setNewAccount((prev) => !prev);
      const onChange = (event) => {
        const {
          target: { name, value },
        } = event;
        if (name === "email") {
          setemail(value);
        } else if (name === "password") {
          setPassword(value);
        }
      };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
        {error}
        <span onClick={toggleAccount}>
          {newAccount ? "Sign in" : "Create Account"}
        </span>
      </form>
    </>
  );
};

export default AuthForm;
