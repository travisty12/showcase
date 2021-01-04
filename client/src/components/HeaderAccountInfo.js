import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/session';

const HeaderAccountInfo = ({logout, session}) => {
  let output;
  if (session.username) {
    output = <p><Link to="/profile">Profile</Link>  |  <button onClick={logout}>Log Out</button></p>;
  } else {
    output = <p><Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link></p>;
  }
  return (
    <React.Fragment>
      {output}
    </React.Fragment>
  );
}

const mapStateToProps = ({session}) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps,mapDispatchToProps)(HeaderAccountInfo);