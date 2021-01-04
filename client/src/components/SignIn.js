import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/session';

const SignIn = ({errors,login}) => {

  const handleSignIn = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    let response = await login(user);
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
        <label htmlFor="email">Email</label>
        <input name="email" required="required"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required="required" />
        <button type="submit">Submit</button>
      </form>
      {errors}
      {message ? <p>{message}</p> : <React.Fragment></React.Fragment>}
    </div>
  );
}

const mapStateToProps = ({errors}) => ({errors});
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user));
});

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
