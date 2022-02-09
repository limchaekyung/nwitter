import React, { useState } from "react";

const Auth = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
      const {
          target: {name, value},
      } = event;
      if(name === "email"){
          setemail(value);
      } else if(name === "password"){
          setPassword(value);
      }
  }
  const onSubmit = (event) => {
      event.preventDefault();
      // 기본행위가 실행되는 걸 막음
  }
  return (
    <div>
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
        <input type="submit" value="Login" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
