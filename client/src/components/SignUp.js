import React, {useState} from "react";
import { Redirect } from "react-router-dom";

function SignUp() {
  let username = React.createRef();
  let password = React.createRef();
  let passwordConfirm = React.createRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(username.current.value);
    if (password.current.value !== passwordConfirm.current.value) {
      setMessage("Error: Password must match the confirmation.");
    } else {
      setMessage("Creating account!");
      let user = await true; // will call server
      if (!user) {
        setMessage("Error: Could not create account. Username taken.");
      } else {
        setMessage("Account Created! Please wait while you're routed home.");
        setTimeout(() => setMessage(<Redirect to="/"/>), 1500);
      }
    }
  }

  const [message, setMessage] = useState("");

  return (
    <div className="SignUp">
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username</label>
        <input ref={username} name="username" required="required" />
        <label htmlFor="password">Password</label>
        <input ref={password} type="password" name="password" required="required" />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input ref={passwordConfirm} type="password" name="passwordConfirm" required="required" />
        <button type="submit">Submit</button>
      </form>
      {message ? <p>{message}</p> : <React.Fragment></React.Fragment>}
    </div>
  );
}

export default SignUp;
