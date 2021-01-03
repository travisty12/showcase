import React, {useState} from "react";

function SignUp() {
  let username = React.createRef();
  let password = React.createRef();
  let passwordConfirm = React.createRef();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(username.current.value);
    if (password.current.value !== passwordConfirm.current.value) {
      setErrors("Password must match the confirmation.");
      console.log("error");
    } else {
      setErrors("");
      console.log("fetching to create user");
    }
  }

  const [errors, setErrors] = useState("");

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
      {errors ? <p>Errors: {errors}</p> : <React.Fragment></React.Fragment>}
    </div>
  );
}

export default SignUp;
