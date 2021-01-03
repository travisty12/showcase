import React, {useState} from "react";
import { Redirect } from "react-router-dom";

function SignIn() {
  let username = React.createRef();
  let password = React.createRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    let user = await true; // will be fetch to server
    if (!user) {
      setMessage("Error: Username or password invalid.");
    } else {
      setMessage("Successfully logged in! Routing home...");
      setTimeout(() => setMessage(<Redirect to="/" />), 1500);
    }
  }

  const [message, setMessage] = useState("");

  return (
    <div className="SignIn">
      <form onSubmit={handleSignIn}>
        <label htmlFor="username">Username</label>
        <input ref={username} name="username" />
        <label htmlFor="password">Password</label>
        <input ref={password} type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
      {message ? <p>{message}</p> : <React.Fragment></React.Fragment>}
    </div>
  );
}

export default SignIn;
