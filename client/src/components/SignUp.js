import React, {useState} from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const SignUp = ({errors, signup}) => {

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (e.target[2].value !== e.target[3].value) {
      setMessage("Error: Password must match the confirmation.");
    } else {
      setMessage("Creating account!");

      const user = {
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      };
      let response = await signup(user);
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
        <input name="username" required="required" />
        <label htmlFor="email">Email address</label>
        <input name="email" required="required" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required="required" />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input type="password" name="passwordConfirm" required="required" />
        <button type="submit">Submit</button>
      </form>
      {errors}
      {message ? <p>{message}</p> : <React.Fragment></React.Fragment>}
    </div>
  );
}

const mapStateToProps = ({ errors }) => ({ errors });
const mapDispatchToProps = dispatch => ({ 
  signup: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
