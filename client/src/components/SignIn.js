import React, {useState} from "react";

function SignIn() {
  let username = React.createRef();
  let password = React.createRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("fetching user");
    let user = await true; // will be fetch to server
    if (!user) {
      setErrors("Username or password invalid.");
    } else {
      setErrors("");
    }
  }

  const [errors, setErrors] = useState("");

  return (
    <div className="SignIn">
      <form onSubmit={handleSignIn}>
        <label htmlFor="username">Username</label>
        <input ref={username} name="username" />
        <label htmlFor="password">Password</label>
        <input ref={password} type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
      {errors ? <p>Errors: {errors}</p> : <React.Fragment></React.Fragment>}
    </div>
  );
}

export default SignIn;
